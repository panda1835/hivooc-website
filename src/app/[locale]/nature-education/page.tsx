import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";
import Hero from "@/components/our-story/Hero";
import { fetchWpImagesFromApiRoute, type WPMedia } from "@/lib/wordpress-media";
import {
  extractFeaturedImage,
  getTermsByTaxonomy,
  parseGeneralLocationDuration,
  type WPTerm,
} from "@/lib/wordpress-post-helpers";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

interface WPNatureEducation {
  id: number;
  slug: string;
  title?: { rendered?: string };
  acf?: {
    general?: string;
  };
  yoast_head_json?: {
    schema?: {
      "@graph"?: Array<{
        "@type"?: string | string[];
        url?: string;
        contentUrl?: string;
      }>;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

interface ProgramCardData {
  id: number;
  slug: string;
  title: string;
  type: string;
  location: string;
  duration: string;
  image: string;
}

function extractSchemaImage(post: WPNatureEducation): string | null {
  const graph = post.yoast_head_json?.schema?.["@graph"];
  if (!graph) {
    return null;
  }

  const imageNode = graph.find((node) => {
    if (Array.isArray(node["@type"])) {
      return node["@type"].includes("ImageObject");
    }
    return node["@type"] === "ImageObject";
  });

  return imageNode?.url || imageNode?.contentUrl || null;
}

function toCard(post: WPNatureEducation): ProgramCardData {
  const { location, duration } = parseGeneralLocationDuration(post.acf?.general, {
    location: "Vietnam",
    duration: "Flexible schedule",
  });
  const featuredImage = extractFeaturedImage(post);
  const schemaImage = extractSchemaImage(post);
  const destinationName = getTermsByTaxonomy(post, "destination")[0];
  const typeName =
    getTermsByTaxonomy(post, "education-type")[0] || "Nature Education";

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title?.rendered || "Nature education"),
    type: typeName,
    location: destinationName || location,
    duration,
    image: featuredImage || schemaImage || "/short-trip/image1.jpg",
  };
}

async function getNatureEducationPrograms(): Promise<ProgramCardData[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const response = await fetch(
    `${baseUrl}/wp-json/wp/v2/nature-education?per_page=100&_embed`,
    {
      // TEMP: Content initiation phase - enable fetch cache when content is stable.
      // next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch nature education programs from WordPress");
  }

  const data: WPNatureEducation[] = await response.json();
  return data.map(toCard);
}

async function getNatureEducationHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  try {
    return await fetchWpImagesFromApiRoute(
      `${baseUrl}/wp-json/wp/v2/hero-image?slug=nature-education&_embed`,
    );
  } catch {
    return [];
  }
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function NatureEducationListingPage({ params }: PageProps) {
  const { locale } = await params;
  const [programs, heroImages] = await Promise.all([
    getNatureEducationPrograms(),
    getNatureEducationHeroImages(),
  ]);
  const fallbackHeroImages = programs.slice(0, 3).map((program) => program.image);
  const carouselHeroImages =
    heroImages.length > 0
      ? heroImages
      : fallbackHeroImages.length > 0
        ? fallbackHeroImages
        : ["/hero/image1.jpg"];
  const isVietnamese = locale === "vi";

  return (
    <main className="w-full bg-[#FFFFFF]">
      <Hero
        title={
          isVietnamese
            ? "Chương trình giáo dục thiên nhiên"
            : "Nature education programs"
        }
        subtitle={
          isVietnamese
            ? "Trải nghiệm học tập ngoài trời giúp kết nối con người với thiên nhiên và hành động bảo tồn."
            : "Outdoor learning experiences that connect people with nature and inspire conservation action."
        }
        backgroundImages={carouselHeroImages}
        backgroundAlt="Nature education hero"
      />

      <section className="bg-[#F5F0E9] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#00342B] mb-4">
            {isVietnamese
              ? "Học từ thiên nhiên thông qua trải nghiệm thực tế"
              : "Learn from nature through direct experiences"}
          </h2>
          <p className="text-[#00342B] leading-relaxed">
            {isVietnamese
              ? "Các chương trình giáo dục thiên nhiên của chúng tôi kết hợp kiến thức đa dạng sinh học, kỹ năng quan sát và trải nghiệm ngoài trời an toàn cho học sinh, gia đình và nhóm quan tâm. Mỗi chương trình được thiết kế để khuyến khích ý thức bảo tồn và tình yêu thiên nhiên."
              : "Our nature education programs combine biodiversity knowledge, observation skills, and safe outdoor learning experiences for students, families, and groups. Each program is designed to build conservation awareness and a lasting connection with nature."}
          </p>
        </div>
      </section>

      <section id="program-list" className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#00342B] mb-1">
            {isVietnamese ? "Chương trình nổi bật" : "Featured programs"}
          </h2>
          <p className="text-[#00342B] mb-8">
            {isVietnamese
              ? "Khám phá các chương trình giáo dục thiên nhiên được xây dựng theo từng nhóm đối tượng và mục tiêu học tập."
              : "Explore nature education programs designed for different audiences and learning outcomes."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 bg-white border border-gray-200 rounded-sm p-6 text-branding-green/80">
                {isVietnamese
                  ? "Hiện chưa có chương trình giáo dục thiên nhiên nào."
                  : "No nature education programs are available right now."}
              </div>
            )}

            {programs.map((program) => (
              <article
                key={program.id}
                className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    unoptimized
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-wide text-branding-green/70 mb-2">
                    {program.type}
                  </p>
                  <h3 className="text-branding-green font-condensed font-medium text-[34px]/[1.15] line-clamp-2">
                    {program.title}
                  </h3>

                  <div className="mt-2 flex items-start justify-between gap-3 text-sm text-branding-green/80">
                    <div className="flex items-start gap-1 min-w-0">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="truncate">{program.location}</span>
                    </div>
                    <p className="text-xs uppercase tracking-wide text-branding-green/70 shrink-0">
                      {program.duration}
                    </p>
                  </div>

                  <Link
                    href={`/nature-education/${program.slug}`}
                    className="mt-6 h-10 border border-gray-400 rounded-sm inline-flex items-center justify-center text-sm text-branding-green hover:bg-branding-green hover:text-white transition-colors"
                  >
                    {isVietnamese ? "Khám phá" : "Explore"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
