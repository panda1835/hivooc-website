import SpeciesContent from "@/components/species/SpeciesContent";
import SpeciesHero from "@/components/species/SpeciesHero";
import SpeciesIntro from "@/components/species/SpeciesIntro";
import { type SpeciesCardData } from "@/components/species/SpeciesCard";
import { getTranslations } from "next-intl/server";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import ShortTrips from "@/components/home/ShortTrips";
import { type ShortTrip } from "@/components/home/ShortTrips";

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

export default async function SpeciesPage() {
  const t = await getTranslations("SpeciesPage");
  const shortTripT = await getTranslations("ShortTrips");
  const collageImages = [
    "/gallery/image1.jpg",
    "/gallery/image3.jpg",
    "/gallery/image4.jpg",
    "/gallery/image6.jpg",
    "/gallery/image7.JPG",
    "/gallery/image8.jpg",
  ];

  const filterOptions = [
    { value: "primates", label: t("categories.primates") },
    { value: "birds", label: t("categories.birds") },
    { value: "lizards", label: t("categories.lizards") },
    { value: "frogs", label: t("categories.frogs") },
    { value: "snakes", label: t("categories.snakes") },
    { value: "butterflies", label: t("categories.butterflies") },
    { value: "dragonflies", label: t("categories.dragonflies") },
    { value: "otherInsects", label: t("categories.otherInsects") },
    { value: "fungus", label: t("categories.fungus") },
  ];

  const categoryLabelByKey = Object.fromEntries(
    filterOptions.map((option) => [option.value, option.label])
  ) as Record<string, string>;

  const speciesList: SpeciesCardData[] = [
    {
      id: 1,
      name: "Red-shanked douc langur",
      category: "primates",
      categoryLabel: categoryLabelByKey.primates,
      image: "/short-trip/image1.jpg",
    },
    {
      id: 2,
      name: "Grey-shanked douc langur",
      category: "primates",
      categoryLabel: categoryLabelByKey.primates,
      image: "/short-trip/image3.jpg",
    },
    {
      id: 3,
      name: "Mekong wagtail",
      category: "birds",
      categoryLabel: categoryLabelByKey.birds,
      image: "/gallery/image2.png",
    },
    {
      id: 4,
      name: "Great hornbill",
      category: "birds",
      categoryLabel: categoryLabelByKey.birds,
      image: "/gallery/image4.jpg",
    },
    {
      id: 5,
      name: "Forest dragon",
      category: "lizards",
      categoryLabel: categoryLabelByKey.lizards,
      image: "/gallery/image6.jpg",
    },
    {
      id: 6,
      name: "Mossy frog",
      category: "frogs",
      categoryLabel: categoryLabelByKey.frogs,
      image: "/gallery/image5.JPG",
    },
    {
      id: 7,
      name: "Bamboo pit viper",
      category: "snakes",
      categoryLabel: categoryLabelByKey.snakes,
      image: "/gallery/image7.JPG",
    },
    {
      id: 8,
      name: "Glasswing butterfly",
      category: "butterflies",
      categoryLabel: categoryLabelByKey.butterflies,
      image: "/gallery/image8.jpg",
    },
    {
      id: 9,
      name: "Scarlet skimmer",
      category: "dragonflies",
      categoryLabel: categoryLabelByKey.dragonflies,
      image: "/gallery/image9.JPG",
    },
    {
      id: 10,
      name: "Jungle longhorn beetle",
      category: "otherInsects",
      categoryLabel: categoryLabelByKey.otherInsects,
      image: "/gallery/image10.png",
    },
    {
      id: 11,
      name: "Bracket fungus",
      category: "fungus",
      categoryLabel: categoryLabelByKey.fungus,
      image: "/gallery/image11.png",
    },
    {
      id: 12,
      name: "Crested gibbon",
      category: "primates",
      categoryLabel: categoryLabelByKey.primates,
      image: "/gallery/image12.png",
    },
  ];

  return (
    <main className="flex flex-col w-full bg-white">
      <SpeciesHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        collageImages={collageImages}
      />

      <SpeciesIntro
        title={t("introTitle")}
        description={t("introDescription")}
      />

      <SpeciesContent
        species={speciesList}
        filterOptions={filterOptions}
        filterTitle={t("filterTitle")}
        filterSubtitle={t("filterSubtitle")}
        emptyStateText={t("emptyState")}
      />

      <ContributeToConservation />
      <ShortTrips
        title={shortTripT("relatedShortTrip")}
        description={shortTripT("description")}
        trips={customTripsArray}
      />
      <Support />
    </main>
  );
}
