import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  extractWpImageCaption,
  extractWpImageUrl,
} from "@/lib/wordpress-media";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { getTailorTourCards } from "@/lib/tailor-tour-cards";

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
  yoast_head_json?: {
    schema?: {
      "@graph"?: Array<{
        "@type"?: string | string[];
        caption?: string;
        url?: string;
        contentUrl?: string;
      }>;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  image: string;
  imageCaption?: string;
  slug: string;
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapNewsArticle(
  article: WordPressNewsResponse,
  locale: string,
): NewsArticle {
  const descriptionFromExcerpt = stripHtml(article.excerpt?.rendered || "");
  const descriptionFromContent = stripHtml(article.content.rendered);
  const description =
    descriptionFromExcerpt ||
    (descriptionFromContent.length > 200
      ? `${descriptionFromContent.substring(0, 200)}...`
      : descriptionFromContent);

  const formattedDate = new Date(article.date).toLocaleDateString(
    locale === "vi" ? "vi-VN" : "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const category = article._embedded?.["wp:term"]?.[0]?.[0]?.name || "News";
  const image = extractWpImageUrl(article) || "/news/image1.jpg";

  return {
    id: article.id.toString(),
    title: article.title.rendered,
    description,
    content: article.content.rendered,
    date: formattedDate,
    category,
    image,
    imageCaption: extractWpImageCaption(article),
    slug: article.slug,
  };
}

async function fetchNewsBySlug(
  slug: string,
  locale: string,
): Promise<NewsArticle | null> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/news?slug=${encodeURIComponent(slug)}&_embed`,
      {
        // next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news detail");
    }

    const data: WordPressNewsResponse[] = await res.json();
    const article =
      data.find((item) =>
        locale === "vi"
          ? item.link.indexOf("/vi/") !== -1
          : item.link.indexOf("/vi/") === -1,
      ) || data[0];

    if (!article) {
      return null;
    }

    return mapNewsArticle(article, locale);
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return null;
  }
}

async function fetchRelatedNews(
  currentSlug: string,
  locale: string,
): Promise<NewsArticle[]> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/news?per_page=9&_embed`, {
      // next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch related news");
    }

    const data: WordPressNewsResponse[] = await res.json();

    return data
      .filter((item) =>
        locale === "vi"
          ? item.link.indexOf("/vi/") !== -1
          : item.link.indexOf("/vi/") === -1,
      )
      .filter((item) => item.slug !== currentSlug)
      .slice(0, 3)
      .map((item) => mapNewsArticle(item, locale));
  } catch (error) {
    console.error("Error fetching related news:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await fetchNewsBySlug(slug, locale);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description.slice(0, 160),
    openGraph: {
      type: "article",
      images: article.image ? [{ url: article.image }] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/news/${slug}`,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const t = await getTranslations("News");
  const { locale, slug } = await params;
  const [article, tailorTours] = await Promise.all([
    fetchNewsBySlug(slug, locale),
    getTailorTourCards(locale, { limit: 4 }),
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = await fetchRelatedNews(slug, locale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: article.image || undefined,
    datePublished: article.date,
    publisher: {
      "@type": "Organization",
      name: "HiVOOC",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="w-full flex flex-col">
        {/* Hero Section */}
        <section className="w-full pt-8">
          {/* Title and Metadata */}
          <div className="max-w-7xl mx-auto px-6 mb-6">
            <h1 className="text-3xl md:text-[41px] font-medium text-[#192B28] leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#5A7363]">
              <span>{article.date}</span>
              <span>|</span>
              <span className="text-gray-900">{article.category}</span>
            </div>

            {/* Hero Image */}
            <div className="w-full mt-8 mb-2">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Image Caption */}
          {article.imageCaption && (
            <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-sm text-gray-600 italic mt-2">
                {article.imageCaption}
              </p>
            </div>
          )}
        </section>

        {/* Article Content */}
        <section className="w-full max-w-7xl mx-auto px-6 py-16">
          {/* Article Body */}
          <div
            className="cms-body-normal max-w-none text-[#192B28] [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:leading-relaxed [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-[#192B28] [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-[#192B28]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </section>

        {/* Related Articles Section */}
        <section className="w-full py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-branding-green leading-tight mb-4">
              {t("relatedArticles")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                  className="h-full"
                >
                  <article className="h-full bg-white rounded-[4px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 text-sm">
                        <span className="text-[#5A7363] font-medium">
                          {relatedArticle.category}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">
                          {relatedArticle.date}
                        </span>
                      </div>

                      <h3 className="text-[24px] leading-tight font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-branding-orange transition-colors">
                        {relatedArticle.title}
                      </h3>

                      <p className="text-gray-600 line-clamp-3">
                        {relatedArticle.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TailorMadeTrips tours={tailorTours} />
      </main>
    </>
  );
}
