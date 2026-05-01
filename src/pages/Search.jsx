import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMulti, posterUrl } from '../services/tmdb.js';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMulti(q);
        if (cancelled) return;
        const list = (data.results || []).filter(
          (r) => r.media_type === 'movie' || r.media_type === 'tv'
        );
        console.debug('[MoodFlix] Search API', { q, count: list.length });
        setResults(list);
      } catch (e) {
        if (!cancelled) {
          setError(e.message);
          setResults([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <main className="px-4 sm:px-8 py-8 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6">
        {q ? `Results for “${q}”` : 'Search'}
      </h1>
      {!q && <p className="text-zinc-500">Enter a query in the search bar.</p>}
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded bg-zinc-800 animate-pulse" />
          ))}
        </div>
      )}
      {!loading && results.length === 0 && q && !error && (
        <p className="text-zinc-500">No movies or TV shows found.</p>
      )}
      {!loading && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((item) => {
          const type = item.media_type;
          const title = item.title || item.name;
          const src = posterUrl(item.poster_path, 'w342');
          return (
            <button
              key={`${type}-${item.id}`}
              type="button"
              onClick={() => navigate(`/${type}/${item.id}`)}
              className="text-left rounded overflow-hidden bg-zinc-900 hover:ring-2 hover:ring-netflix-red transition-shadow"
            >
              {src ? (
                <img src={src} alt={title} className="w-full aspect-[2/3] object-cover" loading="lazy" />
              ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center text-xs text-zinc-500 p-2">
                  {title}
                </div>
              )}
              <p className="p-2 text-sm line-clamp-2">{title}</p>
            </button>
          );
        })}
      </div>
      )}
    </main>
  );
}
