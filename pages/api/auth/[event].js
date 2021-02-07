import cookies from '../../../utils/cookies';
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const handler = async (req, res) => {
  const {
    query: { event }
  } = req;
  if (event === 'login') {
    let { data, error } = await supabase.auth.signIn(JSON.parse(req.body));
    if (error) return res.status(401).json({ error: error.message });
    res.cookie('_supabase', { ...data }, { path: '/api' });
    res.send(data);
  } else if (event === 'logout') {
    let { error } = await supabase.auth.signOut();
    res.cookie('_supabase', '', { maxAge: -1, path: '/api' });
    if (error) return res.status(401).json({ error: error.message });
    res.status(200).send('');
  } else if (event === 'register') {
    let { data, error } = await supabase.auth.signUp(JSON.parse(req.body));
    if (error) return res.status(401).json({ error: error.message });
    res.cookie('_supabase', { ...data }, { path: '/api' });
    res.send(data);
  }
};

export default cookies(handler);
