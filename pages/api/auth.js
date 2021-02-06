const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
