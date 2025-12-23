import Image from "next/image";

interface SpeciesDetailHeroProps {
  category: string;
  name: string;
  image: string;
}

export default function SpeciesDetailHero({
  category,
  name,
  image,
}: SpeciesDetailHeroProps) {
  return (
    <section className="relative h-[320px] sm:h-[420px] lg:h-[520px] w-full overflow-hidden">
      <Image
        unoptimized
        src={image}
        alt={name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
      <div className=" absolute bottom-8 left-4 sm:left-8">
        <p className="text-white/80 uppercase tracking-[0.2em] text-xs font-semibold">
          {category}
        </p>
        <h1 className="text-white mt-2 leading-tight">{name}</h1>
      </div>
    </section>
  );
}
