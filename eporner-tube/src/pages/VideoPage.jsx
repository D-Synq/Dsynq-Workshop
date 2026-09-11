import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVideoById } from "../api/eporner";
import VideoPlayer from "../components/VideoPlayer";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getVideoById(id)
      .then(setVideo)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-zinc-500 py-20">Loading video...</div>
    );
  }

  if (error || !video) {
    return (
      <div className="text-center text-red-400 py-20">
        {error || "Video not found"}
        <div className="mt-4">
          <Link to="/" className="text-pink-500 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-sm text-zinc-400 hover:text-pink-400 mb-4 inline-block"
      >
        ← Back
      </Link>

      <VideoPlayer embedUrl={video.embed} title={video.title} />

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-white">{video.title}</h1>
        <div className="flex gap-4 text-sm text-zinc-400 mt-2">
          <span>{Number(video.views).toLocaleString()} views</span>
          <span>{video.length_min}</span>
          <span>Rating: {video.rate}</span>
        </div>

        {video.keywords && (
          <div className="mt-4 flex flex-wrap gap-2">
            {video.keywords.split(",").map((tag) => (
              <span
                key={tag}
                className="bg-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-300"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}