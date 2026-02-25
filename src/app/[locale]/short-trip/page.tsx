import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin, Search } from "lucide-react";
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

interface WPTour {
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

interface ShortTripCardData {
  id: number;
  slug: string;
  title: string;
  type: string;
  location: string;
  duration: string;
  image: string;
}

function extractSchemaImage(post: WPTour): string | null {
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

function toCard(post: WPTour): ShortTripCardData {
  const { location, duration } = parseGeneralLocationDuration(post.acf?.general, {
    location: "Vietnam",
    duration: "Flexible duration",
  });
  const featuredImage = extractFeaturedImage(post);
  const schemaImage = extractSchemaImage(post);
  const destinationName = getTermsByTaxonomy(post, "destination")[0];
  const typeName = getTermsByTaxonomy(post, "tour-type")[0] || "Short Trip";

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title?.rendered || "Short trip"),
    type: typeName,
    location: destinationName || location,
    duration,
    image: featuredImage || schemaImage || "/short-trip/image1.jpg",
  };
}

async function getShortTrips(): Promise<ShortTripCardData[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const response = await fetch(
    `${baseUrl}/wp-json/wp/v2/short-tour?per_page=100&_embed`,
    {
      // TEMP: Content initiation phase - enable fetch cache when content is stable.
      // next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch short trips from WordPress");
  }

  const data: WPTour[] = await response.json();
  return data.map(toCard);
}

async function getShortTripHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  try {
    return await fetchWpImagesFromApiRoute(
      `${baseUrl}/wp-json/wp/v2/hero-image?slug=short-trip&_embed`,
    );
  } catch {
    return [];
  }
}

export default async function ShortTripListingPage() {
  const [trips, heroImages] = await Promise.all([
    getShortTrips(),
    getShortTripHeroImages(),
  ]);
  const fallbackHeroImages = trips.slice(0, 3).map((trip) => trip.image);
  const carouselHeroImages =
    heroImages.length > 0
      ? heroImages
      : fallbackHeroImages.length > 0
        ? fallbackHeroImages
        : ["/hero/image1.jpg"];
  const typeFilters = Array.from(
    new Set(trips.map((trip) => trip.type)),
  ).sort();
  const destinationFilters = Array.from(
    new Set(trips.map((trip) => trip.location)),
  ).sort();

  return (
    <main className="w-full bg-[#FFFFFF]">
      <Hero
        title="Short trip experience like no other"
        subtitle="Every short trip is designed to immerse you in nature, wildlife, and meaningful local conservation stories."
        backgroundImages={carouselHeroImages}
        backgroundAlt="Short trip hero"
      />

      <section className="bg-[#F5F0E9] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#00342B] mb-4">
            Your date. Your destination. Our planning and Expertise.
          </h2>
          <p className="text-[#00342B] leading-relaxed">
            We create personalized travel itineraries with destinations, routes,
            and schedules designed especially for you. Leave all the travel
            planning and execution to our team. Whether you have your own
            aircraft, are interested in a private charter, or choose to fly
            commercial, we will make all air and ground arrangements in your
            preferred style so you can enjoy every moment.
          </p>
        </div>
      </section>

      <section id="trip-list" className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#00342B] mb-1">Short Trips adventure</h2>
          <p className="text-[#00342B] mb-8">
            Every journey is crafted to match your interests, pace, and wildlife
            dreams. No two experiences are the same.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-8 items-start">
            <aside className="bg-[#F8F8F8] border border-[#EBEBEB] rounded-md p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Tour"
                  className="w-full h-10 border border-gray-300 rounded-sm pl-9 pr-3 text-sm bg-white"
                />
              </div>

              <div className="mt-4  text-sm text-branding-green font-medium">
                Filter by
              </div>

              {/* Divider */}
              <div className="mt-4 border-t border-[#EFEFEF]" />

              <div className="mt-4 space-y-5 text-sm text-branding-green/90">
                <div>
                  <p className="font-medium mb-2">Type</p>
                  {typeFilters.length === 0 && (
                    <p className="text-xs text-branding-green/70">
                      No types available
                    </p>
                  )}
                  {typeFilters.map((typeName) => (
                    <label
                      key={typeName}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input type="checkbox" className="h-4 w-4" />
                      <span>{typeName}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <p className="font-medium mb-2">Destination</p>
                  {destinationFilters.length === 0 && (
                    <p className="text-xs text-branding-green/70">
                      No destinations available
                    </p>
                  )}
                  {destinationFilters.map((destinationName) => (
                    <label
                      key={destinationName}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input type="checkbox" className="h-4 w-4" />
                      <span>{destinationName}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {trips.length === 0 && (
                <div className="md:col-span-2 bg-white border border-gray-200 rounded-sm p-6 text-branding-green/80">
                  No short trips are available right now.
                </div>
              )}

              {trips.map((trip) => (
                <article
                  key={trip.id}
                  className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      unoptimized
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-branding-green font-condensed font-medium text-[34px]/[1.15] line-clamp-2">
                      {trip.title}
                    </h3>

                    <div className="mt-2 flex items-start justify-between gap-3 text-sm text-branding-green/80">
                      <div className="flex items-start gap-1 min-w-0">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="truncate">{trip.location}</span>
                      </div>
                      <p className="text-xs uppercase tracking-wide text-branding-green/70 shrink-0">
                        {trip.duration}
                      </p>
                    </div>

                    <Link
                      href={`/short-trip/${trip.slug}`}
                      className="mt-6 h-10 border border-gray-400 rounded-sm inline-flex items-center justify-center text-sm text-branding-green hover:bg-branding-green hover:text-white transition-colors"
                    >
                      Explore
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
