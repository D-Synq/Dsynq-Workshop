export default function VideoCardSkeleton() {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-zinc-800" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-zinc-800 rounded w-5/6" />
        <div className="h-3 bg-zinc-800 rounded w-2/5" />
      </div>
    </div>
  );
}