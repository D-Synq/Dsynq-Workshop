import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const thumb = video.default_thumb?.src || video.thumbs?.[0]?.src;

  return (
    <Link
      to={`/video/${video.id}`}
      className="group block bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-pink-500 transition"
    >
      <div className="relative aspect-video bg-zinc-800">
        {thumb && (
          <img
            src={thumb}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
        )}
        <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-1.5 py-0.5 rounded">
          {video.length_min}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 text-white group-hover:text-pink-400">
          {video.title}
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          {Number(video.views).toLocaleString()} views
        </p>
      </div>
    </Link>
  );
}