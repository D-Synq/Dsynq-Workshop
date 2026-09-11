import { useState } from "react";

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim() || "all");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2.5 rounded-lg font-medium transition"
      >
        Search
      </button>
    </form>
  );
}