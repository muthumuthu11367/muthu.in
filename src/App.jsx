import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MouseCursor } from './components/common/MouseCursor';
import { AnimatedBackground } from './components/common/AnimatedBackground';
import { ScrollProgress } from './components/common/ScrollProgress';
import { ThemeCustomizerModal } from './components/common/ThemeCustomizerModal';
import { SkeletonLoader } from './components/common/SkeletonLoader';

// Public Portfolio Sections
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { SkillsSection } from './components/public/SkillsSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { CertificatesSection } from './components/public/CertificatesSection';
import { GallerySection } from './components/public/GallerySection';
import { ResumeSection } from './components/public/ResumeSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';
import { FloatingSocialBar } from './components/public/FloatingSocialBar';

// Admin CMS Components
import { LoginModal } from './components/auth/LoginModal';
import { AdminLayout } from './components/admin/AdminLayout';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <SkeletonLoader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

// Main Public Portfolio Layout Page
const PublicPortfolioPage = () => {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <ScrollProgress />
      <MouseCursor />
      <AnimatedBackground />

      <Navbar />

      <main className="relative z-10 space-y-12">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <CertificatesSection />
        <GallerySection />
        <ResumeSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingSocialBar />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#0f172a',
                  color: '#f8fafc',
                  border: '1px solid #1e293b',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontFamily: 'sans-serif'
                }
              }}
            />

            <Routes>
              {/* Public Portfolio Route */}
              <Route path="/" element={<PublicPortfolioPage />} />

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<LoginModal />} />

              {/* Guarded Admin CMS Route */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;