export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      blog: {
        Row: {
          category_ar: string
          content_markdown_ar: string
          created_at: string
          excerpt_ar: string
          hero_image: string
          id: string
          publish_date: string | null
          published: boolean
          read_time_minutes: number
          slug: string
          tags_ar: string[]
          title_ar: string
          updated_at: string
        }
        Insert: {
          category_ar?: string
          content_markdown_ar?: string
          created_at?: string
          excerpt_ar?: string
          hero_image?: string
          id: string
          publish_date?: string | null
          published?: boolean
          read_time_minutes?: number
          slug: string
          tags_ar?: string[]
          title_ar: string
          updated_at?: string
        }
        Update: {
          category_ar?: string
          content_markdown_ar?: string
          created_at?: string
          excerpt_ar?: string
          hero_image?: string
          id?: string
          publish_date?: string | null
          published?: boolean
          read_time_minutes?: number
          slug?: string
          tags_ar?: string[]
          title_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          department_id: string
          description_ar: string | null
          id: string
          is_active: boolean
          name_ar: string
          name_en: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id: string
          description_ar?: string | null
          id: string
          is_active?: boolean
          name_ar: string
          name_en?: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string
          description_ar?: string | null
          id?: string
          is_active?: boolean
          name_ar?: string
          name_en?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      client_logos: {
        Row: {
          created_at: string
          id: string
          industry_ar: string | null
          is_active: boolean
          logo_url: string
          name_ar: string
          rating: number | null
          sort_order: number
          testimonial_snippet: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          industry_ar?: string | null
          is_active?: boolean
          logo_url?: string
          name_ar: string
          rating?: number | null
          sort_order?: number
          testimonial_snippet?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          industry_ar?: string | null
          is_active?: boolean
          logo_url?: string
          name_ar?: string
          rating?: number | null
          sort_order?: number
          testimonial_snippet?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string
          name: string
          phone: string
          service_interest: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          message: string
          name: string
          phone: string
          service_interest?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string
          service_interest?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          description_ar: string
          hero_image: string
          icon: string
          id: string
          is_active: boolean
          name_ar: string
          name_en: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_ar?: string
          hero_image?: string
          icon?: string
          id: string
          is_active?: boolean
          name_ar: string
          name_en?: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_ar?: string
          hero_image?: string
          icon?: string
          id?: string
          is_active?: boolean
          name_ar?: string
          name_en?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      design_tasks: {
        Row: {
          brief_file_url: string | null
          client_name: string
          client_phone: string | null
          comments: Json
          created_at: string
          deadline: string | null
          department_id: string | null
          description_ar: string
          designer_id: string | null
          designer_name: string | null
          dimensions_notes: string | null
          id: string
          priority: string
          proof_versions: Json
          quote_id: string | null
          required_format: string | null
          service_id: string | null
          status: string
          title_ar: string
          updated_at: string
        }
        Insert: {
          brief_file_url?: string | null
          client_name: string
          client_phone?: string | null
          comments?: Json
          created_at?: string
          deadline?: string | null
          department_id?: string | null
          description_ar?: string
          designer_id?: string | null
          designer_name?: string | null
          dimensions_notes?: string | null
          id: string
          priority?: string
          proof_versions?: Json
          quote_id?: string | null
          required_format?: string | null
          service_id?: string | null
          status?: string
          title_ar: string
          updated_at?: string
        }
        Update: {
          brief_file_url?: string | null
          client_name?: string
          client_phone?: string | null
          comments?: Json
          created_at?: string
          deadline?: string | null
          department_id?: string | null
          description_ar?: string
          designer_id?: string | null
          designer_name?: string | null
          dimensions_notes?: string | null
          id?: string
          priority?: string
          proof_versions?: Json
          quote_id?: string | null
          required_format?: string | null
          service_id?: string | null
          status?: string
          title_ar?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "design_tasks_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "design_tasks_designer_id_fkey"
            columns: ["designer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "design_tasks_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "design_tasks_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      faq: {
        Row: {
          answer_ar: string
          category_ar: string
          created_at: string
          id: string
          is_active: boolean
          question_ar: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer_ar: string
          category_ar?: string
          created_at?: string
          id: string
          is_active?: boolean
          question_ar: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer_ar?: string
          category_ar?: string
          created_at?: string
          id?: string
          is_active?: boolean
          question_ar?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      features: {
        Row: {
          badge_ar: string | null
          card_type: string | null
          counter_value: string | null
          created_at: string
          description_ar: string
          icon: string
          id: string
          is_active: boolean
          sort_order: number
          title_ar: string
          updated_at: string
        }
        Insert: {
          badge_ar?: string | null
          card_type?: string | null
          counter_value?: string | null
          created_at?: string
          description_ar?: string
          icon?: string
          id: string
          is_active?: boolean
          sort_order?: number
          title_ar: string
          updated_at?: string
        }
        Update: {
          badge_ar?: string | null
          card_type?: string | null
          counter_value?: string | null
          created_at?: string
          description_ar?: string
          icon?: string
          id?: string
          is_active?: boolean
          sort_order?: number
          title_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      home_slides: {
        Row: {
          badge_ar: string | null
          button_text_ar: string
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          secondary_button_text_ar: string | null
          secondary_target_view: string | null
          sort_order: number
          subtitle_ar: string
          target_view: string
          title_ar: string
          updated_at: string
        }
        Insert: {
          badge_ar?: string | null
          button_text_ar?: string
          created_at?: string
          id: string
          image_url?: string
          is_active?: boolean
          secondary_button_text_ar?: string | null
          secondary_target_view?: string | null
          sort_order?: number
          subtitle_ar?: string
          target_view?: string
          title_ar: string
          updated_at?: string
        }
        Update: {
          badge_ar?: string | null
          button_text_ar?: string
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          secondary_button_text_ar?: string | null
          secondary_target_view?: string | null
          sort_order?: number
          subtitle_ar?: string
          target_view?: string
          title_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      industry_sectors: {
        Row: {
          color_accent: string | null
          created_at: string
          description_ar: string
          hero_image: string
          icon: string
          id: string
          is_active: boolean
          name_ar: string
          name_en: string
          package_ids: string[]
          service_ids: string[]
          slug: string
          sort_order: number
          tagline_ar: string
          updated_at: string
        }
        Insert: {
          color_accent?: string | null
          created_at?: string
          description_ar?: string
          hero_image?: string
          icon?: string
          id: string
          is_active?: boolean
          name_ar: string
          name_en?: string
          package_ids?: string[]
          service_ids?: string[]
          slug: string
          sort_order?: number
          tagline_ar?: string
          updated_at?: string
        }
        Update: {
          color_accent?: string | null
          created_at?: string
          description_ar?: string
          hero_image?: string
          icon?: string
          id?: string
          is_active?: boolean
          name_ar?: string
          name_en?: string
          package_ids?: string[]
          service_ids?: string[]
          slug?: string
          sort_order?: number
          tagline_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      marquee: {
        Row: {
          badge_ar: string | null
          category: string
          created_at: string
          icon: string | null
          id: string
          is_active: boolean
          link_view: string | null
          sort_order: number
          text_ar: string
          updated_at: string
        }
        Insert: {
          badge_ar?: string | null
          category?: string
          created_at?: string
          icon?: string | null
          id: string
          is_active?: boolean
          link_view?: string | null
          sort_order?: number
          text_ar: string
          updated_at?: string
        }
        Update: {
          badge_ar?: string | null
          category?: string
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          link_view?: string | null
          sort_order?: number
          text_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_ar: string | null
          category: string
          id: string
          mime_type: string | null
          name: string
          size_kb: number
          storage_path: string | null
          uploaded_at: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt_ar?: string | null
          category?: string
          id: string
          mime_type?: string | null
          name: string
          size_kb?: number
          storage_path?: string | null
          uploaded_at?: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt_ar?: string | null
          category?: string
          id?: string
          mime_type?: string | null
          name?: string
          size_kb?: number
          storage_path?: string | null
          uploaded_at?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          badge: string | null
          benefits_ar: Json
          created_at: string
          description_ar: string
          featured: boolean
          hero_image: string
          id: string
          ideal_for_ar: string | null
          is_active: boolean
          items_breakdown: Json
          key_advantages_ar: Json
          sector_key: string | null
          service_ids: string[]
          slug: string
          sort_order: number
          tagline_ar: string
          target_sector_ar: string | null
          title_ar: string
          title_en: string
          turnaround_time_ar: string | null
          updated_at: string
        }
        Insert: {
          badge?: string | null
          benefits_ar?: Json
          created_at?: string
          description_ar?: string
          featured?: boolean
          hero_image?: string
          id: string
          ideal_for_ar?: string | null
          is_active?: boolean
          items_breakdown?: Json
          key_advantages_ar?: Json
          sector_key?: string | null
          service_ids?: string[]
          slug: string
          sort_order?: number
          tagline_ar?: string
          target_sector_ar?: string | null
          title_ar: string
          title_en?: string
          turnaround_time_ar?: string | null
          updated_at?: string
        }
        Update: {
          badge?: string | null
          benefits_ar?: Json
          created_at?: string
          description_ar?: string
          featured?: boolean
          hero_image?: string
          id?: string
          ideal_for_ar?: string | null
          is_active?: boolean
          items_breakdown?: Json
          key_advantages_ar?: Json
          sector_key?: string | null
          service_ids?: string[]
          slug?: string
          sort_order?: number
          tagline_ar?: string
          target_sector_ar?: string | null
          title_ar?: string
          title_en?: string
          turnaround_time_ar?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          challenge_ar: string | null
          city: string
          client_type_ar: string
          created_at: string
          featured: boolean
          id: string
          images: Json
          industry: string
          is_active: boolean
          services_used_ids: string[]
          short_description_ar: string
          solution_ar: string | null
          sort_order: number
          title_ar: string
          title_en: string | null
          updated_at: string
          year: string
        }
        Insert: {
          challenge_ar?: string | null
          city?: string
          client_type_ar?: string
          created_at?: string
          featured?: boolean
          id: string
          images?: Json
          industry?: string
          is_active?: boolean
          services_used_ids?: string[]
          short_description_ar?: string
          solution_ar?: string | null
          sort_order?: number
          title_ar: string
          title_en?: string | null
          updated_at?: string
          year?: string
        }
        Update: {
          challenge_ar?: string | null
          city?: string
          client_type_ar?: string
          created_at?: string
          featured?: boolean
          id?: string
          images?: Json
          industry?: string
          is_active?: boolean
          services_used_ids?: string[]
          short_description_ar?: string
          solution_ar?: string | null
          sort_order?: number
          title_ar?: string
          title_en?: string | null
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          name: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          is_active?: boolean
          name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          assigned_to: string | null
          created_at: string
          customer: Json
          deadline_date: string | null
          general_notes: string | null
          id: string
          internal_notes: string | null
          items: Json
          reference_number: string
          status: string
          supplier_notes: string | null
          timeline: Json
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          customer: Json
          deadline_date?: string | null
          general_notes?: string | null
          id: string
          internal_notes?: string | null
          items?: Json
          reference_number: string
          status?: string
          supplier_notes?: string | null
          timeline?: Json
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          customer?: Json
          deadline_date?: string | null
          general_notes?: string | null
          id?: string
          internal_notes?: string | null
          items?: Json
          reference_number?: string
          status?: string
          supplier_notes?: string | null
          timeline?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          badge: string | null
          category_id: string | null
          created_at: string
          department_id: string | null
          execution_model: string
          faq: Json
          featured: boolean
          full_description_ar: string
          gallery: Json
          hero_image: string
          highlights: Json
          id: string
          industry_sector_ids: string[]
          is_international_sourcing: boolean
          most_requested: boolean
          name_ar: string
          name_en: string
          prepress_rules: Json | null
          related_package_ids: string[]
          related_service_ids: string[]
          seo_description: string | null
          seo_title: string | null
          service_status: string
          short_description_ar: string
          slug: string
          sort_order: number
          specification_groups: Json
          subcategory_id: string | null
          template_id: string | null
          updated_at: string
        }
        Insert: {
          badge?: string | null
          category_id?: string | null
          created_at?: string
          department_id?: string | null
          execution_model?: string
          faq?: Json
          featured?: boolean
          full_description_ar?: string
          gallery?: Json
          hero_image?: string
          highlights?: Json
          id: string
          industry_sector_ids?: string[]
          is_international_sourcing?: boolean
          most_requested?: boolean
          name_ar: string
          name_en?: string
          prepress_rules?: Json | null
          related_package_ids?: string[]
          related_service_ids?: string[]
          seo_description?: string | null
          seo_title?: string | null
          service_status?: string
          short_description_ar?: string
          slug: string
          sort_order?: number
          specification_groups?: Json
          subcategory_id?: string | null
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          badge?: string | null
          category_id?: string | null
          created_at?: string
          department_id?: string | null
          execution_model?: string
          faq?: Json
          featured?: boolean
          full_description_ar?: string
          gallery?: Json
          hero_image?: string
          highlights?: Json
          id?: string
          industry_sector_ids?: string[]
          is_international_sourcing?: boolean
          most_requested?: boolean
          name_ar?: string
          name_en?: string
          prepress_rules?: Json | null
          related_package_ids?: string[]
          related_service_ids?: string[]
          seo_description?: string | null
          seo_title?: string | null
          service_status?: string
          short_description_ar?: string
          slug?: string
          sort_order?: number
          specification_groups?: Json
          subcategory_id?: string | null
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          is_active: boolean
          name_ar: string
          name_en: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id: string
          is_active?: boolean
          name_ar: string
          name_en?: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name_ar?: string
          name_en?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          code: string
          created_at: string
          department_id: string | null
          description_ar: string
          id: string
          name_ar: string
          name_en: string
          specification_groups: Json
          updated_at: string
        }
        Insert: {
          code?: string
          created_at?: string
          department_id?: string | null
          description_ar?: string
          id: string
          name_ar: string
          name_en?: string
          specification_groups?: Json
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          department_id?: string | null
          description_ar?: string
          id?: string
          name_ar?: string
          name_en?: string
          specification_groups?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          client_avatar_url: string | null
          client_company_ar: string
          client_name_ar: string
          client_title_ar: string
          comment_ar: string
          created_at: string
          id: string
          is_active: boolean
          project_type_ar: string | null
          rating: number
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          client_avatar_url?: string | null
          client_company_ar?: string
          client_name_ar: string
          client_title_ar?: string
          comment_ar: string
          created_at?: string
          id: string
          is_active?: boolean
          project_type_ar?: string | null
          rating: number
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          client_avatar_url?: string | null
          client_company_ar?: string
          client_name_ar?: string
          client_title_ar?: string
          comment_ar?: string
          created_at?: string
          id?: string
          is_active?: boolean
          project_type_ar?: string | null
          rating?: number
          sort_order?: number
          status?: string
          updated_at?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
