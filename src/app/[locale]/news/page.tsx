"use client";

import Hero from "@/components/our-story/Hero";
import NewsListing from "@/components/news/NewsListing";
import { useTranslations } from "next-intl";

// Mock data for news articles - replace with actual data from your CMS/API
const mockNewsArticles = [
  {
    id: "1",
    title:
      "Major Reforestation Project Launched to Restore Native Forest Habitats",
    description:
      "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatien langur, and more.",
    date: "3 hrs ago",
    category: "Conservation",
    image: "/news/image1.jpg",
    slug: "major-reforestation-project-launched",
  },
  {
    id: "2",
    title: "Red-shanked douc langur",
    description:
      "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatien langur, and more.",
    date: "3 hrs ago",
    category: "Conservation",
    image: "/news/image2.jpg",
    slug: "red-shanked-douc-langur",
  },
  {
    id: "3",
    title: "Red-shanked douc langur",
    description:
      "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatien langur, and more.",
    date: "3 hrs ago",
    category: "Conservation",
    image: "/news/image3.jpg",
    slug: "red-shanked-douc-langur-2",
  },
  {
    id: "4",
    title: "Red-shanked douc langur",
    description:
      "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatien langur, and more.",
    date: "3 hrs ago",
    category: "Conservation",
    image: "/news/image4.png",
    slug: "red-shanked-douc-langur-3",
  },
  {
    id: "5",
    title: "Red-shanked douc langur",
    description:
      "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatien langur, and more.",
    date: "3 hrs ago",
    category: "Conservation",
    image: "/gallery/image1.jpg",
    slug: "red-shanked-douc-langur-4",
  },
  {
    id: "6",
    title: "Red-shanked douc langur",
    description:
      "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatien langur, and more.",
    date: "3 hrs ago",
    category: "Conservation",
    image: "/gallery/image3.jpg",
    slug: "red-shanked-douc-langur-5",
  },
];

export default function NewsPage() {
  const t = useTranslations("News.Hero");

  return (
    <main className="w-full">
      <Hero
        title={t("title")}
        subtitle={t("description")}
        backgroundImage="/hero/image2.jpg"
        backgroundAlt="HiVOOC News Background"
      />
      <NewsListing articles={mockNewsArticles} />
    </main>
  );
}
