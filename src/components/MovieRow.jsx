import { useNavigate } from 'react-router-dom';
import { posterUrl } from '../services/tmdb.js';

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[140px] sm:w-[160px] aspect-[2/3] rounded bg-zinc-800 animate-pulse" />
  );
}

export default function MovieRow({ title, items = [], mediaType = 'movie', loading = false }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 px-4 sm:px-8 text-zinc-100">{title}</h2>
        <div className="flex gap-3 overflow-x-auto row-scroll px-4 sm:px-8 pb-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 px-4 sm:px-8 text-zinc-100">{title}</h2>
        <p className="px-4 sm:px-8 text-zinc-500 text-sm">No titles found for this mood.</p>
      </section>
    );
  }

  return (
    <section className="mb-8" id={`row-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2 className="text-lg sm:text-xl font-semibold mb-3 px-4 sm:px-8 text-zinc-100">{title}</h2>
      <div className="flex gap-3 overflow-x-auto row-scroll px-4 sm:px-8 pb-2 scroll-smooth">
        {items.map((item) => {
          const id = item.id;
          const path = item.poster_path;
          const name = item.title || item.name;
          const type = mediaType === 'tv' ? 'tv' : 'movie';
          const src = posterUrl(path, 'w342');
          return (
            <button
              key={`${type}-${id}`}
              type="button"
              onClick={() => navigate(`/${type}/${id}`)}
              className="flex-shrink-0 w-[140px] sm:w-[160px] rounded overflow-hidden bg-zinc-900 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:z-10 focus:outline-none focus:ring-2 focus:ring-netflix-red text-left"
            >
              {src ? (
                <img src={src} alt={name || ''} className="w-full aspect-[2/3] object-cover" loading="lazy" />
              ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center text-xs text-zinc-500 p-2">{name}</div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
