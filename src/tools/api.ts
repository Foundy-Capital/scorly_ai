import axios from 'axios';

export async function fetchFromApi(url: string, headers: any, params: any) {
  try {
    const response = await axios.get(url, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from API: ${url}`, error);
    return {
      error: 'Failed to fetch data from the API.',
    };
  }
}

