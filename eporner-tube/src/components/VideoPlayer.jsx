export default function VideoPlayer({ embedUrl, title }) {
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen"
      />
    </div>
  );
}