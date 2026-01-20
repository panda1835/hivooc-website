"use client";

import NewsCard from "./NewsCard";
import FeaturedNews from "./FeaturedNews";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug?: string;
}

interface NewsListingProps {
  articles: NewsArticle[];
}

export default function NewsListing({ articles }: NewsListingProps) {
  const [featuredArticle, ...otherArticles] = articles;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <FeaturedNews
              id={featuredArticle.id}
              title={featuredArticle.title}
              description={featuredArticle.description}
              date={featuredArticle.date}
              category={featuredArticle.category}
              image={featuredArticle.image}
              slug={featuredArticle.slug}
            />
          </div>
        )}

        {/* Other Articles Grid */}
        {otherArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {otherArticles.map((article) => (
              <NewsCard
                key={article.id}
                id={article.id}
                title={article.title}
                description={article.description}
                date={article.date}
                category={article.category}
                image={article.image}
                slug={article.slug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
