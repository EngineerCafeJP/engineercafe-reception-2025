export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      belong_translations: {
        Row: {
          belong_id: number;
          created_at: string | null;
          locale: string;
          name: string;
        };
        Insert: {
          belong_id: number;
          created_at?: string | null;
          locale: string;
          name: string;
        };
        Update: {
          belong_id?: number;
          created_at?: string | null;
          locale?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "belong_translations_belong_id_fkey";
            columns: ["belong_id"];
            isOneToOne: false;
            referencedRelation: "belongs";
            referencedColumns: ["id"];
          },
        ];
      };
      belongs: {
        Row: {
          created_at: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
        };
        Update: {
          created_at?: string | null;
          id?: never;
        };
        Relationships: [];
      };
      found_translations: {
        Row: {
          created_at: string | null;
          found_id: number;
          locale: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          found_id: number;
          locale: string;
          name: string;
        };
        Update: {
          created_at?: string | null;
          found_id?: number;
          locale?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "found_translations_found_id_fkey";
            columns: ["found_id"];
            isOneToOne: false;
            referencedRelation: "founds";
            referencedColumns: ["id"];
          },
        ];
      };
      founds: {
        Row: {
          created_at: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
        };
        Update: {
          created_at?: string | null;
          id?: never;
        };
        Relationships: [];
      };
      job_translations: {
        Row: {
          created_at: string | null;
          job_id: number;
          locale: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          job_id: number;
          locale: string;
          name: string;
        };
        Update: {
          created_at?: string | null;
          job_id?: number;
          locale?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_translations_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          },
        ];
      };
      jobs: {
        Row: {
          created_at: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
        };
        Update: {
          created_at?: string | null;
          id?: never;
        };
        Relationships: [];
      };
      nfcs: {
        Row: {
          created_at: string;
          id: number;
          is_delete: boolean | null;
          nfc_id: string;
          updated_at: string | null;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: never;
          is_delete?: boolean | null;
          nfc_id: string;
          updated_at?: string | null;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: never;
          is_delete?: boolean | null;
          nfc_id?: string;
          updated_at?: string | null;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "nfcs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      old_logs: {
        Row: {
          acquisition_datetime: string | null;
          document_id: number | null;
          end_time: string | null;
          id: number;
          member_number: string | null;
          registration_datetime: string | null;
          space: string | null;
          start_time: string | null;
        };
        Insert: {
          acquisition_datetime?: string | null;
          document_id?: number | null;
          end_time?: string | null;
          id?: never;
          member_number?: string | null;
          registration_datetime?: string | null;
          space?: string | null;
          start_time?: string | null;
        };
        Update: {
          acquisition_datetime?: string | null;
          document_id?: number | null;
          end_time?: string | null;
          id?: never;
          member_number?: string | null;
          registration_datetime?: string | null;
          space?: string | null;
          start_time?: string | null;
        };
        Relationships: [];
      };
      old_nfcs: {
        Row: {
          id: number;
          member_number: string | null;
          nfc_id: string | null;
        };
        Insert: {
          id?: never;
          member_number?: string | null;
          nfc_id?: string | null;
        };
        Update: {
          id?: never;
          member_number?: string | null;
          nfc_id?: string | null;
        };
        Relationships: [];
      };
      old_users: {
        Row: {
          acquisition_datetime: string | null;
          address: string | null;
          affiliation: string | null;
          affiliation_detail: string | null;
          attribute: string | null;
          building: string | null;
          city: string | null;
          document_id: string | null;
          email: string | null;
          full_name: string | null;
          furigana: string | null;
          how_did_you_know: string | null;
          id: number;
          member_number: string | null;
          phone_number: string | null;
          prefecture: string | null;
          registration_datetime: string | null;
        };
        Insert: {
          acquisition_datetime?: string | null;
          address?: string | null;
          affiliation?: string | null;
          affiliation_detail?: string | null;
          attribute?: string | null;
          building?: string | null;
          city?: string | null;
          document_id?: string | null;
          email?: string | null;
          full_name?: string | null;
          furigana?: string | null;
          how_did_you_know?: string | null;
          id?: never;
          member_number?: string | null;
          phone_number?: string | null;
          prefecture?: string | null;
          registration_datetime?: string | null;
        };
        Update: {
          acquisition_datetime?: string | null;
          address?: string | null;
          affiliation?: string | null;
          affiliation_detail?: string | null;
          attribute?: string | null;
          building?: string | null;
          city?: string | null;
          document_id?: string | null;
          email?: string | null;
          full_name?: string | null;
          furigana?: string | null;
          how_did_you_know?: string | null;
          id?: never;
          member_number?: string | null;
          phone_number?: string | null;
          prefecture?: string | null;
          registration_datetime?: string | null;
        };
        Relationships: [];
      };
      prefecture_translations: {
        Row: {
          created_at: string | null;
          locale: string;
          name: string;
          prefecture_id: number;
        };
        Insert: {
          created_at?: string | null;
          locale: string;
          name: string;
          prefecture_id: number;
        };
        Update: {
          created_at?: string | null;
          locale?: string;
          name?: string;
          prefecture_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "prefecture_translations_prefecture_id_fkey";
            columns: ["prefecture_id"];
            isOneToOne: false;
            referencedRelation: "prefectures";
            referencedColumns: ["id"];
          },
        ];
      };
      prefectures: {
        Row: {
          created_at: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          id: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      seat_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: never;
          name: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: never;
          name?: string;
        };
        Relationships: [];
      };
      seat_usage_logs: {
        Row: {
          created_at: string;
          end_time: string | null;
          id: number;
          is_delete: boolean | null;
          remarks: string | null;
          seat_id: number;
          start_time: string;
          updated_at: string | null;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          end_time?: string | null;
          id?: never;
          is_delete?: boolean | null;
          remarks?: string | null;
          seat_id: number;
          start_time: string;
          updated_at?: string | null;
          user_id: number;
        };
        Update: {
          created_at?: string;
          end_time?: string | null;
          id?: never;
          is_delete?: boolean | null;
          remarks?: string | null;
          seat_id?: number;
          start_time?: string;
          updated_at?: string | null;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "seat_usage_logs_seat_id_fkey";
            columns: ["seat_id"];
            isOneToOne: false;
            referencedRelation: "seats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "seat_usage_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      seats: {
        Row: {
          category_id: number;
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          category_id: number;
          created_at?: string | null;
          id?: never;
          name: string;
        };
        Update: {
          category_id?: number;
          created_at?: string | null;
          id?: never;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "seats_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "seat_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      stay_categories: {
        Row: {
          created_at: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
        };
        Update: {
          created_at?: string | null;
          id?: never;
        };
        Relationships: [];
      };
      stay_category_translations: {
        Row: {
          created_at: string | null;
          locale: string;
          name: string;
          stay_category_id: number;
        };
        Insert: {
          created_at?: string | null;
          locale: string;
          name: string;
          stay_category_id: number;
        };
        Update: {
          created_at?: string | null;
          locale?: string;
          name?: string;
          stay_category_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "stay_category_translations_stay_category_id_fkey";
            columns: ["stay_category_id"];
            isOneToOne: false;
            referencedRelation: "stay_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          address: string | null;
          belong_detail: string | null;
          belong_id: number | null;
          belong_other: string | null;
          building: string | null;
          city: string | null;
          comments: string | null;
          created_at: string;
          email: string | null;
          found_id: number | null;
          found_other: string | null;
          id: number;
          is_delete: boolean | null;
          job_id: number | null;
          job_other: string | null;
          name: string | null;
          phone: string | null;
          prefecture_id: number | null;
          prefecture_other: string | null;
          pronunciation: string | null;
          stay_category_id: number | null;
          updated_at: string | null;
          warnings: string | null;
        };
        Insert: {
          address?: string | null;
          belong_detail?: string | null;
          belong_id?: number | null;
          belong_other?: string | null;
          building?: string | null;
          city?: string | null;
          comments?: string | null;
          created_at?: string;
          email?: string | null;
          found_id?: number | null;
          found_other?: string | null;
          id?: number;
          is_delete?: boolean | null;
          job_id?: number | null;
          job_other?: string | null;
          name?: string | null;
          phone?: string | null;
          prefecture_id?: number | null;
          prefecture_other?: string | null;
          pronunciation?: string | null;
          stay_category_id?: number | null;
          updated_at?: string | null;
          warnings?: string | null;
        };
        Update: {
          address?: string | null;
          belong_detail?: string | null;
          belong_id?: number | null;
          belong_other?: string | null;
          building?: string | null;
          city?: string | null;
          comments?: string | null;
          created_at?: string;
          email?: string | null;
          found_id?: number | null;
          found_other?: string | null;
          id?: number;
          is_delete?: boolean | null;
          job_id?: number | null;
          job_other?: string | null;
          name?: string | null;
          phone?: string | null;
          prefecture_id?: number | null;
          prefecture_other?: string | null;
          pronunciation?: string | null;
          stay_category_id?: number | null;
          updated_at?: string | null;
          warnings?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_belong_id_fkey";
            columns: ["belong_id"];
            isOneToOne: false;
            referencedRelation: "belongs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_found_id_fkey";
            columns: ["found_id"];
            isOneToOne: false;
            referencedRelation: "founds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_prefecture_id_fkey";
            columns: ["prefecture_id"];
            isOneToOne: false;
            referencedRelation: "prefectures";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_stay_category_id_fkey";
            columns: ["stay_category_id"];
            isOneToOne: false;
            referencedRelation: "stay_categories";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      latest_registration_user_view: {
        Row: {
          id: number | null;
        };
        Relationships: [];
      };
      seat_usage_daily_reports_view: {
        Row: {
          date: string | null;
          total_fukuoka_city_users: number | null;
          total_fukuoka_pref_users: number | null;
          total_outside_fukuoka_city_users: number | null;
          total_outside_fukuoka_pref_users: number | null;
          total_overseas_users: number | null;
          total_users: number | null;
          unique_fukuoka_city_users: number | null;
          unique_fukuoka_pref_users: number | null;
          unique_outside_fukuoka_city_users: number | null;
          unique_outside_fukuoka_pref_users: number | null;
          unique_overseas_users: number | null;
          unique_users: number | null;
        };
        Relationships: [];
      };
      seat_usage_monthly_reports_view: {
        Row: {
          month: string | null;
          total_fukuoka_city_users: number | null;
          total_fukuoka_pref_users: number | null;
          total_outside_fukuoka_city_users: number | null;
          total_outside_fukuoka_pref_users: number | null;
          total_overseas_users: number | null;
          total_users: number | null;
          unique_fukuoka_city_users: number | null;
          unique_fukuoka_pref_users: number | null;
          unique_outside_fukuoka_city_users: number | null;
          unique_outside_fukuoka_pref_users: number | null;
          unique_overseas_users: number | null;
          unique_users: number | null;
        };
        Relationships: [];
      };
      seat_usage_yearly_reports_view: {
        Row: {
          total_fukuoka_city_users: number | null;
          total_fukuoka_pref_users: number | null;
          total_outside_fukuoka_city_users: number | null;
          total_outside_fukuoka_pref_users: number | null;
          total_overseas_users: number | null;
          total_users: number | null;
          unique_fukuoka_city_users: number | null;
          unique_fukuoka_pref_users: number | null;
          unique_outside_fukuoka_city_users: number | null;
          unique_outside_fukuoka_pref_users: number | null;
          unique_overseas_users: number | null;
          unique_users: number | null;
          year: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_latest_registration_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
