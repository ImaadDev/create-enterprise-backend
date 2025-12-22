import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

function createSupabaseClient(name, url, key) {
  if (!url || !key) {
    console.warn(`⚠️ Supabase ${name} client disabled (missing env vars)`);
    return null;
  }

  return createClient(url, key);
}

export const supabasePublic = createSupabaseClient(
  "public",
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);

export const supabaseAdmin = createSupabaseClient(
  "admin",
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);
