require('isomorphic-fetch');

export default async (req, res) => {
  let response = await fetch(`${process.env.IMDB_BASE_URL}/genre/movie/list`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.IMDB_TOKEN}`
    }
  });
  if (response.ok) {
    let data = await response.json();
    res.status(200);
    res.send(data.genres);
  } else {
    res.status(response.status);
    res.send('Request failed');
  }
};
