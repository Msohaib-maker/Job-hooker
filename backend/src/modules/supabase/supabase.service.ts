import { Global, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://moppbxflxjwwfrplqaff.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcHBieGZseGp3d2ZycGxxYWZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY5MTczMiwiZXhwIjoyMDgwMjY3NzMyfQ.TFl7w-kqDkpxcxUZnMSXLxouLEQfPxBaN4z0bguLRQU";

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
