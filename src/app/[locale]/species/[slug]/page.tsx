import DetailHero from "@/components/ui/DetailHero";
import SpeciesFacts from "@/components/species/SpeciesFacts";
import SpeciesGallery from "@/components/species/SpeciesGallery";
import SpeciesInfoCard from "@/components/species/SpeciesInfoCard";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import ShortTrips from "@/components/home/ShortTrips";
import { getTranslations } from "next-intl/server";
import { type ShortTrip } from "@/components/home/ShortTrips";
interface SpeciesDetail {
  name: string;
  category: string;
  heroImage: string;
  description: string[];
  factsTitle: string;
  facts: string[];
  gallery: { src: string; alt: string; caption?: string }[];
  moreGallery?: { src: string; alt: string; caption?: string };
  infoCard: {
    conservationStatus: string[];
    citesStatus: string;
    classification: { label: string; value: string }[];
    binomialName: string;
    rangeMapImage?: { src: string; alt: string };
    thumbnail?: { src: string; alt: string };
  };
  seeMoreLink?: { href: string; label: string };
}

const speciesDetails: Record<string, SpeciesDetail> = {
  "red-shanked-douc-langur": {
    name: "Red-shanked douc langur",
    category: "PRIMATE",
    heroImage: "/short-trip/image1.jpg",
    description: [
      'The Red-shanked douc langur often nicknamed the "Queen of Primates" or the "costumed ape" because it is considered one of the most colorful primates in the world.',
      "The red-shanked douc (Pygathrix nemaeus) is an arboreal and diurnal Old World monkey belonging to the Colobinae subfamily. They are endemic to Laos, Vietnam, and Cambodia. They are known for their bright colors and exhibit sexual dimorphism through their body size. The species has been declared critically endangered by the International Union for Conservation of Nature, with the main threats being: hunting, habitat loss and pet trade. They are one of three species in the genus Pygathrix, the other two being the black-shanked (P. nigripes) and gray-shanked (P. cinerea) doucs.",
    ],
    factsTitle: "Red-shanked douc langur facts",
    facts: [
      "<strong>Vibrant Appearance:</strong> It has a strikingly colorful appearance, featuring a yellow-orange face, long white whiskers, a chestnut-colored collar, black hands and feet, and its signature maroon-red lower legs (shanks). Its eyelids are a light blue color.",
      '<strong>Arboreal Acrobat:</strong> They are highly agile and spend most of their time in the forest canopy. They are considered "aerial specialists" and can make impressive, breathtaking leaps of up to 6 meters (20 feet) between trees.',
      "<strong>Critically Endangered:</strong> The species is classified as <strong>Critically Endangered</strong> by the International Union for Conservation of Nature (IUCN). It is also highly protected under Vietnamese law.",
      "<strong>Vietnam's Stronghold:</strong> The Son Tra Peninsula in Da Nang, Vietnam, harbors the largest known stable population of the species, with an estimated count of over 1,300 individuals.",
      "<strong>Unique Diet Habit:</strong> While they are primarily leaf-eaters, they are occasionally observed descending to the ground to ingest soil, which is thought to be a way to supplement their mineral intake.",
      '<strong>Local Names:</strong> Local people in Vietnam sometimes call it the "seven-colored monkey" for its fur or the "soldier monkey" due to a beret-like head marking.',
    ],
    gallery: [
      {
        src: "/short-trip/image1.jpg",
        alt: "Red-shanked douc langur family in the canopy",
        caption: "Annotation",
      },
      {
        src: "/gallery/image6.jpg",
        alt: "Red-shanked douc langur looking at camera",
        caption: "Annotation",
      },
      {
        src: "/gallery/image4.jpg",
        alt: "Red-shanked douc langur perched on a branch",
        caption: "Annotation",
      },
    ],
    moreGallery: {
      src: "/short-trip/image1.jpg",
      alt: "Red-shanked douc langur on mossy tree",
      caption: "Annotation",
    },
    infoCard: {
      conservationStatus: ["Critically Endangered (IUCN 3.1)"],
      citesStatus: "CITES Appendix II",
      classification: [
        { label: "Kingdom", value: "Animalia" },
        { label: "Phylum", value: "Chordata" },
        { label: "Class", value: "Mammalia" },
        { label: "Order", value: "Primates" },
        { label: "Suborder", value: "Haplorhini" },
        { label: "Family", value: "Cercopithecidae" },
        { label: "Genus", value: "Pygathrix" },
        { label: "Species", value: "P. nemaeus" },
      ],
      binomialName: "Pygathrix nemaeus (Linnaeus, 1771)",
      rangeMapImage: {
        src: "/species/langur-map.svg",
        alt: "Stylized map showing the Red-shanked douc langur range",
      },
      thumbnail: {
        src: "/short-trip/image3.jpg",
        alt: "Red-shanked douc langur profile",
      },
    },
    seeMoreLink: {
      href: "/species",
      label: "See more photos of the Red-shanked douc langur",
    },
  },
};

const customTripsArray: ShortTrip[] = [
  {
    id: 1,
    category: "PRE-MADE TRIP",
    title: "Vietnam Primate Photography",
    description:
      "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
    image: "/short-trip/image1.jpg",
    link: "/short-trip/vietnam-primate-photography",
    bestTimeToTravel: "APR - JUN",
    tripLength: "16 DAYS",
  },
  {
    id: 2,
    category: "PRE-MADE TRIP",
    title: "Vietnam Primate Photography",
    description:
      "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
    image: "/short-trip/image2.JPG",
    link: "/short-trip/vietnam-primate-photography-2",
    bestTimeToTravel: "APR - JUN",
    tripLength: "16 DAYS",
  },
  {
    id: 3,
    category: "PRE-MADE TRIP",
    title: "Vietnam Primate Photography",
    description:
      "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
    image: "/short-trip/image3.jpg",
    link: "/short-trip/vietnam-primate-photography-3",
    bestTimeToTravel: "APR - JUN",
    tripLength: "16 DAYS",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SpeciesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const species = speciesDetails[slug];
  const t = await getTranslations("ShortTrips");

  if (!species) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-white">
      <DetailHero
        category={species.category}
        title={species.name}
        image={species.heroImage}
      />

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1fr_320px]">
            <article className="space-y-10 text-branding-green leading-relaxed">
              <div className="space-y-4 text-lg">
                {species.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <SpeciesFacts title={species.factsTitle} facts={species.facts} />

              <SpeciesGallery images={species.gallery} />

              <SpeciesFacts title={species.factsTitle} facts={species.facts} />

              {species.moreGallery && (
                <SpeciesGallery images={[species.moreGallery]} />
              )}

              {species.seeMoreLink && (
                <Link
                  href={species.seeMoreLink.href}
                  className="inline-flex items-center gap-2 text-branding-orange font-medium hover:underline underline-offset-4"
                >
                  {species.seeMoreLink.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </article>

            <div className=" h-fit">
              <SpeciesInfoCard
                conservationStatus={species.infoCard.conservationStatus}
                citesStatus={species.infoCard.citesStatus}
                classification={species.infoCard.classification}
                binomialName={species.infoCard.binomialName}
              />
            </div>
          </div>
        </div>
        <ContributeToConservation />
        <ShortTrips
          title={t("relatedShortTrip")}
          description={t("description")}
          trips={customTripsArray}
        />
        <Support />
      </div>
    </main>
  );
}
