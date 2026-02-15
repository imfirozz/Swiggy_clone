const SWIGGY_IMAGE_BASE = "https://media-assets.swiggy.com/swiggy/image/upload";
const CLOUDINARY_IMAGE_BASE = "https://res.cloudinary.com/swiggy/image/upload";
const RESTAURANT_IMAGE_FALLBACK =
  "https://placehold.co/660x420/f3f4f6/6b7280?text=Image+Unavailable";

function encodeImageId(imageId) {
  return String(imageId)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export function getRestaurantImageCandidates(imageId, width = 660) {
  if (!imageId) {
    return [RESTAURANT_IMAGE_FALLBACK];
  }

  const safeImageId = encodeImageId(imageId);

  return [
    `${SWIGGY_IMAGE_BASE}/fl_lossy,f_auto,q_auto,w_${width}/${safeImageId}`,
    `${CLOUDINARY_IMAGE_BASE}/fl_lossy,f_auto,q_auto,w_${width}/${safeImageId}`,
    `${SWIGGY_IMAGE_BASE}/${safeImageId}`,
    `${CLOUDINARY_IMAGE_BASE}/${safeImageId}`,
    RESTAURANT_IMAGE_FALLBACK,
  ];
}

export function handleRestaurantImageFallback(event, imageCandidates) {
  const currentIndex = Number(event.currentTarget.dataset.fallbackIndex || 0);
  const nextIndex = currentIndex + 1;

  if (nextIndex >= imageCandidates.length) return;

  event.currentTarget.dataset.fallbackIndex = String(nextIndex);
  event.currentTarget.src = imageCandidates[nextIndex];
}
