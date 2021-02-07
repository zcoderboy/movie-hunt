const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async (req, res) => {
  if (req.cookies['_supabase']) {
    let session = JSON.parse(req.cookies['_supabase']);
    const { data, error } = await supabase
      .from('preferences')
      .select('*')
      .eq('user_id', session.user.id);
    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json(data.length ? data[0].value : []);
  }
  return res.status(500);
};
