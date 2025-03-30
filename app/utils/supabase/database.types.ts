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
          id: number;
          is_delete?: boolean | null;
          job_id?: number | null;
          job_other?: string | null;
          name?: string | null;
          phone?: string | null;
          prefecture_id?: number | null;
          prefecture_other?: string | null;
          pronunciation?: string | null;
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
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
