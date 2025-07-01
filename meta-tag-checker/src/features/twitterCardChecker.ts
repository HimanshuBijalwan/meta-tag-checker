import axios from 'axios';
import { JSDOM } from 'jsdom';
import { MetaTagResult } from '../types';

export const checkTwitterCard = async (url: string): Promise<MetaTagResult> => {
    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const twitterCardTags = [
            'twitter:card',
            'twitter:title',
            'twitter:description',
            'twitter:image'
        ];

        const results: MetaTagResult = {
            url,
            tags: {},
            missingTags: [],
            valid: true
        };

        twitterCardTags.forEach(tag => {
            const metaTag = document.querySelector(`meta[name="${tag}"]`) || document.querySelector(`meta[property="${tag}"]`);
            if (metaTag && metaTag.getAttribute('content')) {
                results.tags[tag] = metaTag.getAttribute('content');
            } else {
                results.missingTags.push(tag);
                results.valid = false;
            }
        });

        return results;
    } catch (error) {
        throw new Error(`Failed to fetch URL: ${url}. Error: ${error.message}`);
    }
};