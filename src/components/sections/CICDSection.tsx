
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

export function CICDSection() {
  const pipelines = [
    { 
      name: "user-service", 
      status: "success", 
      branch: "main", 
      commit: "fix: update user validation",
      duration: "3m 45s",
      stage: "deployed",
      progress: 100,
      lastRun: "2h ago"
    },
    { 
      name: "order-service", 
      status: "running", 
      branch: "feature/order-tracking", 
      commit: "feat: add order tracking endpoint",
      duration: "2m 12s",
      stage: "testing",
      progress: 65,
      lastRun: "running"
    },
    { 
      name: "payment-service", 
      status: "success", 
      branch: "main", 
      commit: "chore: update dependencies",
      duration: "4m 23s",
      stage: "deployed",
      progress: 100,
      lastRun: "1d ago"
    },
    { 
      name: "notification-service", 
      status: "failed", 
      branch: "hotfix/email-template", 
      commit: "fix: email template rendering",
      duration: "1m 34s",
      stage: "build",
      progress: 30,
      lastRun: "30m ago"
    }
  ];

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

  return (
    <div className="space-y-6">
      {/* CI/CD Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pipelines Hoje</p>
                <p className="text-2xl font-bold text-slate-900">24</p>
                <p className="text-sm text-green-600">+8 vs ontem</p>
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
                <p className="text-2xl font-bold text-green-600">96%</p>
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
                <p className="text-2xl font-bold text-slate-900">4m 12s</p>
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
                <p className="text-sm font-medium text-slate-600">Deploys/Dia</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-sm text-blue-600">Continuous</p>
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
            {pipelines.map((pipeline, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(pipeline.status)}
                    <div>
                      <h4 className="font-medium">{pipeline.name}</h4>
                      <p className="text-sm text-slate-600">{pipeline.branch} • {pipeline.commit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">{pipeline.duration}</span>
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
                  Última execução: {pipeline.lastRun}
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
                <span className="font-medium">3</span>
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
                <span className="font-medium">156</span>
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
                <span className="font-medium">12</span>
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
