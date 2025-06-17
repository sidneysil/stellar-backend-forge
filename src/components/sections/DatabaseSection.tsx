
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Zap, 
  HardDrive, 
  Activity,
  Users,
  Timer,
  BarChart3,
  TrendingUp
} from "lucide-react";

export function DatabaseSection() {
  const postgresMetrics = {
    status: "online",
    version: "PostgreSQL 15.2",
    connections: { active: 45, max: 100 },
    queries: { perSecond: 234, slow: 3 },
    storage: { used: 12.5, total: 50 },
    uptime: "28d 14h 32m"
  };

  const redisMetrics = {
    status: "online",
    version: "Redis 7.0.8",
    memory: { used: 2.3, total: 8 },
    hitRate: 94.2,
    keys: 15847,
    operations: 1234,
    uptime: "28d 14h 30m"
  };

  const topQueries = [
    { query: "SELECT * FROM users WHERE active = true", count: 1234, avgTime: "12ms" },
    { query: "UPDATE orders SET status = ? WHERE id = ?", count: 892, avgTime: "8ms" },
    { query: "INSERT INTO audit_logs (user_id, action, timestamp)", count: 745, avgTime: "5ms" },
    { query: "SELECT o.*, u.name FROM orders o JOIN users u", count: 567, avgTime: "45ms" },
    { query: "DELETE FROM sessions WHERE expires_at < NOW()", count: 234, avgTime: "15ms" }
  ];

  const connectionPools = [
    { service: "user-service", active: 12, max: 20, waiting: 0 },
    { service: "order-service", active: 8, max: 15, waiting: 2 },
    { service: "payment-service", active: 15, max: 25, waiting: 0 },
    { service: "notification-service", active: 5, max: 10, waiting: 1 },
    { service: "inventory-service", active: 7, max: 15, waiting: 0 },
    { service: "auth-service", active: 3, max: 10, waiting: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Database Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PostgreSQL Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              PostgreSQL
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </CardTitle>
            <p className="text-sm text-slate-600">{postgresMetrics.version}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Uptime:</span>
                <span className="ml-2 font-medium">{postgresMetrics.uptime}</span>
              </div>
              <div>
                <span className="text-slate-600">Queries/sec:</span>
                <span className="ml-2 font-medium">{postgresMetrics.queries.perSecond}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Conexões Ativas</span>
                <span className="font-medium">
                  {postgresMetrics.connections.active}/{postgresMetrics.connections.max}
                </span>
              </div>
              <Progress 
                value={(postgresMetrics.connections.active / postgresMetrics.connections.max) * 100} 
                className="h-2" 
              />
              
              <div className="flex justify-between text-sm">
                <span>Armazenamento</span>
                <span className="font-medium">
                  {postgresMetrics.storage.used}GB / {postgresMetrics.storage.total}GB
                </span>
              </div>
              <Progress 
                value={(postgresMetrics.storage.used / postgresMetrics.storage.total) * 100} 
                className="h-2" 
              />
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Performance</span>
              </div>
              <div className="text-sm text-slate-600">
                <p>Queries lentas: {postgresMetrics.queries.slow}</p>
                <p>Tempo médio: 15ms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Redis Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-600" />
              Redis Cache
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </CardTitle>
            <p className="text-sm text-slate-600">{redisMetrics.version}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Uptime:</span>
                <span className="ml-2 font-medium">{redisMetrics.uptime}</span>
              </div>
              <div>
                <span className="text-slate-600">Hit Rate:</span>
                <span className="ml-2 font-medium text-green-600">{redisMetrics.hitRate}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Uso de Memória</span>
                <span className="font-medium">
                  {redisMetrics.memory.used}GB / {redisMetrics.memory.total}GB
                </span>
              </div>
              <Progress 
                value={(redisMetrics.memory.used / redisMetrics.memory.total) * 100} 
                className="h-2" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4 p-3 bg-red-50 rounded-lg text-sm">
              <div>
                <div className="text-slate-600">Total de Chaves</div>
                <div className="font-medium">{redisMetrics.keys.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-slate-600">Ops/seg</div>
                <div className="font-medium">{redisMetrics.operations}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Pools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Pool de Conexões por Serviço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectionPools.map((pool, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">{pool.service}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Ativas:</span>
                    <span className="ml-1 font-medium">{pool.active}/{pool.max}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Aguardando:</span>
                    <span className="ml-1 font-medium">{pool.waiting}</span>
                  </div>
                  <div className="w-24">
                    <Progress value={(pool.active / pool.max) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Queries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Queries Mais Executadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topQueries.map((query, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 mr-4">
                    <code className="text-sm bg-slate-100 p-1 rounded text-slate-800">
                      {query.query.length > 60 ? query.query.substring(0, 60) + '...' : query.query}
                    </code>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{query.count} execuções</div>
                    <div className="text-slate-600">Avg: {query.avgTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Tables</p>
                <p className="text-2xl font-bold text-slate-900">47</p>
              </div>
              <HardDrive className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Records</p>
                <p className="text-2xl font-bold text-slate-900">2.4M</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Cache Hits</p>
                <p className="text-2xl font-bold text-slate-900">94.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Response</p>
                <p className="text-2xl font-bold text-slate-900">15ms</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
