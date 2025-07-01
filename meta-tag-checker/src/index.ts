import express from 'express';
import { checkMetaOgImage } from './features/metaOgImageChecker';
import { checkTwitterCard } from './features/twitterCardChecker';
import { checkSerp } from './features/serpChecker';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/check/meta-og-image', async (req, res) => {
    const { url } = req.body;
    try {
        const result = await checkMetaOgImage(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/check/twitter-card', async (req, res) => {
    const { url } = req.body;
    try {
        const result = await checkTwitterCard(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/check/serp', async (req, res) => {
    const { query } = req.body;
    try {
        const result = await checkSerp(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Meta Tag Checker running on http://localhost:${PORT}`);
});