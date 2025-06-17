
import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <DashboardContent activeSection={activeSection} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
