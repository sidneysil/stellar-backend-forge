
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  GitBranch, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock,
  Docker,
  Gitlab,
  Aws,
  TestTube
} from "lucide-react";
import { useCicdPipelines } from "@/hooks/useCicdPipelines";

export function CICDSection() {
  const { pipelines, isLoading } = useCicdPipelines();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <GitBranch className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Carregando pipelines...</p>
        </div>
      </div>
    );
  }

  const stages = ["Build", "Test", "Security Scan", "Docker Build", "Deploy to Staging", "Deploy to Production"];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      running: "bg-blue-100 text-blue-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-slate-100 text-slate-800"}>
        {status === 'success' ? 'Sucesso' : 
         status === 'failed' ? 'Falhou' : 
         status === 'running' ? 'Executando' : status}
      </Badge>
    );
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  const successfulPipelines = pipelines.filter(p => p.status === 'success').length;
  const runningPipelines = pipelines.filter(p => p.status === 'running').length;
  const todayPipelines = pipelines.filter(p => {
    const today = new Date();
    const pipelineDate = new Date(p.started_at);
    return pipelineDate.toDateString() === today.toDateString();
  }).length;

  const avgDuration = pipelines.reduce((acc, p) => acc + p.duration_seconds, 0) / pipelines.length || 0;

  return (
    <div className="space-y-6">
      {/* CI/CD Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pipelines Hoje</p>
                <p className="text-2xl font-bold text-slate-900">{todayPipelines}</p>
                <p className="text-sm text-green-600">+{todayPipelines - 16} vs ontem</p>
              </div>
              <GitBranch className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Taxa de Sucesso</p>
                <p className="text-2xl font-bold text-green-600">
                  {pipelines.length > 0 ? Math.round((successfulPipelines / pipelines.length) * 100) : 0}%
                </p>
                <p className="text-sm text-green-600">Excellent</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-slate-900">{formatDuration(Math.round(avgDuration))}</p>
                <p className="text-sm text-green-600">-23s</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Executando</p>
                <p className="text-2xl font-bold text-slate-900">{runningPipelines}</p>
                <p className="text-sm text-blue-600">Active</p>
              </div>
              <Play className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Pipelines */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Pipelines Ativos
            </CardTitle>
            <Button size="sm" className="gradient-java text-white">
              <Play className="w-4 h-4 mr-2" />
              Run Pipeline
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelines.map((pipeline) => (
              <div key={pipeline.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(pipeline.status)}
                    <div>
                      <h4 className="font-medium">{pipeline.service_name}</h4>
                      <p className="text-sm text-slate-600">{pipeline.branch} • {pipeline.commit_message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">{formatDuration(pipeline.duration_seconds)}</span>
                    {getStatusBadge(pipeline.status)}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stage: {pipeline.stage}</span>
                    <span>{pipeline.progress}%</span>
                  </div>
                  <Progress value={pipeline.progress} className="h-2" />
                </div>
                
                <div className="text-xs text-slate-500">
                  Iniciado: {getTimeAgo(pipeline.started_at)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Estágios do Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stages.map((stage, index) => (
              <div key={index} className="text-center p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                </div>
                <div className="text-sm font-medium">{stage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gitlab className="w-5 h-5 text-orange-600" />
              GitLab CI/CD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Runners Ativos</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Jobs em Fila</span>
                <span className="font-medium">{runningPipelines}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Build Cache</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Docker className="w-5 h-5 text-blue-600" />
              Docker Registry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Total Images</span>
                <span className="font-medium">{156 + pipelines.filter(p => p.status === 'success').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage Used</span>
                <span className="font-medium">12.4GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Auto Cleanup</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Aws className="w-5 h-5 text-orange-600" />
              AWS Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>ECS Services</span>
                <span className="font-medium">{pipelines.filter(p => p.stage === 'deployed').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Load Balancers</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Auto Scaling</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
