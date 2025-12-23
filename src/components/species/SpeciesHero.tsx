import Image from "next/image";

interface SpeciesHeroProps {
  title: string;
  subtitle: string;
  collageImages: string[];
}

export default function SpeciesHero({
  title,
  subtitle,
  collageImages,
}: SpeciesHeroProps) {
  return (
    <section className="relative w-full h-[340px] md:h-[calc(100vh-64px)] overflow-hidden">
      <div className="grid h-full grid-cols-2 sm:grid-cols-3 grid-rows-2">
        {collageImages.map((image, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              unoptimized
              src={image}
              alt={`Wildlife collage image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-7xl text-center text-white">
          <h1 className="text-white drop-shadow-md">{title}</h1>
          <p className="max-w-6xl mt-4 text-lg md:text-xl text-white/90 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
