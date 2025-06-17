
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  Server, 
  Database, 
  MessageSquare, 
  Shield, 
  GitBranch, 
  Settings, 
  Activity,
  Layers,
  Zap,
  Coffee
} from "lucide-react";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  {
    title: "Visão Geral",
    url: "overview",
    icon: BarChart3,
    description: "Dashboard principal"
  },
  {
    title: "Microserviços",
    url: "services",
    icon: Server,
    description: "Status dos serviços"
  },
  {
    title: "Banco de Dados",
    url: "database",
    icon: Database,
    description: "PostgreSQL + Redis"
  },
  {
    title: "Mensageria",
    url: "messaging",
    icon: MessageSquare,
    description: "Kafka + RabbitMQ"
  },
  {
    title: "Monitoramento",
    url: "monitoring",
    icon: Activity,
    description: "Métricas e logs"
  },
  {
    title: "Segurança",
    url: "security",
    icon: Shield,
    description: "OWASP & Auth"
  },
  {
    title: "CI/CD",
    url: "cicd",
    icon: GitBranch,
    description: "Pipeline GitLab"
  },
  {
    title: "APIs",
    url: "apis",
    icon: Layers,
    description: "REST + Swagger"
  }
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-java rounded-lg flex items-center justify-center">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">MicroHub</h1>
            <p className="text-sm text-slate-600">Java Microservices</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium">
            Painel Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={activeSection === item.url}
                    className="hover:bg-slate-100 transition-colors"
                  >
                    <button 
                      onClick={() => setActiveSection(item.url)}
                      className="flex items-center gap-3 w-full p-3 rounded-lg"
                    >
                      <item.icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.description}</div>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg">
          <Zap className="w-4 h-4 text-yellow-500" />
          <div className="text-sm">
            <div className="font-medium text-slate-800">Sistema Online</div>
            <div className="text-xs text-slate-600">Todos os serviços ativos</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
