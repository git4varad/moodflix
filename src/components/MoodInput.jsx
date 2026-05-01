import { useState } from 'react';

/**
 * Single mood textbox. Submits on Enter only (no duplicate inputs).
 */
export default function MoodInput({ onSubmit, placeholder = 'How do you feel? e.g. lonely, funny, thrill…' }) {
  const [value, setValue] = useState('');

  function submit() {
    const v = value.trim();
    if (!v) return;
    console.debug('[MoodFlix] MoodInput submit:', v);
    onSubmit(v);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-md bg-black/60 border border-zinc-600 px-4 py-3 text-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
        aria-label="Mood"
      />
    </div>
  );
}
