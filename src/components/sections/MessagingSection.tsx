
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  BarChart3, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Zap
} from "lucide-react";
import { useMessaging } from "@/hooks/useMessaging";

export function MessagingSection() {
  const { kafkaTopics, rabbitQueues, isLoading } = useMessaging();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Carregando dados de mensageria...</p>
        </div>
      </div>
    );
  }

  const totalKafkaMessages = kafkaTopics.reduce((acc, topic) => acc + topic.messages_count, 0);
  const totalRabbitMessages = rabbitQueues.reduce((acc, queue) => acc + queue.messages, 0);
  const avgKafkaRate = kafkaTopics.reduce((acc, topic) => acc + topic.rate_per_minute, 0) / kafkaTopics.length || 0;
  const avgRabbitRate = rabbitQueues.reduce((acc, queue) => acc + queue.rate_per_minute, 0) / rabbitQueues.length || 0;

  const getQueueStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.active}>
        {status === 'active' ? 'Ativo' : status === 'warning' ? 'Atenção' : 'Inativo'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Messaging Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Tópicos Kafka</p>
                <p className="text-2xl font-bold text-slate-900">{kafkaTopics.length}</p>
                <p className="text-sm text-blue-600">Topics ativos</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Filas RabbitMQ</p>
                <p className="text-2xl font-bold text-slate-900">{rabbitQueues.length}</p>
                <p className="text-sm text-green-600">Queues ativas</p>
              </div>
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Mensagens</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(totalKafkaMessages + totalRabbitMessages).toLocaleString()}
                </p>
                <p className="text-sm text-purple-600">Processadas</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Taxa Média</p>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.round(avgKafkaRate + avgRabbitRate)}/min
                </p>
                <p className="text-sm text-orange-600">Throughput</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kafka Topics */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Apache Kafka - Tópicos
            </CardTitle>
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Monitorar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kafkaTopics.map((topic) => (
              <div key={topic.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">{topic.name}</h4>
                      <p className="text-sm text-slate-600">
                        {topic.partitions} partições • {topic.replicas} réplicas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{topic.rate_per_minute}/min</div>
                    <div className="text-xs text-slate-500">
                      {topic.lag > 0 && (
                        <span className="text-yellow-600">Lag: {topic.lag}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Mensagens:</span>
                    <span className="ml-2 font-medium">{topic.messages_count.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Taxa:</span>
                    <span className="ml-2 font-medium">{topic.rate_per_minute}/min</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Lag:</span>
                    <span className={`ml-2 font-medium ${topic.lag > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
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
              <Zap className="w-5 h-5 text-green-600" />
              RabbitMQ - Filas
            </CardTitle>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Gerenciar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rabbitQueues.map((queue) => (
              <div key={queue.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {queue.status === 'active' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                    <div>
                      <h4 className="font-medium">{queue.name}</h4>
                      <p className="text-sm text-slate-600">
                        {queue.consumers} consumers ativos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getQueueStatusBadge(queue.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Mensagens:</span>
                    <span className="ml-2 font-medium">{queue.messages}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Consumers:</span>
                    <span className="ml-2 font-medium">{queue.consumers}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Taxa:</span>
                    <span className="ml-2 font-medium">{queue.rate_per_minute}/min</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Status:</span>
                    <span className={`ml-2 font-medium ${queue.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {queue.status === 'active' ? 'Ativo' : 'Atenção'}
                    </span>
                  </div>
                </div>

                {queue.messages > 100 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Queue Load</span>
                      <span>{Math.min((queue.messages / 1000) * 100, 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min((queue.messages / 1000) * 100, 100)} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messaging Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Kafka
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-600">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Gráficos de throughput em tempo real</p>
                <p className="text-sm">Integração com Kafka Manager</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Métricas RabbitMQ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total de Filas</span>
                <span className="font-bold">{rabbitQueues.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Consumers Ativos</span>
                <span className="font-bold">{rabbitQueues.reduce((acc, q) => acc + q.consumers, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Mensagens Pendentes</span>
                <span className="font-bold">{totalRabbitMessages.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxa Total</span>
                <span className="font-bold">{rabbitQueues.reduce((acc, q) => acc + q.rate_per_minute, 0)}/min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
