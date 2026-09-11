import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-pink-500">
          TubeSite
        </Link>
        <div className="text-sm text-zinc-400">Powered by Eporner API</div>
      </div>
    </nav>
  );
}