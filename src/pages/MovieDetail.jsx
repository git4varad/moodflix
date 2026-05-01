import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  getMovieDetails,
  getTvDetails,
  posterUrl,
  profileUrl,
  youtubeEmbed,
} from '../services/tmdb.js';

function pickTrailer(videos) {
  const list = videos?.results || [];
  const t = list.find((v) => v.site === 'YouTube' && v.type === 'Trailer') || list.find((v) => v.site === 'YouTube');
  return t?.key || null;
}

export default function MovieDetail() {
  const { media, id } = useParams();
  const validMedia = media === 'movie' || media === 'tv';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!validMedia) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const d =
          media === 'tv'
            ? await getTvDetails(id)
            : await getMovieDetails(id);
        if (!cancelled) {
          console.debug('[MoodFlix] Detail loaded', { media, id });
          setData(d);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [validMedia, media, id]);

  if (!validMedia) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <main className="px-4 sm:px-8 py-10 max-w-6xl mx-auto animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-80 aspect-[2/3] bg-zinc-800 rounded" />
          <div className="flex-1 space-y-4">
            <div className="h-10 bg-zinc-800 rounded w-2/3" />
            <div className="h-24 bg-zinc-800 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="px-4 py-16 text-center">
        <p className="text-red-400">{error || 'Not found'}</p>
        <Link to="/" className="text-netflix-red mt-4 inline-block">
          Home
        </Link>
      </main>
    );
  }

  const title = data.title || data.name;
  const overview = data.overview;
  const rating = data.vote_average?.toFixed(1);
  const genres = (data.genres || []).map((g) => g.name).join(', ');
  const poster = posterUrl(data.poster_path, 'w500');
  const credits = data.credits;
  const cast = (credits?.cast || []).slice(0, 12);
  const watch = data['watch/providers']?.results?.US || data['watch/providers']?.results?.IN;
  const flatrate = watch?.flatrate || [];
  const trailerKey = pickTrailer(data.videos);
  const embed = youtubeEmbed(trailerKey);

  return (
    <main className="px-4 sm:px-8 py-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0 mx-auto md:mx-0 w-full max-w-[280px]">
          {poster ? (
            <img src={poster} alt={title} className="w-full rounded-lg shadow-2xl" />
          ) : (
            <div className="aspect-[2/3] bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
              No poster
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-yellow-400 mb-2">★ {rating} / 10</p>
          {genres && <p className="text-zinc-400 text-sm mb-4">{genres}</p>}
          <p className="text-zinc-300 leading-relaxed">{overview || 'No overview.'}</p>
        </div>
      </div>

      {cast.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto row-scroll pb-2">
            {cast.map((c) => {
              const src = profileUrl(c.profile_path);
              return (
                <div key={c.id} className="flex-shrink-0 w-24 text-center">
                  {src ? (
                    <img src={src} alt={c.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-1" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-zinc-800 mx-auto mb-1" />
                  )}
                  <p className="text-xs text-zinc-300 line-clamp-2">{c.name}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {flatrate.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Streaming</h2>
          <div className="flex flex-wrap gap-4">
            {flatrate.map((p) => (
              <div key={p.provider_id} className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded">
                {p.logo_path && (
                  <img
                    src={posterUrl(p.logo_path, 'w92')}
                    alt={p.provider_name}
                    className="h-8 w-8 rounded object-contain"
                  />
                )}
                <span className="text-sm">{p.provider_name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {embed && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Trailer</h2>
          <div className="aspect-video max-w-3xl rounded-lg overflow-hidden bg-black">
            <iframe
              title="Trailer"
              src={embed}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      <Link to="/" className="text-netflix-red hover:underline">
        ← Back to mood
      </Link>
    </main>
  );
}
