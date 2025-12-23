import Image from "next/image";

export interface SpeciesCardData {
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
}

export default function SpeciesCard({
  name,
  categoryLabel,
  image,
}: SpeciesCardData) {
  return (
    <article className="cursor-pointer overflow-hidden rounded-[4px]  bg-white  transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3]">
        <Image
          unoptimized
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#5A7363]">
          {categoryLabel}
        </p>
        <h3 className="text-2xl font-medium text-branding-green">{name}</h3>
      </div>
    </article>
  );
}
