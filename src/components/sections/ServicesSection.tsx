
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Coffee,
  Layers
} from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      name: "user-service",
      description: "Gerenciamento de usuários e perfis",
      status: "online",
      version: "v2.1.3",
      port: 8081,
      instances: 3,
      cpu: 45,
      memory: 67,
      uptime: "15d 4h 23m",
      requests: "1.2k/min",
      errors: "0.1%",
      lastDeploy: "2023-12-10 14:30"
    },
    {
      name: "order-service",
      description: "Processamento de pedidos",
      status: "online",
      version: "v1.8.2",
      port: 8082,
      instances: 2,
      cpu: 23,
      memory: 54,
      uptime: "12d 8h 15m",
      requests: "890/min",
      errors: "0.05%",
      lastDeploy: "2023-12-08 09:15"
    },
    {
      name: "payment-service",
      description: "Processamento de pagamentos",
      status: "online",
      version: "v3.0.1",
      port: 8083,
      instances: 4,
      cpu: 67,
      memory: 78,
      uptime: "8d 2h 45m",
      requests: "456/min",
      errors: "0.2%",
      lastDeploy: "2023-12-12 16:45"
    },
    {
      name: "notification-service",
      description: "Serviço de notificações",
      status: "warning",
      version: "v1.5.4",
      port: 8084,
      instances: 2,
      cpu: 89,
      memory: 92,
      uptime: "3d 14h 22m",
      requests: "234/min",
      errors: "2.1%",
      lastDeploy: "2023-12-09 11:20"
    },
    {
      name: "inventory-service",
      description: "Controle de estoque",
      status: "online",
      version: "v2.3.0",
      port: 8085,
      instances: 2,
      cpu: 34,
      memory: 45,
      uptime: "20d 6h 18m",
      requests: "678/min",
      errors: "0.3%",
      lastDeploy: "2023-12-05 13:10"
    },
    {
      name: "auth-service",
      description: "Autenticação e autorização",
      status: "online",
      version: "v4.1.2",
      port: 8086,
      instances: 3,
      cpu: 12,
      memory: 28,
      uptime: "25d 1h 5m",
      requests: "2.1k/min",
      errors: "0.01%",
      lastDeploy: "2023-12-01 10:30"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-status-online" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-status-warning" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-status-offline" />;
      default:
        return <CheckCircle className="w-5 h-5 text-status-online" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      online: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      offline: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.online}>
        {status === 'online' ? 'Online' : status === 'warning' ? 'Atenção' : 'Offline'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-java-orange" />
            <span className="font-medium text-slate-700">Spring Boot Services</span>
          </div>
          <Badge variant="outline" className="text-spring-green border-spring-green">
            Java 11 + Spring Boot 2.7.x
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh All
          </Button>
          <Button size="sm" className="gradient-spring text-white">
            <Play className="w-4 h-4 mr-2" />
            Deploy New
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-sm text-slate-600">{service.description}</p>
                  </div>
                </div>
                {getStatusBadge(service.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Service Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Versão:</span>
                  <span className="ml-2 font-medium">{service.version}</span>
                </div>
                <div>
                  <span className="text-slate-600">Porta:</span>
                  <span className="ml-2 font-medium">{service.port}</span>
                </div>
                <div>
                  <span className="text-slate-600">Instâncias:</span>
                  <span className="ml-2 font-medium">{service.instances}</span>
                </div>
                <div>
                  <span className="text-slate-600">Uptime:</span>
                  <span className="ml-2 font-medium">{service.uptime}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="font-medium">{service.cpu}%</span>
                </div>
                <Progress value={service.cpu} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span className="font-medium">{service.memory}%</span>
                </div>
                <Progress value={service.memory} className="h-2" />
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg text-sm">
                <div>
                  <div className="text-slate-600">Requisições</div>
                  <div className="font-medium">{service.requests}</div>
                </div>
                <div>
                  <div className="text-slate-600">Taxa de Erro</div>
                  <div className="font-medium">{service.errors}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Activity className="w-4 h-4 mr-2" />
                  Logs
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Config
                </Button>
                <Button variant="outline" size="sm">
                  <Square className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Last Deploy */}
              <div className="text-xs text-slate-500 pt-2 border-t">
                Último deploy: {service.lastDeploy}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Arquitetura dos Microserviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 gradient-java rounded-lg flex items-center justify-center">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium mb-2">API Gateway</h4>
              <p className="text-sm text-slate-600">Roteamento e balanceamento de carga</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 gradient-spring rounded-lg flex items-center justify-center">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium mb-2">Microserviços</h4>
              <p className="text-sm text-slate-600">Serviços independentes e escaláveis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 gradient-dashboard rounded-lg flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium mb-2">Service Discovery</h4>
              <p className="text-sm text-slate-600">Registro e descoberta automática</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
