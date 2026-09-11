import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchVideos } from "../api/eporner";
import SearchBar from "../components/SearchBar";
import VideoGrid from "../components/VideoGrid";
import VideoGridSkeleton from "../components/VideoGridSkeleton";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef(null);

  const query = searchParams.get("q") || "all";
  const order = searchParams.get("order") || "latest";

  useEffect(() => {
    setVideos([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    setError(null);
  }, [query, order]);

  const fetchVideos = useCallback(
    async (pageNum, isReset = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const data = await searchVideos({
          query,
          page: pageNum,
          order,
          perPage: 24,
        });

        setVideos((prev) => (isReset ? data.videos : [...prev, ...data.videos]));
        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [query, order, loading]
  );

  useEffect(() => {
    fetchVideos(page, page === 1);
  }, [page, query, order]);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "500px",
        threshold: 0.1,
      }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading, hasMore]);

  const handleSearch = (q) => {
    setSearchParams({ q, order });
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({ q: query, order: newOrder });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <SearchBar
          onSearch={handleSearch}
          defaultValue={query === "all" ? "" : query}
        />

        <select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option value="latest">Latest</option>
          <option value="most-popular">Most Popular</option>
          <option value="top-rated">Top Rated</option>
          <option value="top-weekly">Top Weekly</option>
          <option value="longest">Longest</option>
        </select>
      </div>

      {error && (
        <div className="text-center text-red-400 py-16">{error}</div>
      )}

      {initialLoading && <VideoGridSkeleton count={12} />}

      {!initialLoading && !error && (
        <>
          <VideoGrid videos={videos} />

          <div ref={loadMoreRef} className="py-12">
            {loading && hasMore && <VideoGridSkeleton count={4} />}
            {!hasMore && videos.length > 0 && (
              <p className="text-center text-zinc-500 text-sm">
                You've reached the end
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}