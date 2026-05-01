import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const showSearch = pathname !== '/';

  function onSearch(e) {
    e.preventDefault();
    const s = q.trim();
    if (!s) return;
    navigate(`/search?q=${encodeURIComponent(s)}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black/90 to-transparent px-4 sm:px-8 py-4 flex flex-wrap items-center gap-4">
      <Link to="/" className="text-2xl font-bold text-netflix-red tracking-tight">
        MoodFlix
      </Link>
      {showSearch ? (
        <form onSubmit={onSearch} className="ml-auto flex flex-1 max-w-md min-w-[200px]">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search movies & TV…"
            className="flex-1 rounded-l bg-black/70 border border-zinc-600 border-r-0 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
            aria-label="Search"
          />
          <button
            type="submit"
            className="rounded-r bg-netflix-red px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Search
          </button>
        </form>
      ) : (
        <Link
          to="/search"
          className="ml-auto text-sm text-zinc-300 hover:text-white underline-offset-4 hover:underline"
        >
          Open search
        </Link>
      )}
    </header>
  );
}
