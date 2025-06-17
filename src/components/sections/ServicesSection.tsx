
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Clock,
  Cpu,
  HardDrive
} from "lucide-react";
import { useMicroservices } from "@/hooks/useMicroservices";

export function ServicesSection() {
  const { microservices, isLoading } = useMicroservices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Carregando microserviços...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
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

  const formatUptime = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  return (
    <div className="space-y-6">
      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Services</p>
                <p className="text-2xl font-bold text-slate-900">{microservices.length}</p>
                <p className="text-sm text-green-600">All monitored</p>
              </div>
              <Server className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Online</p>
                <p className="text-2xl font-bold text-green-600">
                  {microservices.filter(s => s.status === 'online').length}
                </p>
                <p className="text-sm text-green-600">Healthy</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Warning</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {microservices.filter(s => s.status === 'warning').length}
                </p>
                <p className="text-sm text-yellow-600">Attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Instances</p>
                <p className="text-2xl font-bold text-slate-900">
                  {microservices.reduce((acc, s) => acc + s.instances, 0)}
                </p>
                <p className="text-sm text-blue-600">Running</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {microservices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
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
                  <span className="ml-2 font-medium">{formatUptime(service.uptime_hours)}</span>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>CPU Usage</span>
                  </div>
                  <span className="font-medium">{service.cpu_usage}%</span>
                </div>
                <Progress value={service.cpu_usage} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    <span>Memory Usage</span>
                  </div>
                  <span className="font-medium">{service.memory_usage}%</span>
                </div>
                <Progress value={service.memory_usage} className="h-2" />
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg text-sm">
                <div>
                  <div className="text-slate-600">Requests/min</div>
                  <div className="font-medium">{service.requests_per_minute.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-600">Error Rate</div>
                  <div className={`font-medium ${service.error_rate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                    {service.error_rate}%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Restart
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Config
                </Button>
              </div>

              {/* Last Deploy Info */}
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Último deploy: {new Date(service.last_deploy).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
