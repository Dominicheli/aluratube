import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://oyhcilksrmtkdkbojbcj.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95aGNpbGtzcm10a2RrYm9qYmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMzk0MTAsImV4cCI6MTk4MzkxNTQxMH0.rcwAGZB5LTaVLH6FdwjuRaPkgE48ClzIanXIrAruc1M";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    },
  };
}
