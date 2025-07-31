
import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import * as cheerio from 'cheerio';

const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});

export async function webCrawler(url: string) {
  try {
    // console.log('url :>> ', url);

    // const scrapeResult = await app.scrapeUrl(url, { formats: ['html', 'markdown'], proxy: 'stealth', 'maxAge': 86400000  }) as ScrapeResponse;
    const scrapeResult = await app.scrapeUrl(url, {
      formats: ['rawHtml', 'markdown'],
      proxy: 'stealth',
      maxAge: 86400000,
      location: {
        country: "US",
        languages: ["en-US"]
        }
      }) as ScrapeResponse;

    if (!scrapeResult.success || !scrapeResult.markdown) {
      throw new Error(`Failed to scrape: ${scrapeResult.error || 'No data returned'}`)
    }

    if (scrapeResult.rawHtml) {
      const $ = cheerio.load(scrapeResult.rawHtml);
      const scriptContent = $('script[id="__DATA"][type="application/json"]').html();

      if (scriptContent) {
        try {
          const jsonData = JSON.parse(scriptContent);
          if (jsonData.property) {
            return JSON.stringify(jsonData.property, null, 2);
          }
        } catch (error) {
          console.error('Error parsing JSON from script tag:', error);
        }
      }
    }

    return scrapeResult.markdown;
  } catch (error) {
    console.error(`Error in webCrawler calling /api/crawl for ${url}:`, error);
    return null
  }
}
