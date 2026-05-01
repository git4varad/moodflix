/**
 * English / Hindi sections — clicking scrolls to the matching block and updates active language.
 * Does not add a second text input.
 */
export default function CategoryBox({ active, onSelect }) {
  const btn = (id, label) => (
    <button
      type="button"
      onClick={() => {
        onSelect(id);
        const el = document.getElementById(id === 'en' ? 'section-english' : 'section-hindi');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
        active === id
          ? 'bg-netflix-red text-white'
          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {btn('en', 'English')}
      {btn('hi', 'Hindi')}
    </div>
  );
}
