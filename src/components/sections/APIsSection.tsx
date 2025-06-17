
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Layers, 
  FileText, 
  TrendingUp, 
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Activity
} from "lucide-react";
import { useApiEndpoints } from "@/hooks/useApiEndpoints";

export function APIsSection() {
  const { endpoints, isLoading } = useApiEndpoints();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Carregando endpoints...</p>
        </div>
      </div>
    );
  }

  const apiVersions = [
    { version: "v1", endpoints: endpoints.filter(e => e.path.includes('/v1/')).length, deprecated: 0, status: "stable" },
    { version: "v2", endpoints: endpoints.filter(e => e.path.includes('/v2/')).length, deprecated: 0, status: "stable" },
    { version: "v3", endpoints: endpoints.filter(e => e.path.includes('/v3/')).length, deprecated: 2, status: "beta" }
  ];

  const swaggerDocs = [
    { service: "user-service", version: "v2.1.3", endpoints: endpoints.filter(e => e.service_name === 'user-service').length, updated: "2h ago" },
    { service: "order-service", version: "v1.8.2", endpoints: endpoints.filter(e => e.service_name === 'order-service').length, updated: "1d ago" },
    { service: "payment-service", version: "v3.0.1", endpoints: endpoints.filter(e => e.service_name === 'payment-service').length, updated: "3h ago" },
    { service: "notification-service", version: "v1.5.4", endpoints: endpoints.filter(e => e.service_name === 'notification-service').length, updated: "5h ago" },
    { service: "inventory-service", version: "v2.3.0", endpoints: endpoints.filter(e => e.service_name === 'inventory-service').length, updated: "1d ago" },
    { service: "auth-service", version: "v4.1.2", endpoints: endpoints.filter(e => e.service_name === 'auth-service').length, updated: "2d ago" }
  ];

  const totalRequests = endpoints.reduce((acc, e) => acc + e.requests_per_minute, 0);
  const avgResponseTime = endpoints.reduce((acc, e) => acc + e.avg_response_time, 0) / endpoints.length || 0;
  const healthyEndpoints = endpoints.filter(e => e.status === 'healthy').length;

  const getMethodBadge = (method: string) => {
    const variants = {
      GET: "bg-green-100 text-green-800",
      POST: "bg-blue-100 text-blue-800",
      PUT: "bg-yellow-100 text-yellow-800",
      DELETE: "bg-red-100 text-red-800"
    };
    
    return <Badge className={variants[method as keyof typeof variants] || "bg-slate-100 text-slate-800"}>{method}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getVersionBadge = (status: string) => {
    const variants = {
      stable: "bg-green-100 text-green-800",
      beta: "bg-blue-100 text-blue-800",
      deprecated: "bg-red-100 text-red-800"
    };
    
    return <Badge className={variants[status as keyof typeof variants] || variants.stable}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* API Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Endpoints</p>
                <p className="text-2xl font-bold text-slate-900">{endpoints.length}</p>
                <p className="text-sm text-blue-600">{new Set(endpoints.map(e => e.service_name)).size} services</p>
              </div>
              <Layers className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Requests/min</p>
                <p className="text-2xl font-bold text-slate-900">{(totalRequests / 1000).toFixed(1)}k</p>
                <p className="text-sm text-green-600">+8% hoje</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Response</p>
                <p className="text-2xl font-bold text-slate-900">{Math.round(avgResponseTime)}ms</p>
                <p className="text-sm text-green-600">-12ms</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Healthy APIs</p>
                <p className="text-2xl font-bold text-slate-900">{healthyEndpoints}</p>
                <p className="text-sm text-blue-600">Active</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Endpoints Monitorados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {endpoints.map((endpoint) => (
              <div key={endpoint.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(endpoint.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        {getMethodBadge(endpoint.method)}
                        <code className="text-sm bg-slate-100 px-2 py-1 rounded">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{endpoint.service_name}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{endpoint.requests_per_minute}/min</div>
                    <div className="text-slate-600">Uptime: {endpoint.uptime_percentage}%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                  <div>
                    <span>Tempo Médio:</span>
                    <span className="ml-1 font-medium">{endpoint.avg_response_time}ms</span>
                  </div>
                  <div>
                    <span>Status:</span>
                    <span className={`ml-1 font-medium ${endpoint.status === 'healthy' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {endpoint.status === 'healthy' ? 'Saudável' : 'Atenção'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Versions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Versões da API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {apiVersions.map((version, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">{version.version}</h4>
                  {getVersionBadge(version.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Endpoints:</span>
                    <span className="font-medium">{version.endpoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deprecated:</span>
                    <span className={`font-medium ${version.deprecated > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {version.deprecated}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Swagger Documentation */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentação Swagger
            </CardTitle>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Swagger UI
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {swaggerDocs.map((doc, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-medium">{doc.service}</h4>
                    <p className="text-sm text-slate-600">{doc.version}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Endpoints:</span>
                    <span className="ml-2 font-medium">{doc.endpoints}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Atualizado:</span>
                    <span className="ml-2 font-medium">{doc.updated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance das APIs (Última Hora)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-600">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Gráfico de performance em tempo real</p>
              <p className="text-sm">Tempo de resposta, throughput e taxa de erro</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
