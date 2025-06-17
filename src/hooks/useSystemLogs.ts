
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface SystemLog {
  id: string;
  service_name: string;
  level: string;
  message: string;
  timestamp: string;
  metadata?: any;
}

export const useSystemLogs = (limit: number = 10) => {
  const queryClient = useQueryClient();

  const { data: logs, isLoading, error } = useQuery({
    queryKey: ['system-logs', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as SystemLog[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('logs-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'system_logs'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['system-logs'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    logs: logs || [],
    isLoading,
    error
  };
};
