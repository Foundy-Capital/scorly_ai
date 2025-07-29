
import * as cheerio from 'cheerio';

export async function webCrawler(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style').remove();

    // Get the text from the body
    const text = $('body').text().replace(/\s\s+/g, ' ').trim();

    return JSON.stringify({ text });

  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
    return JSON.stringify({
      error: 'Failed to crawl the URL.',
    });
  }
}
