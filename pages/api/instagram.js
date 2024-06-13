import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await axios.get(`https://www.instagram.com/${username}/`);
    const html = response.data;
    const $ = cheerio.load(html);
    
    let posts = [];
    
    $('article a').each((index, element) => {
      const url = $(element).attr('href');
      const imgElement = $(element).find('img');
      const thumbnail = imgElement.attr('src');
      const caption = imgElement.attr('alt');
      posts.push({
        url: `https://www.instagram.com${url}`,
        thumbnail,
        caption
      });
    });
    //hola

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
