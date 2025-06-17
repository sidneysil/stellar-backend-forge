
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface CicdPipeline {
  id: string;
  service_name: string;
  status: string;
  branch: string;
  commit_message: string;
  duration_seconds: number;
  stage: string;
  progress: number;
  started_at: string;
  completed_at?: string;
}

export const useCicdPipelines = () => {
  const queryClient = useQueryClient();

  const { data: pipelines, isLoading, error } = useQuery({
    queryKey: ['cicd-pipelines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cicd_pipelines')
        .select('*')
        .order('started_at', { ascending: false });
      
      if (error) throw error;
      return data as CicdPipeline[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('pipelines-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cicd_pipelines'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['cicd-pipelines'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    pipelines: pipelines || [],
    isLoading,
    error
  };
};
