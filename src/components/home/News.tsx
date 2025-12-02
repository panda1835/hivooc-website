"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NewsArticle {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function News() {
  const t = useTranslations("News");

  // Sample news articles - replace with actual data from CMS or API
  const articles: NewsArticle[] = [
    {
      id: 1,
      category: "CUSTOM EXPERIENCE",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/news/image1.jpg",
      link: "/news/vietnam-primate-photography-1",
    },
    {
      id: 2,
      category: "CUSTOM EXPERIENCE",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/news/image2.jpg",
      link: "/news/vietnam-primate-photography-2",
    },
    {
      id: 3,
      category: "CUSTOM EXPERIENCE",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/news/image3.jpg",
      link: "/news/vietnam-primate-photography-3",
    },
    {
      id: 4,
      category: "CUSTOM EXPERIENCE",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/news/image4.png",
      link: "/news/vietnam-primate-photography-4",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h2 className="text-branding-green leading-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-branding-green/70 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* View More Link */}
          <a
            href="/news"
            className="inline-flex items-center gap-2 text-branding-green hover:text-branding-green/80 transition-colors group"
          >
            <span className="font-medium">{t("viewMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* News Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col sm:flex-row gap-4 bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Article Image */}
              <div className="relative w-full sm:w-64 aspect-[4/3] sm:aspect-square bg-branding-green/10 overflow-hidden flex-shrink-0">
                {/* Placeholder gradient - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />

                {/* Uncomment when you have real images */}
                <Image
                  unoptimized
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Article Content */}
              <div className="flex flex-col flex-grow p-4 sm:p-0 sm:py-4 sm:pr-4">
                {/* Category Tag */}
                <p className="text-xs font-medium text-branding-green/60 uppercase tracking-wider mb-3">
                  {article.category}
                </p>

                {/* Title */}
                <h3 className="text-branding-green mb-3 line-clamp-2">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-branding-green/70 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {article.description}
                </p>

                {/* Explore Button */}
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href={article.link}>
                    {t("explore")}
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
