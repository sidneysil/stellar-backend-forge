
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface KafkaTopic {
  id: string;
  name: string;
  partitions: number;
  replicas: number;
  messages_count: number;
  rate_per_minute: number;
  lag: number;
  created_at: string;
}

export interface RabbitMQQueue {
  id: string;
  name: string;
  messages: number;
  consumers: number;
  rate_per_minute: number;
  status: string;
  created_at: string;
}

export const useMessaging = () => {
  const queryClient = useQueryClient();

  const { data: kafkaTopics, isLoading: kafkaLoading } = useQuery({
    queryKey: ['kafka-topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kafka_topics')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as KafkaTopic[];
    },
  });

  const { data: rabbitQueues, isLoading: rabbitLoading } = useQuery({
    queryKey: ['rabbitmq-queues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rabbitmq_queues')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as RabbitMQQueue[];
    },
  });

  useEffect(() => {
    const kafkaChannel = supabase
      .channel('kafka-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'kafka_topics'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['kafka-topics'] });
        }
      )
      .subscribe();

    const rabbitChannel = supabase
      .channel('rabbit-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rabbitmq_queues'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['rabbitmq-queues'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(kafkaChannel);
      supabase.removeChannel(rabbitChannel);
    };
  }, [queryClient]);

  return {
    kafkaTopics: kafkaTopics || [],
    rabbitQueues: rabbitQueues || [],
    isLoading: kafkaLoading || rabbitLoading
  };
};
