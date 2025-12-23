interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface SpeciesGalleryProps {
  images: GalleryImage[];
}

export default function SpeciesGallery({ images }: SpeciesGalleryProps) {
  if (!images.length) return null;

  return (
    <div className="space-y-8">
      {images.map((image, index) => (
        <figure key={index} className="space-y-2">
          <div className="overflow-hidden rounded-[4px]  bg-white ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full object-cover"
            />
          </div>
          {image.caption && (
            <figcaption className="text-center text-sm text-branding-green/70">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
