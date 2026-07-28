import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  defaultHero,
  defaultAbout,
  defaultProjects,
  defaultSkills,
  defaultServices,
  defaultCertificates,
  defaultTestimonials,
  defaultGallery,
  defaultSocialLinks,
  defaultSectionTitles
} from '../data/defaultData';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  // State Initialization with localStorage Fallbacks
  const getInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return fallback;
  };

  const [hero, setHero] = useState(() => {
    const initial = getInitial('pf_hero', defaultHero);
    if (initial && initial.name === 'Alex Vance') {
      initial.name = 'Muthu';
    }
    try {
      const savedPhoto = localStorage.getItem('pf_profile_photo');
      if (savedPhoto) {
        initial.profileImage = savedPhoto;
      }
    } catch (e) {}
    return initial;
  });
  const [about, setAbout] = useState(() => getInitial('pf_about', defaultAbout));
  const [projects, setProjects] = useState(() => getInitial('pf_projects', defaultProjects));
  const [skills, setSkills] = useState(() => getInitial('pf_skills', defaultSkills));
  const [services, setServices] = useState(() => getInitial('pf_services', defaultServices));
  const [certificates, setCertificates] = useState(() => getInitial('pf_certificates', defaultCertificates));
  const [testimonials, setTestimonials] = useState(() => {
    const initial = getInitial('pf_testimonials', defaultTestimonials);
    return initial.length < defaultTestimonials.length ? defaultTestimonials : initial;
  });
  const [gallery, setGallery] = useState(() => {
    const initial = getInitial('pf_gallery', defaultGallery);
    return initial.length < defaultGallery.length ? defaultGallery : initial;
  });
  const [socialLinks, setSocialLinks] = useState(() => getInitial('pf_social_links', defaultSocialLinks));
  const [messages, setMessages] = useState(() => getInitial('pf_messages', []));
  const [sectionTitles, setSectionTitles] = useState(() => getInitial('pf_section_titles', defaultSectionTitles));
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync to localStorage whenever state changes (wrapped in try/catch to prevent quota exception crashes)
  useEffect(() => {
    try {
      localStorage.setItem('pf_hero', JSON.stringify(hero));
      if (hero.profileImage) {
        localStorage.setItem('pf_profile_photo', hero.profileImage);
      }
    } catch (e) {
      console.warn('LocalStorage sync warning:', e);
    }
  }, [hero]);
  useEffect(() => { try { localStorage.setItem('pf_about', JSON.stringify(about)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [about]);
  useEffect(() => { try { localStorage.setItem('pf_projects', JSON.stringify(projects)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [projects]);
  useEffect(() => { try { localStorage.setItem('pf_skills', JSON.stringify(skills)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [skills]);
  useEffect(() => { try { localStorage.setItem('pf_services', JSON.stringify(services)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [services]);
  useEffect(() => { try { localStorage.setItem('pf_certificates', JSON.stringify(certificates)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [certificates]);
  useEffect(() => { try { localStorage.setItem('pf_testimonials', JSON.stringify(testimonials)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [testimonials]);
  useEffect(() => { try { localStorage.setItem('pf_gallery', JSON.stringify(gallery)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [gallery]);
  useEffect(() => { try { localStorage.setItem('pf_social_links', JSON.stringify(socialLinks)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [socialLinks]);
  useEffect(() => { try { localStorage.setItem('pf_messages', JSON.stringify(messages)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [messages]);
  useEffect(() => { try { localStorage.setItem('pf_section_titles', JSON.stringify(sectionTitles)); } catch (e) { console.warn('LocalStorage sync warning:', e); } }, [sectionTitles]);

  // Firestore Real-Time Subscriptions
  useEffect(() => {
    let unsubscribes = [];

    // Auto-seed Firestore on initial boot if empty
    const checkAndSeed = async () => {
      try {
        const testSnap = await getDocs(collection(db, 'projects'));
        if (testSnap.empty) {
          console.log('Firestore collections empty. Seeding initial portfolio content...');
          await seedInitialDataToFirestore();
        }
      } catch (err) {
        console.warn('Initial seed check error:', err);
      }
    };
    checkAndSeed();

    // Hero & About Config
    const heroRef = doc(db, 'site_config', 'hero');
    unsubscribes.push(
      onSnapshot(heroRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.name === 'Alex Vance') data.name = 'Muthu';
          try {
            const storedPhoto = localStorage.getItem('pf_profile_photo');
            if (storedPhoto && (!data.profileImage || data.profileImage.includes('unsplash'))) {
              data.profileImage = storedPhoto;
            }
          } catch (e) {}
          setHero((prev) => ({ ...prev, ...data }));
        }
      }, (e) => console.warn('Hero sync warn:', e))
    );

    const aboutRef = doc(db, 'site_config', 'about');
    unsubscribes.push(
      onSnapshot(aboutRef, (snap) => {
        if (snap.exists()) setAbout((prev) => ({ ...prev, ...snap.data() }));
      }, (e) => console.warn('About sync warn:', e))
    );

    const titlesRef = doc(db, 'site_config', 'section_titles');
    unsubscribes.push(
      onSnapshot(titlesRef, (snap) => {
        if (snap.exists()) setSectionTitles((prev) => ({ ...prev, ...snap.data() }));
      }, (e) => console.warn('Section titles sync warn:', e))
    );

    // Helper collection listener
    const listenCol = (colName, setter) => {
      return onSnapshot(
        collection(db, colName),
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setter(items);
          }
          setLoading(false);
        },
        (err) => {
          console.warn(`Firestore ${colName} listener warn:`, err);
          setLoading(false);
        }
      );
    };

    unsubscribes.push(listenCol('projects', setProjects));
    unsubscribes.push(listenCol('skills', setSkills));
    unsubscribes.push(listenCol('services', setServices));
    unsubscribes.push(listenCol('certificates', setCertificates));
    unsubscribes.push(listenCol('testimonials', setTestimonials));
    unsubscribes.push(listenCol('gallery', setGallery));
    unsubscribes.push(listenCol('social_links', setSocialLinks));

    // Admin Messages & Activity Logs
    unsubscribes.push(
      onSnapshot(collection(db, 'messages'), (snap) => {
        const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        msgs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMessages(msgs);
      }, (e) => console.warn('Messages sync warn:', e))
    );

    unsubscribes.push(
      onSnapshot(collection(db, 'activity_logs'), (snap) => {
        const logs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setActivityLogs(logs);
      }, (e) => console.warn('Logs sync warn:', e))
    );

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, []);

  // Update Hero & About
  const updateHero = async (data) => {
    if (data.profileImage) {
      try {
        localStorage.setItem('pf_profile_photo', data.profileImage);
      } catch (e) {}
    }
    const updated = { ...hero, ...data };
    setHero(updated);
    try {
      await setDoc(doc(db, 'site_config', 'hero'), updated, { merge: true });
    } catch (e) {
      console.warn('Hero update local sync fallback:', e);
    }
  };

  const updateAbout = async (data) => {
    const updated = { ...about, ...data };
    setAbout(updated);
    try {
      await setDoc(doc(db, 'site_config', 'about'), updated, { merge: true });
    } catch (e) {
      console.warn('About update local sync fallback:', e);
    }
  };

  const saveExperience = async (exp) => {
    const id = exp.id || `exp_${Date.now()}`;
    const payload = {
      id,
      role: exp.role || 'Senior Full Stack Engineer',
      company: exp.company || 'Tech Organization',
      location: exp.location || 'Remote',
      startDate: exp.startDate || '2023-01',
      endDate: exp.endDate || 'Present',
      current: exp.current ?? true,
      description: exp.description || '',
      technologies: exp.technologies || []
    };

    const currentExps = about.experiences || [];
    const exists = currentExps.some((e) => e.id === id);
    const updatedExps = exists
      ? currentExps.map((e) => (e.id === id ? payload : e))
      : [payload, ...currentExps];

    await updateAbout({ experiences: updatedExps });
  };

  const deleteExperience = async (id) => {
    const currentExps = about.experiences || [];
    const updatedExps = currentExps.filter((e) => e.id !== id);
    await updateAbout({ experiences: updatedExps });
  };

  const saveEducation = async (edu) => {
    const id = edu.id || `edu_${Date.now()}`;
    const payload = {
      id,
      degree: edu.degree || 'Degree / Qualification',
      institution: edu.institution || 'University / Institution',
      location: edu.location || 'Location',
      year: edu.year || '2020 - 2024',
      grade: edu.grade || '',
      highlights: edu.highlights || []
    };

    const currentEdu = about.education || [];
    const exists = currentEdu.some((e) => e.id === id);
    const updatedEdu = exists
      ? currentEdu.map((e) => (e.id === id ? payload : e))
      : [payload, ...currentEdu];

    await updateAbout({ education: updatedEdu });
  };

  const deleteEducation = async (id) => {
    const currentEdu = about.education || [];
    const updatedEdu = currentEdu.filter((e) => e.id !== id);
    await updateAbout({ education: updatedEdu });
  };

  const updateSectionTitles = async (data) => {
    const updated = { ...sectionTitles, ...data };
    setSectionTitles(updated);
    try {
      localStorage.setItem('pf_section_titles', JSON.stringify(updated));
      await setDoc(doc(db, 'site_config', 'section_titles'), updated, { merge: true });
    } catch (e) {
      console.warn('Section titles update error:', e);
    }
  };

  // CRUD for Projects
  const saveProject = async (project) => {
    const id = project.id || `proj_${Date.now()}`;
    const payload = {
      id,
      title: project.title || 'New Project',
      slug: project.slug || (project.title || 'new-project').toLowerCase().replace(/\s+/g, '-'),
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      category: project.category || 'Full Stack',
      technologies: project.technologies || [],
      thumbnail: project.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      images: project.images && project.images.length > 0 ? project.images : [project.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'],
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      featured: project.featured ?? false,
      published: project.published ?? true,
      status: project.status || 'Completed',
      challenges: project.challenges || '',
      solutions: project.solutions || '',
      createdAt: project.createdAt || new Date().toISOString()
    };

    setProjects((prev) => {
      const exists = prev.some((p) => p.id === id);
      return exists ? prev.map((p) => (p.id === id ? payload : p)) : [payload, ...prev];
    });

    try {
      await setDoc(doc(db, 'projects', id), payload, { merge: true });
    } catch (e) {
      console.warn('Firestore project sync warn:', e);
    }
  };

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e) {
      console.warn('Firestore project delete warn:', e);
    }
  };

  // CRUD for Skills
  const saveSkill = async (skill) => {
    const id = skill.id || `sk_${Date.now()}`;
    const payload = {
      id,
      name: skill.name || 'New Skill',
      category: skill.category || 'Frontend',
      proficiency: skill.proficiency ?? 85,
      iconName: skill.iconName || 'Code',
      featured: skill.featured ?? true,
      description: skill.description || ''
    };

    setSkills((prev) => {
      const exists = prev.some((s) => s.id === id);
      return exists ? prev.map((s) => (s.id === id ? payload : s)) : [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'skills', id), payload, { merge: true });
    } catch (e) {
      console.warn('Firestore skill sync warn:', e);
    }
  };

  const deleteSkill = async (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    try { await deleteDoc(doc(db, 'skills', id)); }
    catch (e) { console.warn('Firestore skill delete warn:', e); }
  };

  // CRUD for Services
  const saveService = async (service) => {
    const id = service.id || `srv_${Date.now()}`;
    const payload = {
      id,
      title: service.title || 'New Service',
      description: service.description || '',
      features: service.features || [],
      iconName: service.iconName || 'Layers',
      featured: service.featured ?? true
    };

    setServices((prev) => {
      const exists = prev.some((s) => s.id === id);
      return exists ? prev.map((s) => (s.id === id ? payload : s)) : [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'services', id), payload, { merge: true });
    } catch (e) {
      console.warn('Firestore service sync warn:', e);
    }
  };

  const deleteService = async (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    try { await deleteDoc(doc(db, 'services', id)); }
    catch (e) { console.warn('Firestore service delete warn:', e); }
  };

  // CRUD for Certificates
  const saveCertificate = async (cert) => {
    const id = cert.id || `cert_${Date.now()}`;
    const payload = {
      id,
      title: cert.title || 'New Certificate',
      issuer: cert.issuer || 'Issuing Organization',
      issueDate: cert.issueDate || '2024-01',
      credentialUrl: cert.credentialUrl || '#',
      imageUrl: cert.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      category: cert.category || 'Certification',
      description: cert.description || '',
      credentialId: cert.credentialId || ''
    };

    setCertificates((prev) => {
      const exists = prev.some((c) => c.id === id);
      return exists ? prev.map((c) => (c.id === id ? payload : c)) : [...prev, payload];
    });

    try { await setDoc(doc(db, 'certificates', id), payload, { merge: true }); }
    catch (e) { console.warn('Firestore cert sync warn:', e); }
  };

  const deleteCertificate = async (id) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    try { await deleteDoc(doc(db, 'certificates', id)); }
    catch (e) { console.warn('Firestore cert delete warn:', e); }
  };

  // CRUD for Testimonials
  const saveTestimonial = async (tst) => {
    const id = tst.id || `tst_${Date.now()}`;
    const payload = {
      id,
      clientName: tst.clientName || 'Client Name',
      clientRole: tst.clientRole || 'Client Role',
      company: tst.company || 'Company',
      clientAddress: tst.clientAddress || '',
      clientPhoto: tst.clientPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      rating: tst.rating ?? 5,
      review: tst.review || '',
      featured: tst.featured ?? true,
      projectWorkedOn: tst.projectWorkedOn || '',
      createdAt: tst.createdAt || new Date().toISOString(),
      status: tst.status || 'approved',
      authorEmail: tst.authorEmail || '',
      authorPasscode: tst.authorPasscode || ''
    };

    setTestimonials((prev) => {
      const exists = prev.some((t) => t.id === id);
      return exists ? prev.map((t) => (t.id === id ? payload : t)) : [...prev, payload];
    });

    try { await setDoc(doc(db, 'testimonials', id), payload, { merge: true }); }
    catch (e) { console.warn('Firestore testimonial sync warn:', e); }
  };

  const deleteTestimonial = async (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    try { await deleteDoc(doc(db, 'testimonials', id)); }
    catch (e) { console.warn('Firestore testimonial delete warn:', e); }
  };

  // CRUD for Gallery
  const saveGalleryItem = async (item) => {
    const id = item.id || `gal_${Date.now()}`;
    const payload = {
      id,
      title: item.title || 'Gallery Item',
      category: item.category || 'UI/UX Mockups',
      imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      description: item.description || ''
    };

    setGallery((prev) => {
      const exists = prev.some((g) => g.id === id);
      return exists ? prev.map((g) => (g.id === id ? payload : g)) : [...prev, payload];
    });

    try { await setDoc(doc(db, 'gallery', id), payload, { merge: true }); }
    catch (e) { console.warn('Firestore gallery sync warn:', e); }
  };

  const deleteGalleryItem = async (id) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    try { await deleteDoc(doc(db, 'gallery', id)); }
    catch (e) { console.warn('Firestore gallery delete warn:', e); }
  };

  // CRUD for Social Links
  const saveSocialLink = async (link) => {
    const id = link.id || `soc_${Date.now()}`;
    const payload = {
      id,
      platform: link.platform || 'Custom Link',
      url: link.url || 'https://example.com',
      enabled: link.enabled ?? true,
      order: link.order ?? (socialLinks.length + 1),
      customLabel: link.customLabel || ''
    };

    setSocialLinks((prev) => {
      const exists = prev.some((s) => s.id === id);
      return exists ? prev.map((s) => (s.id === id ? payload : s)) : [...prev, payload];
    });

    try { await setDoc(doc(db, 'social_links', id), payload, { merge: true }); }
    catch (e) { console.warn('Firestore social_links sync warn:', e); }
  };

  const deleteSocialLink = async (id) => {
    setSocialLinks((prev) => prev.filter((s) => s.id !== id));
    try { await deleteDoc(doc(db, 'social_links', id)); }
    catch (e) { console.warn('Firestore social_links delete warn:', e); }
  };

  // Contact Form Submission
  const submitContactMessage = async (msg) => {
    const payload = {
      id: `msg_${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      createdAt: new Date().toISOString(),
      read: false
    };

    try {
      await addDoc(collection(db, 'messages'), payload);
    } catch (e) {
      setMessages((prev) => [payload, ...prev]);
    }
  };

  const markMessageRead = async (id) => {
    try {
      await updateDoc(doc(db, 'messages', id), { read: true });
    } catch (e) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    }
  };

  const markAllMessagesRead = async () => {
    const unread = messages.filter((m) => !m.read);
    if (unread.length === 0) return;

    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));

    await Promise.all(
      unread.map(async (m) => {
        try {
          await updateDoc(doc(db, 'messages', m.id), { read: true });
        } catch (e) {
          console.warn('Error marking message read in Firestore:', e);
        }
      })
    );
  };

  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Seed default data to Firestore for easy initialization
  const seedInitialDataToFirestore = async () => {
    try {
      await setDoc(doc(db, 'site_config', 'hero'), defaultHero);
      await setDoc(doc(db, 'site_config', 'about'), defaultAbout);
      await setDoc(doc(db, 'site_config', 'section_titles'), defaultSectionTitles);

      for (const p of defaultProjects) await setDoc(doc(db, 'projects', p.id), p);
      for (const s of defaultSkills) await setDoc(doc(db, 'skills', s.id), s);
      for (const s of defaultServices) await setDoc(doc(db, 'services', s.id), s);
      for (const c of defaultCertificates) await setDoc(doc(db, 'certificates', c.id), c);
      for (const t of defaultTestimonials) await setDoc(doc(db, 'testimonials', t.id), t);
      for (const g of defaultGallery) await setDoc(doc(db, 'gallery', g.id), g);
      for (const sl of defaultSocialLinks) await setDoc(doc(db, 'social_links', sl.id), sl);

      await addDoc(collection(db, 'activity_logs'), {
        action: 'FIRESTORE_SEEDED',
        module: 'SYSTEM',
        timestamp: new Date().toISOString(),
        details: 'Initial default portfolio content seeded successfully into Firestore.'
      });
    } catch (err) {
      console.warn('Seeding warning:', err);
    }
  };

  // Compute dynamic stats based on user configuration and project list
  const augmentedAbout = useMemo(() => {
    const userYears = about.yearsOfExperience !== undefined && about.yearsOfExperience !== null
      ? Number(about.yearsOfExperience)
      : 8;

    const userProjects = about.completedProjects !== undefined && about.completedProjects !== null
      ? Number(about.completedProjects)
      : (projects.length > 0 ? projects.length : 45);

    const userClients = about.happyClients !== undefined && about.happyClients !== null
      ? Number(about.happyClients)
      : 32;

    const userAwards = about.awardsWon !== undefined && about.awardsWon !== null
      ? Number(about.awardsWon)
      : 12;

    const defaultStats = [
      { id: 'st-1', label: 'Years Experience', value: userYears, prefix: '', suffix: '+', iconName: 'Briefcase' },
      { id: 'st-2', label: 'Projects Completed', value: userProjects, prefix: '', suffix: '+', iconName: 'Code' },
      { id: 'st-3', label: 'Happy Clients', value: userClients, prefix: '', suffix: '+', iconName: 'Users' },
      { id: 'st-4', label: 'Awards & Badges', value: userAwards, prefix: '', suffix: '', iconName: 'Award' }
    ];

    const currentStats = (about.stats && about.stats.length > 0) ? about.stats : defaultStats;

    const updatedStats = currentStats.map((st) => {
      const label = (st.label || '').toLowerCase();
      if (label.includes('year') || label.includes('experience')) {
        return { ...st, value: userYears };
      }
      if (label.includes('project')) {
        return { ...st, value: userProjects };
      }
      if (label.includes('client') || label.includes('customer')) {
        return { ...st, value: userClients };
      }
      if (label.includes('award') || label.includes('badge') || label.includes('honor')) {
        return { ...st, value: userAwards };
      }
      return st;
    });

    return {
      ...about,
      yearsOfExperience: userYears,
      completedProjects: userProjects,
      happyClients: userClients,
      awardsWon: userAwards,
      stats: updatedStats
    };
  }, [about, projects.length]);

  return (
    <DataContext.Provider
      value={{
        hero,
        about: augmentedAbout,
        projects,
        skills,
        services,
        certificates,
        testimonials,
        gallery,
        socialLinks,
        messages,
        activityLogs,
        sectionTitles,
        loading,
        updateHero,
        updateAbout,
        updateSectionTitles,
        saveExperience,
        deleteExperience,
        saveEducation,
        deleteEducation,
        saveProject,
        deleteProject,
        saveSkill,
        deleteSkill,
        saveService,
        deleteService,
        saveCertificate,
        deleteCertificate,
        saveTestimonial,
        deleteTestimonial,
        saveGalleryItem,
        deleteGalleryItem,
        saveSocialLink,
        deleteSocialLink,
        submitContactMessage,
        markMessageRead,
        markAllMessagesRead,
        deleteMessage,
        seedInitialDataToFirestore
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};