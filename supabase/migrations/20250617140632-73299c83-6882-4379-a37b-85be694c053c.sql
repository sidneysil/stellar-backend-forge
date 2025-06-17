
-- Tabela para armazenar informações dos microserviços
CREATE TABLE public.microservices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  version TEXT NOT NULL,
  port INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'online',
  instances INTEGER NOT NULL DEFAULT 1,
  cpu_usage DECIMAL(5,2) NOT NULL DEFAULT 0,
  memory_usage DECIMAL(5,2) NOT NULL DEFAULT 0,
  uptime_hours INTEGER NOT NULL DEFAULT 0,
  requests_per_minute INTEGER NOT NULL DEFAULT 0,
  error_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
  last_deploy TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para métricas de sistema
CREATE TABLE public.system_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  cpu_avg DECIMAL(5,2) NOT NULL,
  memory_avg DECIMAL(5,2) NOT NULL,
  response_time_avg INTEGER NOT NULL,
  requests_total INTEGER NOT NULL,
  active_connections INTEGER NOT NULL
);

-- Tabela para logs do sistema
CREATE TABLE public.system_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Tabela para tópicos Kafka
CREATE TABLE public.kafka_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  partitions INTEGER NOT NULL,
  replicas INTEGER NOT NULL,
  messages_count INTEGER NOT NULL DEFAULT 0,
  rate_per_minute INTEGER NOT NULL DEFAULT 0,
  lag INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para filas RabbitMQ
CREATE TABLE public.rabbitmq_queues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  messages INTEGER NOT NULL DEFAULT 0,
  consumers INTEGER NOT NULL DEFAULT 0,
  rate_per_minute INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para pipelines CI/CD
CREATE TABLE public.cicd_pipelines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  status TEXT NOT NULL,
  branch TEXT NOT NULL,
  commit_message TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  stage TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela para endpoints de API
CREATE TABLE public.api_endpoints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  path TEXT NOT NULL,
  method TEXT NOT NULL,
  requests_per_minute INTEGER NOT NULL DEFAULT 0,
  avg_response_time INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'healthy',
  uptime_percentage DECIMAL(5,2) NOT NULL DEFAULT 99.9,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir dados iniciais para microserviços
INSERT INTO public.microservices (name, description, version, port, status, instances, cpu_usage, memory_usage, uptime_hours, requests_per_minute, error_rate) VALUES
('user-service', 'Gerenciamento de usuários e perfis', 'v2.1.3', 8081, 'online', 3, 45.2, 67.8, 372, 1200, 0.1),
('order-service', 'Processamento de pedidos', 'v1.8.2', 8082, 'online', 2, 23.4, 54.1, 296, 890, 0.05),
('payment-service', 'Processamento de pagamentos', 'v3.0.1', 8083, 'online', 4, 67.3, 78.9, 194, 456, 0.2),
('notification-service', 'Serviço de notificações', 'v1.5.4', 8084, 'warning', 2, 89.1, 92.3, 86, 234, 2.1),
('inventory-service', 'Controle de estoque', 'v2.3.0', 8085, 'online', 2, 34.7, 45.2, 486, 678, 0.3),
('auth-service', 'Autenticação e autorização', 'v4.1.2', 8086, 'online', 3, 12.8, 28.4, 601, 2100, 0.01);

-- Inserir dados para tópicos Kafka
INSERT INTO public.kafka_topics (name, partitions, replicas, messages_count, rate_per_minute, lag) VALUES
('user-events', 3, 2, 15420, 1200, 0),
('order-events', 5, 3, 8934, 890, 12),
('payment-events', 2, 2, 4567, 456, 0),
('notification-events', 1, 2, 2345, 234, 5),
('audit-events', 1, 1, 9876, 98, 0);

-- Inserir dados para filas RabbitMQ
INSERT INTO public.rabbitmq_queues (name, messages, consumers, rate_per_minute, status) VALUES
('email-queue', 234, 3, 45, 'active'),
('sms-queue', 89, 2, 12, 'active'),
('push-notification-queue', 567, 4, 78, 'active'),
('audit-queue', 12, 1, 5, 'active'),
('dead-letter-queue', 3, 1, 0, 'warning');

-- Inserir dados para pipelines
INSERT INTO public.cicd_pipelines (service_name, status, branch, commit_message, duration_seconds, stage, progress, started_at) VALUES
('user-service', 'success', 'main', 'fix: update user validation', 225, 'deployed', 100, NOW() - INTERVAL '2 hours'),
('order-service', 'running', 'feature/order-tracking', 'feat: add order tracking endpoint', 132, 'testing', 65, NOW() - INTERVAL '5 minutes'),
('payment-service', 'success', 'main', 'chore: update dependencies', 263, 'deployed', 100, NOW() - INTERVAL '1 day'),
('notification-service', 'failed', 'hotfix/email-template', 'fix: email template rendering', 94, 'build', 30, NOW() - INTERVAL '30 minutes');

-- Inserir dados para endpoints de API
INSERT INTO public.api_endpoints (service_name, path, method, requests_per_minute, avg_response_time, status, uptime_percentage) VALUES
('user-service', '/api/v1/users', 'GET', 1200, 45, 'healthy', 99.9),
('user-service', '/api/v1/users', 'POST', 234, 78, 'healthy', 99.8),
('order-service', '/api/v1/orders', 'GET', 890, 67, 'healthy', 99.7),
('order-service', '/api/v1/orders/{id}/status', 'PUT', 156, 89, 'warning', 98.5),
('payment-service', '/api/v1/payments', 'POST', 456, 234, 'healthy', 99.9),
('notification-service', '/api/v1/notifications', 'POST', 234, 123, 'healthy', 99.6);

-- Inserir logs de exemplo
INSERT INTO public.system_logs (service_name, level, message, timestamp) VALUES
('user-service', 'ERROR', 'Failed to connect to Redis', NOW() - INTERVAL '2 minutes'),
('order-service', 'WARN', 'Slow query detected: 2.3s', NOW() - INTERVAL '3 minutes'),
('payment-service', 'INFO', 'Payment processed successfully', NOW() - INTERVAL '5 minutes'),
('notification-service', 'ERROR', 'SMTP server timeout', NOW() - INTERVAL '7 minutes'),
('auth-service', 'INFO', 'User authenticated', NOW() - INTERVAL '10 minutes');

-- Inserir métricas do sistema
INSERT INTO public.system_metrics (cpu_avg, memory_avg, response_time_avg, requests_total, active_connections) VALUES
(34.2, 62.1, 124, 3200, 45);

-- Habilitar RLS nas tabelas
ALTER TABLE public.microservices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kafka_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rabbitmq_queues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cicd_pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_endpoints ENABLE ROW LEVEL SECURITY;

-- Criar políticas para permitir leitura pública (dashboard de monitoramento)
CREATE POLICY "Allow public read access" ON public.microservices FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.system_metrics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.system_logs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.kafka_topics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.rabbitmq_queues FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.cicd_pipelines FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.api_endpoints FOR SELECT USING (true);
