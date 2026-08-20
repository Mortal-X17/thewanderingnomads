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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          achievements: string[]
          biography: string
          certifications: string[]
          cta_href: string | null
          cta_label: string | null
          founder_image_url: string | null
          founder_name: string
          founder_title: string
          id: string
          secondary_identity: string
          updated_at: string
        }
        Insert: {
          achievements?: string[]
          biography?: string
          certifications?: string[]
          cta_href?: string | null
          cta_label?: string | null
          founder_image_url?: string | null
          founder_name?: string
          founder_title?: string
          id?: string
          secondary_identity?: string
          updated_at?: string
        }
        Update: {
          achievements?: string[]
          biography?: string
          certifications?: string[]
          cta_href?: string | null
          cta_label?: string | null
          founder_image_url?: string | null
          founder_name?: string
          founder_title?: string
          id?: string
          secondary_identity?: string
          updated_at?: string
        }
        Relationships: []
      }
      atlas_destinations: {
        Row: {
          id: string
          kind: string | null
          name: string
          region_id: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          tips: string[]
          updated_at: string
        }
        Insert: {
          id?: string
          kind?: string | null
          name: string
          region_id: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          tips?: string[]
          updated_at?: string
        }
        Update: {
          id?: string
          kind?: string | null
          name?: string
          region_id?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          tips?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "atlas_destinations_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "atlas_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      atlas_regions: {
        Row: {
          code: string
          cover_image_url: string | null
          culture: string | null
          favorite_memory: string | null
          food: string[]
          founder_note: string | null
          hidden_gems: string[]
          id: string
          journal: string | null
          kind: string
          name: string
          overview: string | null
          sort_order: number
          stats: Json
          status: Database["public"]["Enums"]["content_status"]
          tips: string[]
          updated_at: string
          visited: boolean
          visited_year: number | null
        }
        Insert: {
          code: string
          cover_image_url?: string | null
          culture?: string | null
          favorite_memory?: string | null
          food?: string[]
          founder_note?: string | null
          hidden_gems?: string[]
          id?: string
          journal?: string | null
          kind?: string
          name: string
          overview?: string | null
          sort_order?: number
          stats?: Json
          status?: Database["public"]["Enums"]["content_status"]
          tips?: string[]
          updated_at?: string
          visited?: boolean
          visited_year?: number | null
        }
        Update: {
          code?: string
          cover_image_url?: string | null
          culture?: string | null
          favorite_memory?: string | null
          food?: string[]
          founder_note?: string | null
          hidden_gems?: string[]
          id?: string
          journal?: string | null
          kind?: string
          name?: string
          overview?: string | null
          sort_order?: number
          stats?: Json
          status?: Database["public"]["Enums"]["content_status"]
          tips?: string[]
          updated_at?: string
          visited?: boolean
          visited_year?: number | null
        }
        Relationships: []
      }
      atlas_stories: {
        Row: {
          destination_id: string | null
          id: string
          narrative: string | null
          region_id: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          story_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          destination_id?: string | null
          id?: string
          narrative?: string | null
          region_id: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          story_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          destination_id?: string | null
          id?: string
          narrative?: string | null
          region_id?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          story_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "atlas_stories_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "atlas_destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atlas_stories_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "atlas_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_email: string | null
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          summary: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          summary?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          summary?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      design_settings: {
        Row: {
          accent_color: string
          animation_intensity: number
          animation_speed: number
          base_font_size: number
          bg_dark: string
          bg_light: string
          body_font: string
          border_color: string
          glass_blur: number
          glass_opacity: number
          heading_font: string
          id: string
          primary_color: string
          radius: number
          text_dark: string
          text_light: string
          updated_at: string
        }
        Insert: {
          accent_color?: string
          animation_intensity?: number
          animation_speed?: number
          base_font_size?: number
          bg_dark?: string
          bg_light?: string
          body_font?: string
          border_color?: string
          glass_blur?: number
          glass_opacity?: number
          heading_font?: string
          id?: string
          primary_color?: string
          radius?: number
          text_dark?: string
          text_light?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string
          animation_intensity?: number
          animation_speed?: number
          base_font_size?: number
          bg_dark?: string
          bg_light?: string
          body_font?: string
          border_color?: string
          glass_blur?: number
          glass_opacity?: number
          heading_font?: string
          id?: string
          primary_color?: string
          radius?: number
          text_dark?: string
          text_light?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          album: string | null
          alt_text: string | null
          caption: string | null
          created_at: string
          destination_id: string | null
          id: string
          journey_id: string | null
          location: string | null
          media_id: string | null
          region_id: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          url: string
        }
        Insert: {
          album?: string | null
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          destination_id?: string | null
          id?: string
          journey_id?: string | null
          location?: string | null
          media_id?: string | null
          region_id?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          url: string
        }
        Update: {
          album?: string | null
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          destination_id?: string | null
          id?: string
          journey_id?: string | null
          location?: string | null
          media_id?: string | null
          region_id?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "atlas_destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_images_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_images_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_images_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "atlas_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          id: string
          journey_id: string
          media_id: string | null
          sort_order: number
          url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          id?: string
          journey_id: string
          media_id?: string | null
          sort_order?: number
          url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          id?: string
          journey_id?: string
          media_id?: string | null
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_images_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journey_images_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      journeys: {
        Row: {
          best_season: string | null
          booking_url: string | null
          created_at: string
          cta_label: string | null
          destination: string
          difficulty: string | null
          duration: string | null
          hero_image_url: string | null
          highlights: string[]
          id: string
          is_available: boolean
          itinerary: Json
          long_description: string | null
          notes: string | null
          price: string | null
          short_description: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          travel_info: string | null
          updated_at: string
        }
        Insert: {
          best_season?: string | null
          booking_url?: string | null
          created_at?: string
          cta_label?: string | null
          destination?: string
          difficulty?: string | null
          duration?: string | null
          hero_image_url?: string | null
          highlights?: string[]
          id?: string
          is_available?: boolean
          itinerary?: Json
          long_description?: string | null
          notes?: string | null
          price?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          travel_info?: string | null
          updated_at?: string
        }
        Update: {
          best_season?: string | null
          booking_url?: string | null
          created_at?: string
          cta_label?: string | null
          destination?: string
          difficulty?: string | null
          duration?: string | null
          hero_image_url?: string | null
          highlights?: string[]
          id?: string
          is_available?: boolean
          itinerary?: Json
          long_description?: string | null
          notes?: string | null
          price?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          travel_info?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          bucket: string
          created_at: string
          created_by: string | null
          filename: string
          height: number | null
          id: string
          mime_type: string | null
          path: string
          size_bytes: number | null
          url: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          created_by?: string | null
          filename: string
          height?: number | null
          id?: string
          mime_type?: string | null
          path: string
          size_bytes?: number | null
          url: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          created_by?: string | null
          filename?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          path?: string
          size_bytes?: number | null
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      milestones: {
        Row: {
          description: string | null
          id: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          cta_href: string | null
          cta_label: string | null
          data: Json
          description: string | null
          heading: string | null
          id: string
          image_url: string | null
          page: string
          secondary_cta_href: string | null
          secondary_cta_label: string | null
          section_key: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          subtitle: string | null
          updated_at: string
        }
        Insert: {
          cta_href?: string | null
          cta_label?: string | null
          data?: Json
          description?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          page: string
          secondary_cta_href?: string | null
          secondary_cta_label?: string | null
          section_key: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          updated_at?: string
        }
        Update: {
          cta_href?: string | null
          cta_label?: string | null
          data?: Json
          description?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          page?: string
          secondary_cta_href?: string | null
          secondary_cta_label?: string | null
          section_key?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          favicon_url: string | null
          footer_copyright: string
          id: string
          keywords: string
          launch_at: string
          launch_status: string
          logo_url: string | null
          og_image_url: string | null
          seo_description: string
          seo_title: string
          site_description: string
          site_title: string
          timezone: string
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          favicon_url?: string | null
          footer_copyright?: string
          id?: string
          keywords?: string
          launch_at?: string
          launch_status?: string
          logo_url?: string | null
          og_image_url?: string | null
          seo_description?: string
          seo_title?: string
          site_description?: string
          site_title?: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          favicon_url?: string | null
          footer_copyright?: string
          id?: string
          keywords?: string
          launch_at?: string
          launch_status?: string
          logo_url?: string | null
          og_image_url?: string | null
          seo_description?: string
          seo_title?: string
          site_description?: string
          site_title?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          handle: string | null
          id: string
          is_published: boolean
          label: string
          platform: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          handle?: string | null
          id?: string
          is_published?: boolean
          label?: string
          platform: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          handle?: string | null
          id?: string
          is_published?: boolean
          label?: string
          platform?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          id: string
          name: string
          rating: number | null
          review: string
          review_date: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          trip: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          id?: string
          name: string
          rating?: number | null
          review: string
          review_date?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          trip?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          id?: string
          name?: string
          rating?: number | null
          review?: string
          review_date?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          trip?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_exists: { Args: never; Returns: boolean }
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      content_status: "draft" | "published"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      content_status: ["draft", "published"],
    },
  },
} as const
