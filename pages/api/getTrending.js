const supabase = require('@supabase/supabase-js');
const client = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    let network = body.network;
    network = network == 1 ? 'NETFLIX' : 'AMAZON PRIME VIDEO';
    let { data: trending, error } = await client
      .from('trending')
      .select('*')
      .eq('provider', network);
    res.statusCode = 200;
    res.json(trending);
  } catch (error) {
    res.status(500);
    res.send(error.toString());
  }
};
