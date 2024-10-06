const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/pinterest', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) throw new Error('Query parameter is required');

        const images = await pinterest(query);
        res.status(200).json({ data: images });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/wallpaper', async (req, res) => {
    try {
        const { title, page } = req.query;
        if (!title) throw new Error('Title parameter is required');

        const wallpapers = await wallpaper(title, page);
        res.status(200).json({ data: wallpapers });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/wikimedia', async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) throw new Error('Title parameter is required');

        const media = await wikimedia(title);
        res.status(200).json({ data: media });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/quotesanime', async (req, res) => {
    try {
        const quotes = await quotesAnime();
        res.status(200).json({ data: quotes });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/aiovideodl', async (req, res) => {
    try {
        const { link } = req.body;
        if (!link) throw new Error('Link parameter is required');

        const videoData = await aiovideodl(link);
        res.status(200).json({ data: videoData });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/umma', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) throw new Error('URL parameter is required');

        const mediaInfo = await umma(url);
        res.status(200).json({ data: mediaInfo });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/ringtone', async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) throw new Error('Title parameter is required');

        const ringtones = await ringtone(title);
        res.status(200).json({ data: ringtones });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/styletext', async (req, res) => {
    try {
        const { text } = req.query;
        if (!text) throw new Error('Text parameter is required');

        const styledText = await styletext(text);
        res.status(200).json({ data: styledText });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function pinterest(query) {
    try {
        const response = await axios.get(`https://id.pinterest.com/search/pins/?autologin=true&q=${query}`, {
            headers: {
                "cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
            }
        });

        const $ = cheerio.load(response.data);
        const images = [];
        $('div > a').each((index, element) => {
            const imageUrl = $(element).find('img').attr('src');
            if (imageUrl) {
                images.push(imageUrl.replace(/236/g, '736'));
            }
        });

        return images;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function wallpaper(title, page = '1') {
    try {
        const response = await axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`);
        const $ = cheerio.load(response.data);
        const wallpapers = [];
        $('div.grid-item').each((index, element) => {
            const title = $(element).find('div.info > a > h3').text();
            const type = $(element).find('div.info > a:nth-child(2)').text();
            const source = 'https://www.besthdwallpaper.com/' + $(element).find('div > a:nth-child(3)').attr('href');
            const image = [
                $(element).find('picture > img').attr('data-src') || $(element).find('picture > img').attr('src'),
                $(element).find('picture > source:nth-child(1)').attr('srcset'),
                $(element).find('picture > source:nth-child(2)').attr('srcset')
            ];
            wallpapers.push({ title, type, source, image });
        });
        return wallpapers;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function wikimedia(title) {
    try {
        const response = await axios.get(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`);
        const $ = cheerio.load(response.data);
        const media = [];
        $('.sdms-search-results__list-wrapper > div > a').each((index, element) => {
            const title = $(element).find('img').attr('alt');
            const source = $(element).attr('href');
            const image = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');
            media.push({ title, source, image });
        });
        return media;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function quotesAnime() {
    try {
        const page = Math.floor(Math.random() * 184);
        const response = await axios.get(`https://otakotaku.com/quote/feed/${page}`);
        const $ = cheerio.load(response.data);
        const quotes = [];
        $('div.kotodama-list').each((index, element) => {
            const link = $(element).find('a').attr('href');
            const gambar = $(element).find('img').attr('data-src');
            const karakter = $(element).find('div.char-name').text().trim();
            const anime = $(element).find('div.anime-title').text().trim();
            const episode = $(element).find('div.meta').text();
            const up_at = $(element).find('small.meta').text();
            const quote = $(element).find('div.quote').text().trim();
            quotes.push({ link, gambar, karakter, anime, episode, up_at, quote });
        });
        return quotes;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function aiovideodl(link) {
    try {
        const src = await axios.get('https://aiovideodl.ml/', {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
            }
        });
        const a = cheerio.load(src.data);
        const token = a('#token').attr('value');
        const videoData = await axios.post('https://aiovideodl.ml/wp-json/aio-dl/video-data/', new URLSearchParams(Object.entries({ 'url': link, 'token': token })), {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
            }
        });
        return videoData.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function umma(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const image = [];
        $('#article-content > div').find('img').each((index, element) => {
            image.push($(element).attr('src'));
        });
        const title = $('#wrap > div.content-container.font-6-16 > h1').text().trim();
        const author = {
            name: $('#wrap > div.content-container.font-6-16 > div.content-top > div > div.user-ame.font-6-16.fw').text().trim(),
            profilePic: $('#wrap > div.content-container.font-6-16 > div.content-top > div > div.profile-photo > img.photo').attr('src')
        };
        const caption = $('#article-content > div > p').text().trim();
        const media = $('#article-content > div > iframe').attr('src') ? [$('#article-content > div > iframe').attr('src')] : image;
        const type = $('#article-content > div > iframe').attr('src') ? 'video' : 'image';
        const like = $('#wrap > div.bottom-btns > div > button:nth-child(1) > div.text.font-6-12').text();
        return { title, author, caption, media, type, like };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function ringtone(title) {
    try {
        const response = await axios.get(`https://meloboom.com/en/search/${title}`);
        const $ = cheerio.load(response.data);
        const ringtones = [];
        $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each((index, element) => {
            const title = $(element).find('h4').text();
            const source = 'https://meloboom.com/' + $(element).find('a').attr('href');
            const audio = $(element).find('audio').attr('src');
            ringtones.push({ title, source, audio });
        });
        return ringtones;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function styletext(text) {
    try {
        const response = await axios.get(`http://qaz.wtf/u/convert.cgi?text=${text}`);
        const $ = cheerio.load(response.data);
        const styles = [];
        $('table > tbody > tr').each((index, element) => {
            const name = $(element).find('td:nth-child(1) > span').text();
            const result = $(element).find('td:nth-child(2)').text().trim();
            styles.push({ name, result });
        });
        return styles;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = router;
