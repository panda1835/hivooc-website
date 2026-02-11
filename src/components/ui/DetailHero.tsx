import Image from "next/image";

interface DetailHeroProps {
  category: string;
  title: string;
  image: string;
}

export default function DetailHero({
  category,
  title,
  image,
}: DetailHeroProps) {
  return (
    <section className="relative h-[320px] sm:h-[420px] lg:h-[520px] w-full overflow-hidden">
      <Image
        unoptimized
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/80 uppercase tracking-[0.2em] text-[20px] font-semibold">
            {category}
          </p>
          <h1 className="text-white font-[IBM Plex Sans] text-[46px] font-bold mt-2 leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
