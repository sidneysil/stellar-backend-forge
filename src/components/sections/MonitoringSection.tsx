
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  HardDrive,
  Zap
} from "lucide-react";
import { useMicroservices } from "@/hooks/useMicroservices";
import { useSystemLogs } from "@/hooks/useSystemLogs";

export function MonitoringSection() {
  const { microservices } = useMicroservices();
  const { logs } = useSystemLogs(15);

  const avgCpu = microservices.reduce((acc, s) => acc + s.cpu_usage, 0) / microservices.length || 0;
  const avgMemory = microservices.reduce((acc, s) => acc + s.memory_usage, 0) / microservices.length || 0;
  const avgResponseTime = 124; // Simulated
  const systemHealth = microservices.filter(s => s.status === 'online').length / microservices.length * 100;

  const alerts = [
    { severity: "warning", service: "notification-service", message: "High memory usage (92%)", time: "2m ago" },
    { severity: "info", service: "payment-service", message: "Deployment completed successfully", time: "15m ago" },
    { severity: "warning", service: "order-service", message: "Consumer lag detected", time: "1h ago" }
  ];

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const getLogLevelBadge = (level: string) => {
    const variants = {
      ERROR: "bg-red-100 text-red-800",
      WARN: "bg-yellow-100 text-yellow-800",
      INFO: "bg-blue-100 text-blue-800"
    };
    
    return <Badge className={variants[level as keyof typeof variants] || variants.INFO}>{level}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Monitoring Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">System Health</p>
                <p className="text-2xl font-bold text-green-600">{systemHealth.toFixed(1)}%</p>
                <p className="text-sm text-green-600">Excellent</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg CPU</p>
                <p className="text-2xl font-bold text-slate-900">{avgCpu.toFixed(0)}%</p>
                <p className="text-sm text-green-600">Normal</p>
              </div>
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Memory</p>
                <p className="text-2xl font-bold text-slate-900">{avgMemory.toFixed(0)}%</p>
                <p className="text-sm text-yellow-600">Moderate</p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Response Time</p>
                <p className="text-2xl font-bold text-slate-900">{avgResponseTime}ms</p>
                <p className="text-sm text-green-600">Fast</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Alertas Recentes
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                {getAlertIcon(alert.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{alert.service}</span>
                    <Badge variant="outline">{alert.severity}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{alert.message}</p>
                </div>
                <div className="text-sm text-slate-500">{alert.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Logs do Sistema
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver Kibana
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors font-mono text-sm">
                {getLogLevelBadge(log.level)}
                <span className="text-slate-600">{new Date(log.timestamp).toLocaleString()}</span>
                <span className="font-medium">{log.service_name}</span>
                <span className="flex-1 text-slate-800">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Métricas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-600">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Gráficos de performance em tempo real</p>
                <p className="text-sm">Integração com Grafana/Prometheus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              SLA & Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Uptime Mensal</span>
                <span className="font-bold text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tempo Resposta P95</span>
                <span className="font-bold">280ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tempo Resposta P99</span>
                <span className="font-bold">450ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxa de Erro</span>
                <span className="font-bold text-green-600">0.05%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Health Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Health Check dos Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {microservices.map((service) => (
              <div key={service.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{service.name}</span>
                  <Badge className={service.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {service.status === 'online' ? 'Online' : 'Atenção'}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <div>CPU: {service.cpu_usage}%</div>
                  <div>Memory: {service.memory_usage}%</div>
                  <div>Requests: {service.requests_per_minute}/min</div>
                  <div>Error Rate: {service.error_rate}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
