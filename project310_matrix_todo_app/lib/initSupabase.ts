// import { createClient } from "@supabase/supabase-js";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
// const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ?? "";

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export const supabase = createClientComponentClient();
