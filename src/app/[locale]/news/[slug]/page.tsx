import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { extractWpImageCaption, extractWpImageUrl } from "@/lib/wordpress-media";
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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [article, tailorTours] = await Promise.all([
    fetchNewsBySlug(slug, locale),
    getTailorTourCards(locale, { limit: 4 }),
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = await fetchRelatedNews(slug, locale);

  return (
    <main className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        {/* Title and Metadata */}
        <div className="w-full mb-6">
          <h1 className="text-3xl md:text-[41px] font-medium text-[#192B28] leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-[#5A7363]">
            <span>{article.date}</span>
            <span>|</span>
            <span className="text-gray-900">{article.category}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-2">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[4px]">
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

        {/* Image Caption */}
        {article.imageCaption && (
          <p className="text-center text-sm text-gray-600 italic mt-2">
            {article.imageCaption}
          </p>
        )}
      </section>

      {/* Article Content */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Article Body */}
          <div
            className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Articles
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

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
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
  );
}
