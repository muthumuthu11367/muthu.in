import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardOverview } from './DashboardOverview';
import { ProjectsCMS } from './ProjectsCMS';
import { SkillsCMS } from './SkillsCMS';
import { ServicesCMS } from './ServicesCMS';
import { CertificatesCMS } from './CertificatesCMS';
import { GalleryCMS } from './GalleryCMS';
import { TestimonialsCMS } from './TestimonialsCMS';
import { SocialCMS } from './SocialCMS';
import { MessagesCMS } from './MessagesCMS';
import { SiteSettingsCMS } from './SiteSettingsCMS';
import { ExperienceCMS } from './ExperienceCMS';
import { EducationCMS } from './EducationCMS';
import { AccountSettingsCMS } from './AccountSettingsCMS';
import { ThemeCMS } from './ThemeCMS';

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview onNavigate={(tab) => setActiveTab(tab)} />;
      case 'site_settings': return <SiteSettingsCMS />;
      case 'experience': return <ExperienceCMS />;
      case 'education': return <EducationCMS />;
      case 'projects': return <ProjectsCMS />;
      case 'skills': return <SkillsCMS />;
      case 'services': return <ServicesCMS />;
      case 'certificates': return <CertificatesCMS />;
      case 'gallery': return <GalleryCMS />;
      case 'testimonials': return <TestimonialsCMS />;
      case 'socials': return <SocialCMS />;
      case 'messages': return <MessagesCMS />;
      case 'theme': return <ThemeCMS />;
      case 'account': return <AccountSettingsCMS />;
      default: return <DashboardOverview onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  const tabTitles = {
    overview: 'Overview',
    site_settings: 'Titles CMS',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    services: 'Services',
    certificates: 'Certificates',
    gallery: 'Gallery',
    testimonials: 'Testimonials',
    socials: 'Socials',
    messages: 'Messages',
    theme: 'Theme',
    account: 'Account'
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          activeTabTitle={tabTitles[activeTab] || 'Overview'}
        />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};