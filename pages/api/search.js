const supabase = require('@supabase/supabase-js');
const client = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function getMedias(query) {
  let { data, error } = await client.from('movies').select('*');
  let matches = data;
  Object.keys(query).forEach((key) => {
    if (key === 'genre') {
      matches = matches.filter((media) => {
        let match = false;
        media.data.genres.forEach((genre) => {
          if (query.genre === genre.id) {
            match = true;
          }
        });
        return match;
      });
    }
    if (key === 'year') {
      matches = matches.filter((media) => {
        return media.data.release_date.split('-')[0] >= query.year ? true : false;
      });
    }
    if (key === 'network') {
      matches = matches.filter((media) => {
        return media.provider === query.network || query.network === 'ANY' ? true : false;
      });
    }
  });
  return matches;
}
export default async (req, res) => {
  try {
    const data = await getMedias(JSON.parse(req.body));
    res.statusCode = 200;
    res.json(data);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
