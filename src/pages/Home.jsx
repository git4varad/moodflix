import { useCallback, useEffect, useState } from 'react';
import MoodInput from '../components/MoodInput.jsx';
import MovieRow from '../components/MovieRow.jsx';
import { detectMoodToGenre } from '../services/mood.js';
import { getGenreId } from '../services/genres.js';
import { fetchMoviesByGenre } from '../services/tmdb.js';

export default function Home() {
  const [genreId, setGenreId] = useState(getGenreId('drama'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState({
    enMovies: [],
    enTv: [],
    hiMovies: [],
    hiTv: [],
  });

  const applyMood = useCallback(
    (text) => {
      const trimmed = (text || '').trim();
      if (!trimmed) return;
      const g = detectMoodToGenre(trimmed);
      const id = getGenreId(g);
      console.debug('[MoodFlix] Mood → genre', { input: trimmed, genreKey: g, genreId: id });
      setGenreId(id);
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [enMovies, enTv, hiMovies, hiTv] = await Promise.all([
          fetchMoviesByGenre(genreId, 'movie', 'en'),
          fetchMoviesByGenre(genreId, 'tv', 'en'),
          fetchMoviesByGenre(genreId, 'movie', 'hi'),
          fetchMoviesByGenre(genreId, 'tv', 'hi'),
        ]);
        if (cancelled) return;
        console.debug('[MoodFlix] Row results', {
          enMovies: enMovies.length,
          enTv: enTv.length,
          hiMovies: hiMovies.length,
          hiTv: hiTv.length,
        });
        setRows({ enMovies, enTv, hiMovies, hiTv });
      } catch (e) {
        if (cancelled) return;
        console.error(e);
        setError(e.message || 'Failed to load titles');
        setRows({ enMovies: [], enTv: [], hiMovies: [], hiTv: [] });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [genreId]);

  return (
    <main className="pb-16">
      <section className="flex flex-col items-center justify-center min-h-[30vh] px-4 pt-8 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">What&apos;s your mood?</h1>
        <p className="text-zinc-400 text-center mb-8 max-w-lg">
          Describe how you feel — we&apos;ll pick a genre and line up English & Hindi movies and shows.
        </p>
        <MoodInput onSubmit={applyMood} />
      </section>

      <div id="section-english" className="scroll-mt-24">
        <MovieRow title="English Movies" items={rows.enMovies} mediaType="movie" loading={loading} />
        <MovieRow title="English TV Shows" items={rows.enTv} mediaType="tv" loading={loading} />
      </div>
      <div id="section-hindi" className="scroll-mt-24">
        <MovieRow title="Hindi Movies" items={rows.hiMovies} mediaType="movie" loading={loading} />
        <MovieRow title="Hindi TV Shows" items={rows.hiTv} mediaType="tv" loading={loading} />
      </div>

      {error && (
        <p className="px-4 sm:px-8 text-red-400 text-sm" role="alert">
          {error} — add <code className="text-zinc-300">VITE_TMDB_API_KEY</code> in <code className="text-zinc-300">.env</code>
        </p>
      )}
    </main>
  );
}
