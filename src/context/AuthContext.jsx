import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { collection, addDoc, doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';

const AuthContext = createContext(undefined);

const DEFAULT_ADMIN_EMAIL = 'muthumuthu11367@gmail.com';
const DEFAULT_ADMIN_PASSWORD = 'Muthu@18';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem('admin_email') || DEFAULT_ADMIN_EMAIL;
  });

  // Listen in real-time to Firestore admin credentials for re-verification
  useEffect(() => {
    const credRef = doc(db, 'site_config', 'admin_credentials');
    
    const unsubscribeCreds = onSnapshot(credRef, async (snap) => {
      let liveEmail = DEFAULT_ADMIN_EMAIL;
      let livePass = DEFAULT_ADMIN_PASSWORD;
      let lastUpdated = 0;

      if (snap.exists()) {
        const data = snap.data();
        liveEmail = (data.email || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
        livePass = data.password || DEFAULT_ADMIN_PASSWORD;
        lastUpdated = data.updatedAt || 0;

        // If stored creds in Firestore are missing or outdated, sync with requested default credentials
        if (!data.email || !data.password) {
          try {
            await setDoc(credRef, {
              email: DEFAULT_ADMIN_EMAIL,
              password: DEFAULT_ADMIN_PASSWORD,
              updatedAt: Date.now()
            }, { merge: true });
          } catch (e) {}
        }
      } else {
        // Initialize Firestore credentials doc if not present
        try {
          await setDoc(credRef, {
            email: DEFAULT_ADMIN_EMAIL,
            password: DEFAULT_ADMIN_PASSWORD,
            updatedAt: Date.now()
          });
        } catch (e) {
          console.warn('Firestore admin_credentials init warn:', e);
        }
      }

      setAdminEmail(liveEmail);
      setAdminPassword(livePass);
      localStorage.setItem('admin_email', liveEmail);
      localStorage.setItem('admin_password', livePass);

      // Validate existing local session against latest credentials & last update timestamp
      const rawSession = localStorage.getItem('admin_session_data');
      if (rawSession) {
        try {
          const session = JSON.parse(rawSession);
          if (
            session.email !== liveEmail ||
            session.password !== livePass ||
            (lastUpdated && session.loginTime < lastUpdated)
          ) {
            console.log('Session invalidated due to updated admin credentials.');
            localStorage.removeItem('admin_session_data');
            localStorage.removeItem('admin_local_session');
            setUser(null);
            try { await signOut(auth); } catch (e) {}
          }
        } catch (e) {
          localStorage.removeItem('admin_session_data');
          localStorage.removeItem('admin_local_session');
          setUser(null);
        }
      }
    }, (err) => {
      console.warn('Admin credentials listener error:', err);
    });

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      const storedEmail = (localStorage.getItem('admin_email') || DEFAULT_ADMIN_EMAIL).toLowerCase();
      if (currentUser && currentUser.email?.toLowerCase() === storedEmail) {
        setUser(currentUser);
      } else if (currentUser) {
        signOut(auth);
        setUser(null);
      } else {
        const isLocalAdmin = localStorage.getItem('admin_local_session') === 'true';
        const rawSession = localStorage.getItem('admin_session_data');
        if (isLocalAdmin && rawSession) {
          try {
            const session = JSON.parse(rawSession);
            const currentEmail = (localStorage.getItem('admin_email') || DEFAULT_ADMIN_EMAIL).toLowerCase();
            const currentPass = localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;
            if (session.email === currentEmail && session.password === currentPass) {
              setUser({
                uid: 'admin-local-1',
                email: currentEmail,
                displayName: 'Muthu (CMS Admin)'
              });
            } else {
              localStorage.removeItem('admin_local_session');
              localStorage.removeItem('admin_session_data');
              setUser(null);
            }
          } catch (e) {
            localStorage.removeItem('admin_local_session');
            localStorage.removeItem('admin_session_data');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribeCreds();
      unsubscribeAuth();
    };
  }, []);

  const loginWithEmail = async (email, pass) => {
    // Re-fetch latest live credentials directly from Firestore doc to guarantee real-time check
    let liveEmail = (localStorage.getItem('admin_email') || DEFAULT_ADMIN_EMAIL).toLowerCase();
    let livePass = localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;

    try {
      const snap = await getDoc(doc(db, 'site_config', 'admin_credentials'));
      if (snap.exists()) {
        const d = snap.data();
        if (d.email) liveEmail = d.email.trim().toLowerCase();
        if (d.password) livePass = d.password;
      }
    } catch (e) {
      console.warn('Firestore live credential fetch error:', e);
    }

    const inputEmail = email.trim().toLowerCase();

    // Verify email matches updated admin email
    if (inputEmail !== liveEmail) {
      throw new Error(`Access Denied: Only authorized admin email (${liveEmail}) can log in.`);
    }

    // Verify password matches updated admin password
    if (pass !== livePass) {
      throw new Error('Invalid credentials. Password does not match updated admin password.');
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      if (userCred.user.email?.toLowerCase() === liveEmail) {
        localStorage.setItem('admin_local_session', 'true');
        localStorage.setItem('admin_session_data', JSON.stringify({
          email: liveEmail,
          password: livePass,
          loginTime: Date.now()
        }));
        setUser(userCred.user);
      } else {
        await signOut(auth);
        throw new Error('Access Denied: Unauthorized admin user account.');
      }
    } catch (fbError) {
      // Local fallback with exact live credentials re-verification
      if (inputEmail === liveEmail && pass === livePass) {
        const localUser = {
          uid: 'admin-local-1',
          email: liveEmail,
          displayName: 'Muthu (CMS Admin)'
        };
        localStorage.setItem('admin_local_session', 'true');
        localStorage.setItem('admin_session_data', JSON.stringify({
          email: liveEmail,
          password: livePass,
          loginTime: Date.now()
        }));
        setUser(localUser);
      } else {
        throw new Error('Invalid credentials. Please enter your updated CMS admin password.');
      }
    }

    try {
      await addDoc(collection(db, 'activity_logs'), {
        action: 'ADMIN_LOGIN',
        module: 'AUTHENTICATION',
        timestamp: new Date().toISOString(),
        details: `Admin logged in successfully with fresh session: ${email}`
      });
    } catch (e) {}
  };

  const login = loginWithEmail;

  const logout = async () => {
    try {
      await addDoc(collection(db, 'activity_logs'), {
        action: 'ADMIN_LOGOUT',
        module: 'AUTHENTICATION',
        timestamp: new Date().toISOString(),
        details: `Admin logged out and session cleared`
      });
    } catch (e) {}
    localStorage.removeItem('admin_local_session');
    localStorage.removeItem('admin_session_data');
    setUser(null);
    try {
      await signOut(auth);
    } catch (e) {}
  };

  const updateUserPassword = async (currentPass, newPass) => {
    const livePass = localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;
    const liveEmail = localStorage.getItem('admin_email') || DEFAULT_ADMIN_EMAIL;

    if (currentPass !== livePass) {
      throw new Error('Current password does not match.');
    }

    // Persist new password to Firestore & localStorage
    const now = Date.now();
    try {
      await setDoc(doc(db, 'site_config', 'admin_credentials'), {
        email: liveEmail,
        password: newPass,
        updatedAt: now
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore password save warn:', e);
    }

    localStorage.setItem('admin_password', newPass);
    setAdminPassword(newPass);

    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPass);
      } catch (e) {}
    }

    try {
      await addDoc(collection(db, 'activity_logs'), {
        action: 'PASSWORD_UPDATED',
        module: 'SECURITY',
        timestamp: new Date().toISOString(),
        details: `Admin password updated and previous sessions invalidated`
      });
    } catch (e) {}

    // Invalidate active session so user MUST re-verify credentials with new password
    await logout();
  };

  const updateUserEmail = async (newEmail, currentPass) => {
    const livePass = localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;

    if (currentPass !== livePass) {
      throw new Error('Current password does not match.');
    }

    const cleanEmail = newEmail.trim().toLowerCase();
    const now = Date.now();

    try {
      await setDoc(doc(db, 'site_config', 'admin_credentials'), {
        email: cleanEmail,
        password: livePass,
        updatedAt: now
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore email save warn:', e);
    }

    localStorage.setItem('admin_email', cleanEmail);
    setAdminEmail(cleanEmail);

    if (auth.currentUser) {
      try {
        await updateEmail(auth.currentUser, cleanEmail);
      } catch (e) {}
    }

    try {
      await addDoc(collection(db, 'activity_logs'), {
        action: 'EMAIL_UPDATED',
        module: 'SECURITY',
        timestamp: new Date().toISOString(),
        details: `Admin email updated to ${cleanEmail}`
      });
    } catch (e) {}

    // Invalidate session so user must re-verify with new email
    await logout();
  };

  const updateAdminCredentials = async ({ currentPassword, newEmail, newPassword }) => {
    if (newPassword) {
      await updateUserPassword(currentPassword, newPassword);
    }
    if (newEmail) {
      await updateUserEmail(newEmail, currentPassword);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: !!user,
        login,
        loginWithEmail,
        logout,
        updateUserPassword,
        updateUserEmail,
        updateAdminCredentials,
        adminPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};