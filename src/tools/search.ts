import * as cheerio from 'cheerio';

export async function postSearch(query: string) {
  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);
    // console.log('html :>> ', html);

    const results: { title: string; link: string; snippet: string }[] = [];

    $('.result').each((i, el) => {
      if (i >= 5) return;

      const title = $(el).find('.result__a').text().trim();
      const link = $(el).find('.result__a').attr('href');
      const snippet = $(el).find('.result__snippet').text().trim();
      // console.log('title :>> ', title);
      // console.log('link :>> ', link);
      // console.log('snippet :>> ', snippet);

      if (title && link) {
        results.push({
          title,
          link: link,
          snippet
        });
      }
    });

    return JSON.stringify(results);
  } catch (error) {
    console.error('DuckDuckGo search error:', error);
    return JSON.stringify({
      error: 'Search failed',
      results: [],
    });
  }
}
