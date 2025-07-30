
import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';

const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});

export async function webCrawler(url: string) {
  try {
    console.log('url :>> ', url);

    // Scrape a website:
    const scrapeResult = await app.scrapeUrl(url, { formats: ['html', 'markdown'], proxy: 'stealth' }) as ScrapeResponse;

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`)
    }
    // console.log(scrapeResult.markdown)
    return scrapeResult.markdown
  } catch (error) {
    console.error(`Error in webCrawler calling /api/crawl for ${url}:`, error);
    return JSON.stringify({
      error: 'Failed to crawl the URL by calling the crawl API.',
    });
  }
}
