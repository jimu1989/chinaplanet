import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  console.log("=== SUPABASE BROWSER CONFIG ===");
  console.log("URL:", url);
  console.log("KEY EXISTS:", !!key);
  console.log("KEY LENGTH:", key?.length);
  console.log("KEY PREFIX:", key?.slice(0, 20));

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing");
  }

  return createBrowserClient(url, key);
}
