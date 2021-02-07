const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async (req, res) => {
  if (req.cookies['_supabase']) {
    try {
      let session = JSON.parse(req.cookies['_supabase']);
      await supabase.from('preferences').delete().eq('user_id', session.user.id);
      const { data, error } = await supabase.from('preferences').insert([JSON.parse(req.body)]);
      if (error) return res.status(401).json({ error: error.message });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send(error.toString());
    }
  }
  return res.status(500);
};
