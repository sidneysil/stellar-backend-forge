export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_endpoints: {
        Row: {
          avg_response_time: number
          created_at: string
          id: string
          method: string
          path: string
          requests_per_minute: number
          service_name: string
          status: string
          uptime_percentage: number
        }
        Insert: {
          avg_response_time?: number
          created_at?: string
          id?: string
          method: string
          path: string
          requests_per_minute?: number
          service_name: string
          status?: string
          uptime_percentage?: number
        }
        Update: {
          avg_response_time?: number
          created_at?: string
          id?: string
          method?: string
          path?: string
          requests_per_minute?: number
          service_name?: string
          status?: string
          uptime_percentage?: number
        }
        Relationships: []
      }
      cicd_pipelines: {
        Row: {
          branch: string
          commit_message: string
          completed_at: string | null
          duration_seconds: number
          id: string
          progress: number
          service_name: string
          stage: string
          started_at: string
          status: string
        }
        Insert: {
          branch: string
          commit_message: string
          completed_at?: string | null
          duration_seconds: number
          id?: string
          progress?: number
          service_name: string
          stage: string
          started_at?: string
          status: string
        }
        Update: {
          branch?: string
          commit_message?: string
          completed_at?: string | null
          duration_seconds?: number
          id?: string
          progress?: number
          service_name?: string
          stage?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      kafka_topics: {
        Row: {
          created_at: string
          id: string
          lag: number
          messages_count: number
          name: string
          partitions: number
          rate_per_minute: number
          replicas: number
        }
        Insert: {
          created_at?: string
          id?: string
          lag?: number
          messages_count?: number
          name: string
          partitions: number
          rate_per_minute?: number
          replicas: number
        }
        Update: {
          created_at?: string
          id?: string
          lag?: number
          messages_count?: number
          name?: string
          partitions?: number
          rate_per_minute?: number
          replicas?: number
        }
        Relationships: []
      }
      microservices: {
        Row: {
          cpu_usage: number
          created_at: string
          description: string | null
          error_rate: number
          id: string
          instances: number
          last_deploy: string | null
          memory_usage: number
          name: string
          port: number
          requests_per_minute: number
          status: string
          updated_at: string
          uptime_hours: number
          version: string
        }
        Insert: {
          cpu_usage?: number
          created_at?: string
          description?: string | null
          error_rate?: number
          id?: string
          instances?: number
          last_deploy?: string | null
          memory_usage?: number
          name: string
          port: number
          requests_per_minute?: number
          status?: string
          updated_at?: string
          uptime_hours?: number
          version: string
        }
        Update: {
          cpu_usage?: number
          created_at?: string
          description?: string | null
          error_rate?: number
          id?: string
          instances?: number
          last_deploy?: string | null
          memory_usage?: number
          name?: string
          port?: number
          requests_per_minute?: number
          status?: string
          updated_at?: string
          uptime_hours?: number
          version?: string
        }
        Relationships: []
      }
      rabbitmq_queues: {
        Row: {
          consumers: number
          created_at: string
          id: string
          messages: number
          name: string
          rate_per_minute: number
          status: string
        }
        Insert: {
          consumers?: number
          created_at?: string
          id?: string
          messages?: number
          name: string
          rate_per_minute?: number
          status?: string
        }
        Update: {
          consumers?: number
          created_at?: string
          id?: string
          messages?: number
          name?: string
          rate_per_minute?: number
          status?: string
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          id: string
          level: string
          message: string
          metadata: Json | null
          service_name: string
          timestamp: string
        }
        Insert: {
          id?: string
          level: string
          message: string
          metadata?: Json | null
          service_name: string
          timestamp?: string
        }
        Update: {
          id?: string
          level?: string
          message?: string
          metadata?: Json | null
          service_name?: string
          timestamp?: string
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          active_connections: number
          cpu_avg: number
          id: string
          memory_avg: number
          requests_total: number
          response_time_avg: number
          timestamp: string
        }
        Insert: {
          active_connections: number
          cpu_avg: number
          id?: string
          memory_avg: number
          requests_total: number
          response_time_avg: number
          timestamp?: string
        }
        Update: {
          active_connections?: number
          cpu_avg?: number
          id?: string
          memory_avg?: number
          requests_total?: number
          response_time_avg?: number
          timestamp?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
