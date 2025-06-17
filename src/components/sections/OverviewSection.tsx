
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Database, 
  MessageSquare, 
  Shield, 
  Activity,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";

export function OverviewSection() {
  const stats = [
    {
      title: "Microserviços Ativos",
      value: "12",
      change: "+2",
      icon: Server,
      color: "text-spring-green",
      bgColor: "bg-green-50"
    },
    {
      title: "Requisições/min",
      value: "2.4k",
      change: "+12%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Usuários Online",
      value: "847",
      change: "+5%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Tempo Resposta",
      value: "124ms",
      change: "-8ms",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const services = [
    { name: "user-service", status: "online", version: "v2.1.3", cpu: 45, memory: 67 },
    { name: "order-service", status: "online", version: "v1.8.2", cpu: 23, memory: 54 },
    { name: "payment-service", status: "online", version: "v3.0.1", cpu: 67, memory: 78 },
    { name: "notification-service", status: "warning", version: "v1.5.4", cpu: 89, memory: 92 },
    { name: "inventory-service", status: "online", version: "v2.3.0", cpu: 34, memory: 45 },
    { name: "auth-service", status: "online", version: "v4.1.2", cpu: 12, memory: 28 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-status-online" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-status-warning" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-status-offline" />;
      default:
        return <CheckCircle className="w-4 h-4 text-status-online" />;
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Status dos Microserviços
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <p className="font-medium text-slate-900">{service.name}</p>
                      <p className="text-sm text-slate-600">{service.version}</p>
                    </div>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Uso de Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {services.slice(0, 4).map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-slate-600">CPU: {service.cpu}% | RAM: {service.memory}%</span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={service.cpu} className="h-2" />
                    <Progress value={service.memory} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Banco de Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>PostgreSQL</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Redis Cache</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="text-sm text-slate-600">
                <p>Conexões ativas: 45/100</p>
                <p>Cache hit rate: 94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Mensageria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Apache Kafka</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>RabbitMQ</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="text-sm text-slate-600">
                <p>Mensagens/seg: 1.2k</p>
                <p>Filas ativas: 8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>OWASP Scan</span>
                <Badge className="bg-green-100 text-green-800">Passou</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>SSL/TLS</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="text-sm text-slate-600">
                <p>Último scan: 2h atrás</p>
                <p>Vulnerabilidades: 0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
