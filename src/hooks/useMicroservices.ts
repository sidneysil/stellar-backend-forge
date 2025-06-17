
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Microservice {
  id: string;
  name: string;
  description: string;
  version: string;
  port: number;
  status: string;
  instances: number;
  cpu_usage: number;
  memory_usage: number;
  uptime_hours: number;
  requests_per_minute: number;
  error_rate: number;
  last_deploy: string;
  created_at: string;
  updated_at: string;
}

export const useMicroservices = () => {
  const queryClient = useQueryClient();

  const { data: microservices, isLoading, error } = useQuery({
    queryKey: ['microservices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('microservices')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Microservice[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('microservices-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'microservices'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['microservices'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    microservices: microservices || [],
    isLoading,
    error
  };
};
