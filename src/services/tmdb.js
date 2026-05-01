const BASE = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p';

function getKey() {
  const k = import.meta.env.VITE_TMDB_API_KEY;
  if (!k) console.warn('[MoodFlix] Missing VITE_TMDB_API_KEY in .env');
  return k || '';
}

async function getJson(path, params = {}) {
  const key = getKey();
  const u = new URL(BASE + path);
  u.searchParams.set('api_key', key);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') u.searchParams.set(k, String(v));
  });
  const res = await fetch(u.toString());
  if (!res.ok) {
    const err = new Error(`TMDb ${res.status}: ${path}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/**
 * @param {number} genreId TMDb genre id
 * @param {'movie' | 'tv'} type
 * @param {'en' | 'hi'} language English or Hindi-focused catalog
 */
export async function fetchMoviesByGenre(genreId, type, language = 'en') {
  const path = type === 'movie' ? '/discover/movie' : '/discover/tv';
  const params = {
    with_genres: genreId,
    sort_by: 'popularity.desc',
    page: 1,
  };
  if (language === 'hi') {
    params.with_original_language = 'hi';
    params.language = 'hi-IN';
  } else {
    params.language = 'en-US';
  }
  const data = await getJson(path, params);
  console.debug('[MoodFlix] fetchMoviesByGenre', { genreId, type, language, results: data?.results?.length });
  return data.results || [];
}

export async function searchMulti(query, page = 1) {
  if (!query?.trim()) return { results: [] };
  return getJson('/search/multi', {
    query: query.trim(),
    page,
    language: 'en-US',
    include_adult: false,
  });
}

export async function getMovieDetails(id) {
  return getJson(`/movie/${id}`, { append_to_response: 'credits,videos,watch/providers' });
}

export async function getTvDetails(id) {
  return getJson(`/tv/${id}`, { append_to_response: 'credits,videos,watch/providers' });
}

export function posterUrl(path, size = 'w500') {
  if (!path) return null;
  return `${IMG}/${size}${path}`;
}

export function profileUrl(path, size = 'w185') {
  if (!path) return null;
  return `${IMG}/${size}${path}`;
}

export function youtubeEmbed(key) {
  if (!key) return null;
  return `https://www.youtube.com/embed/${key}`;
}
