import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url_here'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_supabase_service_role_key_here'

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)