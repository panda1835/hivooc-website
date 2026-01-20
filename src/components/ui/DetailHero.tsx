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
      <div className=" absolute bottom-8 left-4 sm:left-8">
        <p className="text-white/80 uppercase tracking-[0.2em] text-xs font-semibold">
          {category}
        </p>
        <h1 className="text-white mt-2 leading-tight">{title}</h1>
      </div>
    </section>
  );
}
