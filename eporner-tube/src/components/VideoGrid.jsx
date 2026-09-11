import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }) {
  if (!videos?.length) {
    return (
      <div className="text-center text-zinc-500 py-20">
        No videos found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}