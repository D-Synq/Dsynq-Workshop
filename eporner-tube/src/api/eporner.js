const BASE = "https://www.eporner.com/api/v2/video";

export async function searchVideos({
  query = "all",
  page = 1,
  perPage = 24,
  order = "latest",
  thumbsize = "big",
} = {}) {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
    per_page: perPage.toString(),
    order,
    thumbsize,
    format: "json",
  });

  const res = await fetch(`${BASE}/search/?${params}`);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}

export async function getVideoById(id, thumbsize = "big") {
  const params = new URLSearchParams({
    id,
    thumbsize,
    format: "json",
  });

  const res = await fetch(`${BASE}/id/?${params}`);
  if (!res.ok) throw new Error("Video not found");
  return res.json();
}