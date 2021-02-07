const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
import { serialize } from 'cookie';

export default async (req, res) => {
  if (req.cookies['_supabase']) {
    let session = JSON.parse(req.cookies['_supabase']);
    const { data: user, error } = await supabase.auth.api.getUser(session.access_token);
    if (error) {
      res.setHeader('Set-Cookie', [
        serialize('_supabase', '', {
          maxAge: -1,
          path: '/api'
        })
      ]);
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return res.status(200).json(user);
  }
  return res.status(401).json({});
};
