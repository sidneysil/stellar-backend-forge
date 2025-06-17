
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Rabbit, 
  Zap, 
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  Settings
} from "lucide-react";

export function MessagingSection() {
  const kafkaTopics = [
    { name: "user-events", partitions: 3, replicas: 2, messages: 15420, rate: "1.2k/min", lag: 0 },
    { name: "order-events", partitions: 5, replicas: 3, messages: 8934, rate: "890/min", lag: 12 },
    { name: "payment-events", partitions: 2, replicas: 2, messages: 4567, rate: "456/min", lag: 0 },
    { name: "notification-events", partitions: 1, replicas: 2, messages: 2345, rate: "234/min", lag: 5 },
    { name: "audit-events", partitions: 1, replicas: 1, messages: 9876, rate: "98/min", lag: 0 }
  ];

  const rabbitQueues = [
    { name: "email-queue", messages: 234, consumers: 3, rate: "45/min", status: "active" },
    { name: "sms-queue", messages: 89, consumers: 2, rate: "12/min", status: "active" },
    { name: "push-notification-queue", messages: 567, consumers: 4, rate: "78/min", status: "active" },
    { name: "audit-queue", messages: 12, consumers: 1, rate: "5/min", status: "active" },
    { name: "dead-letter-queue", messages: 3, consumers: 1, rate: "0/min", status: "warning" }
  ];

  const consumers = [
    { service: "user-service", group: "user-consumer-group", topic: "user-events", lag: 0, status: "healthy" },
    { service: "order-service", group: "order-consumer-group", topic: "order-events", lag: 12, status: "warning" },
    { service: "payment-service", group: "payment-consumer-group", topic: "payment-events", lag: 0, status: "healthy" },
    { service: "notification-service", group: "notification-consumer-group", topic: "notification-events", lag: 5, status: "healthy" },
    { service: "audit-service", group: "audit-consumer-group", topic: "audit-events", lag: 0, status: "healthy" }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      healthy: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.active}>
        {status === 'active' || status === 'healthy' ? 'Ativo' : 
         status === 'warning' ? 'Atenção' : 'Erro'}
      </Badge>
    );
  };

  const getLagColor = (lag: number) => {
    if (lag === 0) return "text-green-600";
    if (lag < 10) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Messaging Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Messages</p>
                <p className="text-2xl font-bold text-slate-900">45.2k</p>
                <p className="text-sm text-green-600">+12% hoje</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Messages/min</p>
                <p className="text-2xl font-bold text-slate-900">2.8k</p>
                <p className="text-sm text-green-600">+5% vs ontem</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Consumers</p>
                <p className="text-2xl font-bold text-slate-900">15</p>
                <p className="text-sm text-blue-600">Todos online</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Latency</p>
                <p className="text-2xl font-bold text-slate-900">45ms</p>
                <p className="text-sm text-green-600">-8ms</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Apache Kafka Topics */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              Apache Kafka Topics
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {kafkaTopics.map((topic, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                    <h4 className="font-medium">{topic.name}</h4>
                    {topic.lag > 0 && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Lag: {topic.lag}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-slate-600">
                    Rate: {topic.rate}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Partições:</span>
                    <span className="ml-2 font-medium">{topic.partitions}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Réplicas:</span>
                    <span className="ml-2 font-medium">{topic.replicas}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Mensagens:</span>
                    <span className="ml-2 font-medium">{topic.messages.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Lag:</span>
                    <span className={`ml-2 font-medium ${getLagColor(topic.lag)}`}>
                      {topic.lag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RabbitMQ Queues */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Rabbit className="w-5 h-5 text-orange-600" />
              RabbitMQ Queues
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rabbitQueues.map((queue, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${queue.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse-slow`}></div>
                  <div>
                    <h4 className="font-medium">{queue.name}</h4>
                    <p className="text-sm text-slate-600">Rate: {queue.rate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Messages</div>
                    <div className="font-medium">{queue.messages}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Consumers</div>
                    <div className="font-medium">{queue.consumers}</div>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(queue.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consumer Groups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Consumer Groups Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {consumers.map((consumer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${consumer.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <h4 className="font-medium">{consumer.service}</h4>
                    <p className="text-sm text-slate-600">{consumer.group}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Topic</div>
                    <div className="font-medium text-sm">{consumer.topic}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Lag</div>
                    <div className={`font-medium ${getLagColor(consumer.lag)}`}>
                      {consumer.lag}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(consumer.status)}
                    <Button variant="outline" size="sm">
                      <Pause className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Fluxo de Mensagens (Última Hora)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-600">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Gráfico de fluxo de mensagens em tempo real</p>
              <p className="text-sm">Integração com ferramentas de monitoramento</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
