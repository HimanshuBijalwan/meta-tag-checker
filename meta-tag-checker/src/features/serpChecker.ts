import axios from 'axios';
import { JSDOM } from 'jsdom';
import { MetaTagResult } from '../types';

export async function checkSerp(query: string): Promise<MetaTagResult> {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const response = await axios.get(searchUrl);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const results = document.querySelectorAll('.g'); // Adjust the selector based on the actual SERP structure
    const metaTagResults: MetaTagResult[] = [];

    results.forEach(result => {
        const title = result.querySelector('h3')?.textContent || '';
        const link = result.querySelector('a')?.href || '';
        const snippet = result.querySelector('.IsZvec')?.textContent || ''; // Adjust based on actual snippet class

        metaTagResults.push({
            title,
            link,
            snippet,
        });
    });

    return {
        query,
        results: metaTagResults,
    };
}