export type ProfileRow = {
  created_at: string;
  email: string;
  full_name: string | null;
  id: string;
  updated_at: string;
};

export type ProfileInsert = {
  email: string;
  full_name?: string | null;
  id: string;
  updated_at?: string | null;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Insert: ProfileInsert;
        Relationships: [];
        Row: ProfileRow;
        Update: Partial<ProfileInsert>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
