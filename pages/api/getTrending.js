const supabase = require('@supabase/supabase-js');
const client = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    let network = body.network;
    network = network == 1 ? 'NETFLIX' : 'AMAZON PRIME VIDEO';
    if (req.query.size) {
      var { data: trending, error } = await client
        .from('trending')
        .select('*')
        .eq('provider', network)
        .range(0, req.query.size - 1);
    } else {
      var { data: trending, error } = await client
        .from('trending')
        .select('*')
        .eq('provider', network);
    }
    if (error) return res.status(401).json({ error: error.message });
    res.status(200).json(trending);
  } catch (error) {
    res.status(500);
    res.send(error.toString());
  }
};
