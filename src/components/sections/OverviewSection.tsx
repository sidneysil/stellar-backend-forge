
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
import { useMicroservices } from "@/hooks/useMicroservices";
import { useSystemLogs } from "@/hooks/useSystemLogs";
import { useMessaging } from "@/hooks/useMessaging";

export function OverviewSection() {
  const { microservices, isLoading: servicesLoading } = useMicroservices();
  const { logs } = useSystemLogs(5);
  const { kafkaTopics, rabbitQueues } = useMessaging();

  if (servicesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Carregando dados dos microserviços...</p>
        </div>
      </div>
    );
  }

  const onlineServices = microservices.filter(s => s.status === 'online').length;
  const totalRequests = microservices.reduce((acc, s) => acc + s.requests_per_minute, 0);
  const avgCpu = microservices.reduce((acc, s) => acc + s.cpu_usage, 0) / microservices.length;
  const avgResponseTime = microservices.reduce((acc, s) => acc + (s.requests_per_minute > 0 ? 100 : 50), 0) / microservices.length;

  const stats = [
    {
      title: "Microserviços Ativos",
      value: `${onlineServices}`,
      change: `+${onlineServices - 10}`,
      icon: Server,
      color: "text-spring-green",
      bgColor: "bg-green-50"
    },
    {
      title: "Requisições/min",
      value: `${(totalRequests / 1000).toFixed(1)}k`,
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
      value: `${Math.round(avgResponseTime)}ms`,
      change: "-8ms",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
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
              {microservices.map((service, index) => (
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
              {microservices.slice(0, 4).map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-slate-600">CPU: {service.cpu_usage}% | RAM: {service.memory_usage}%</span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={service.cpu_usage} className="h-2" />
                    <Progress value={service.memory_usage} className="h-2" />
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
                <p>Tópicos Kafka: {kafkaTopics.length}</p>
                <p>Filas RabbitMQ: {rabbitQueues.length}</p>
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

      {/* Recent Logs Preview */}
      {logs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Logs Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded text-sm">
                  <Badge className={
                    log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                    log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {log.level}
                  </Badge>
                  <span className="font-medium">{log.service_name}</span>
                  <span className="flex-1">{log.message}</span>
                  <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
