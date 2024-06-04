import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.instagram.com/${username}/`);

        // Espera a que el contenido de las publicaciones se cargue
        await page.waitForSelector('article');

        // Extrae los datos de las publicaciones
        const posts = await page.evaluate(() => {
            const postElements = document.querySelectorAll('article a');
            const posts = [];
            postElements.forEach(postElement => {
                const url = postElement.href;
                const imgElement = postElement.querySelector('img');
                const thumbnail = imgElement ? imgElement.src : '';
                const caption = imgElement ? imgElement.alt : '';
                posts.push({ url, thumbnail, caption });
            });
            return posts;
        });

        await browser.close();

        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
