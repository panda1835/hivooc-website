import Hero from "@/components/our-story/Hero";
import NewsListing from "@/components/news/NewsListing";
import { getTranslations, getLocale } from "next-intl/server";

interface WordPressTerm {
  name: string;
}

interface WordPressFeaturedMedia {
  source_url?: string;
}

interface WordPressNewsResponse {
  id: number;
  slug: string;
  link: string;
  date: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug?: string;
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function getNewsArticles(): Promise<NewsArticle[]> {
  const locale = await getLocale();

  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/news?per_page=20&_embed`, {
      // next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data: WordPressNewsResponse[] = await res.json();

    const filtered = data.filter((article) =>
      locale === "vi"
        ? article.link.indexOf("/vi/") !== -1
        : article.link.indexOf("/vi/") === -1,
    );

    return filtered.map((article) => {
      const descriptionFromExcerpt = stripHtml(article.excerpt?.rendered || "");
      const descriptionFromContent = stripHtml(article.content.rendered);
      const description =
        descriptionFromExcerpt ||
        (descriptionFromContent.length > 200
          ? `${descriptionFromContent.substring(0, 200)}...`
          : descriptionFromContent);

      const date = new Date(article.date).toLocaleDateString(
        locale === "vi" ? "vi-VN" : "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      );

      return {
        id: article.id.toString(),
        title: article.title.rendered,
        description,
        date,
        category: article._embedded?.["wp:term"]?.[0]?.[0]?.name || "News",
        image:
          article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "/news/image1.jpg",
        slug: article.slug,
      };
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function NewsPage() {
  const t = await getTranslations("News.Hero");
  const newsArticles = await getNewsArticles();

  return (
    <main className="w-full">
      <Hero
        title={t("title")}
        subtitle={t("description")}
        backgroundImage="/hero/image2.jpg"
        backgroundAlt="HiVOOC News Background"
      />
      <NewsListing articles={newsArticles} />
    </main>
  );
}
