import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin, Search } from "lucide-react";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

interface WPTerm {
  name?: string;
  taxonomy?: string;
}

interface WPMediaSize {
  source_url?: string;
}

interface WPMedia {
  source_url?: string;
  media_details?: {
    sizes?: {
      full?: WPMediaSize;
      large?: WPMediaSize;
      medium_large?: WPMediaSize;
      medium?: WPMediaSize;
      thumbnail?: WPMediaSize;
    };
  };
}

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

function getTermsByTaxonomy(post: WPTour, taxonomy: string): string[] {
  const groups = post._embedded?.["wp:term"] || [];
  return groups
    .flat()
    .filter((term) => term.taxonomy === taxonomy && Boolean(term.name))
    .map((term) => term.name as string);
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

function extractFeaturedMedia(post: WPTour): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) {
    return null;
  }

  const sizes = media.media_details?.sizes;
  return (
    sizes?.large?.source_url ||
    sizes?.medium_large?.source_url ||
    sizes?.medium?.source_url ||
    sizes?.thumbnail?.source_url ||
    sizes?.full?.source_url ||
    media.source_url ||
    null
  );
}

function parseGeneralField(general?: string): {
  location: string;
  duration: string;
} {
  const fallback = {
    location: "Vietnam",
    duration: "Flexible duration",
  };

  if (!general) {
    return fallback;
  }

  const normalizedLines = general
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const locationLine = normalizedLines.find((line) =>
    line.toLowerCase().startsWith("location:"),
  );
  const durationLine = normalizedLines.find((line) =>
    line.toLowerCase().startsWith("duration:"),
  );

  return {
    location:
      locationLine?.split(":").slice(1).join(":").trim() || fallback.location,
    duration:
      durationLine?.split(":").slice(1).join(":").trim() || fallback.duration,
  };
}

function toCard(post: WPTour): ShortTripCardData {
  const { location, duration } = parseGeneralField(post.acf?.general);
  const featuredImage = extractFeaturedMedia(post);
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
    `${baseUrl}/wp-json/wp/v2/hivooc-tour?per_page=100&_embed`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch short trips from WordPress");
  }

  const data: WPTour[] = await response.json();
  return data.map(toCard);
}

export default async function ShortTripListingPage() {
  const trips = await getShortTrips();
  const heroImage = trips[0]?.image || "/hero/image1.jpg";
  const typeFilters = Array.from(
    new Set(trips.map((trip) => trip.type)),
  ).sort();
  const destinationFilters = Array.from(
    new Set(trips.map((trip) => trip.location)),
  ).sort();

  return (
    <main className="w-full bg-[#FFFFFF]">
      <section className="relative h-[460px] md:h-[560px] overflow-hidden">
        <Image
          unoptimized
          src={heroImage}
          alt="Short trip hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white text-4xl md:text-6xl font-medium">
              Short trip experience like no other
            </h1>
          </div>
        </div>
      </section>

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
