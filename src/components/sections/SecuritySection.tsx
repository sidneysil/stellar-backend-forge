
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle,
  Key,
  Eye,
  UserCheck,
  FileText
} from "lucide-react";

export function SecuritySection() {
  const securityChecks = [
    { name: "OWASP Top 10 Scan", status: "passed", lastRun: "2h ago", issues: 0 },
    { name: "SSL/TLS Configuration", status: "passed", lastRun: "1d ago", issues: 0 },
    { name: "API Rate Limiting", status: "active", lastRun: "Online", issues: 0 },
    { name: "Input Validation", status: "passed", lastRun: "4h ago", issues: 0 },
    { name: "SQL Injection Test", status: "passed", lastRun: "6h ago", issues: 0 },
    { name: "XSS Protection", status: "active", lastRun: "Online", issues: 0 }
  ];

  const authMetrics = [
    { metric: "Active Sessions", value: "847", trend: "+12" },
    { metric: "Failed Logins (24h)", value: "23", trend: "-5" },
    { metric: "JWT Tokens", value: "1,234", trend: "+45" },
    { metric: "API Keys", value: "67", trend: "0" }
  ];

  const vulnerabilities = [
    { severity: "low", count: 2, description: "Deprecated dependencies" },
    { severity: "medium", count: 0, description: "No medium vulnerabilities" },
    { severity: "high", count: 0, description: "No high vulnerabilities" },
    { severity: "critical", count: 0, description: "No critical vulnerabilities" }
  ];

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Security Score</p>
                <p className="text-2xl font-bold text-green-600">95/100</p>
                <p className="text-sm text-green-600">Excellent</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Vulnerabilities</p>
                <p className="text-2xl font-bold text-green-600">2</p>
                <p className="text-sm text-green-600">Low priority</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Last Scan</p>
                <p className="text-2xl font-bold text-slate-900">2h</p>
                <p className="text-sm text-blue-600">ago</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Compliance</p>
                <p className="text-2xl font-bold text-green-600">98%</p>
                <p className="text-sm text-green-600">OWASP</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Verificações de Segurança
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">{check.name}</h4>
                    <p className="text-sm text-slate-600">Última verificação: {check.lastRun}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{check.issues} issues</span>
                  <Badge className="bg-green-100 text-green-800">Passou</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Authentication & Authorization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Autenticação & Autorização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {authMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-slate-600">{metric.metric}</span>
                  <div className="text-right">
                    <span className="font-medium">{metric.value}</span>
                    {metric.trend !== "0" && (
                      <span className={`ml-2 text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.trend}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Rate Limiting</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>API Authentication</span>
                <Badge className="bg-green-100 text-green-800">JWT + OAuth2</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>CORS Configuration</span>
                <Badge className="bg-green-100 text-green-800">Configurado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Request Validation</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerability Assessment */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Avaliação de Vulnerabilidades
            </CardTitle>
            <Button variant="outline" size="sm">
              Executar Scan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {vulnerabilities.map((vuln, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className={`text-2xl font-bold mb-2 ${
                  vuln.severity === 'critical' ? 'text-red-600' :
                  vuln.severity === 'high' ? 'text-orange-600' :
                  vuln.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {vuln.count}
                </div>
                <div className="text-sm font-medium capitalize">{vuln.severity}</div>
                <div className="text-xs text-slate-600 mt-1">{vuln.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Audit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Compliance & Auditoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">OWASP Top 10</h4>
              <p className="text-sm text-slate-600">Todas as verificações passaram</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Compliant</Badge>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Encryption</h4>
              <p className="text-sm text-slate-600">TLS 1.3 + AES-256</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Active</Badge>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Audit Logs</h4>
              <p className="text-sm text-slate-600">Todos os eventos registrados</p>
              <Badge className="mt-2 bg-purple-100 text-purple-800">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
