
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface ApiEndpoint {
  id: string;
  service_name: string;
  path: string;
  method: string;
  requests_per_minute: number;
  avg_response_time: number;
  status: string;
  uptime_percentage: number;
  created_at: string;
}

export const useApiEndpoints = () => {
  const queryClient = useQueryClient();

  const { data: endpoints, isLoading, error } = useQuery({
    queryKey: ['api-endpoints'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_endpoints')
        .select('*')
        .order('service_name', { ascending: true });
      
      if (error) throw error;
      return data as ApiEndpoint[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('endpoints-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'api_endpoints'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['api-endpoints'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    endpoints: endpoints || [],
    isLoading,
    error
  };
};
