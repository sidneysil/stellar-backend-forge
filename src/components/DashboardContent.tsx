
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OverviewSection } from "./sections/OverviewSection";
import { ServicesSection } from "./sections/ServicesSection";
import { DatabaseSection } from "./sections/DatabaseSection";
import { MessagingSection } from "./sections/MessagingSection";
import { MonitoringSection } from "./sections/MonitoringSection";
import { SecuritySection } from "./sections/SecuritySection";
import { CICDSection } from "./sections/CICDSection";
import { APIsSection } from "./sections/APIsSection";

interface DashboardContentProps {
  activeSection: string;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'services':
        return <ServicesSection />;
      case 'database':
        return <DatabaseSection />;
      case 'messaging':
        return <MessagingSection />;
      case 'monitoring':
        return <MonitoringSection />;
      case 'security':
        return <SecuritySection />;
      case 'cicd':
        return <CICDSection />;
      case 'apis':
        return <APIsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <SidebarTrigger className="p-2 hover:bg-slate-100 rounded-lg transition-colors" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 capitalize">
              {activeSection === 'overview' ? 'Visão Geral' : 
               activeSection === 'services' ? 'Microserviços' :
               activeSection === 'database' ? 'Banco de Dados' :
               activeSection === 'messaging' ? 'Mensageria' :
               activeSection === 'monitoring' ? 'Monitoramento' :
               activeSection === 'security' ? 'Segurança' :
               activeSection === 'cicd' ? 'CI/CD Pipeline' :
               activeSection === 'apis' ? 'APIs REST' : activeSection}
            </h2>
            <p className="text-slate-600">
              Gerencie e monitore seus microserviços Java Spring Boot
            </p>
          </div>
        </div>
        {renderSection()}
      </div>
    </main>
  );
}
