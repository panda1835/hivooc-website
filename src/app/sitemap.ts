import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const BASE_URL = SITE_URL;
const LOCALES = ["en", "vi"] as const;
const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

async function fetchSlugs(postType: string): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) return [];
  try {
    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/${postType}?per_page=100&_fields=slug`,
      { next: { revalidate: 3600, tags: ["wordpress", "sitemap"] } },
    );
    if (!res.ok) return [];
    const data: { slug: string }[] = await res.json();
    return data.map((item) => item.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Fetch all dynamic slugs in parallel
  const [
    shortTripSlugs,
    tailorTourSlugs,
    newsSlugs,
    speciesSlugs,
    destinationSlugs,
    conservationSlugs,
    natureEducationSlugs,
    tripReportSlugs,
  ] = await Promise.all([
    fetchSlugs("short-tour"),
    fetchSlugs("tailor-made-tour"),
    fetchSlugs("news"),
    fetchSlugs("key-species"),
    fetchSlugs("destinations"),
    fetchSlugs("conservation-program"),
    fetchSlugs("nature-education"),
    fetchSlugs("trip-report"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/vi/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/en/tailor-trip`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vi/tailor-trip`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/en/short-trip`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vi/short-trip`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/en/conservation-programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vi/conservation-programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/nature-education`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vi/nature-education`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/species`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vi/species`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/destination`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vi/destination`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/vi/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/trip-report`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/vi/trip-report`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/our-story`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/vi/our-story`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/en/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/vi/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/en/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/vi/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/en/tour-guidelines`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/vi/tour-guidelines`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  function buildDynamicEntries(
    slugs: string[],
    pathPrefix: string,
    priority = 0.7,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
  ): MetadataRoute.Sitemap {
    return slugs.flatMap((slug) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}/${locale}/${pathPrefix}/${slug}`,
        lastModified: now,
        changeFrequency,
        priority,
      })),
    );
  }

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...buildDynamicEntries(shortTripSlugs, "short-trip", 0.8),
    ...buildDynamicEntries(tailorTourSlugs, "tailor-trip", 0.8),
    ...buildDynamicEntries(newsSlugs, "news", 0.7, "daily"),
    ...buildDynamicEntries(speciesSlugs, "species", 0.7),
    ...buildDynamicEntries(destinationSlugs, "destination", 0.7),
    ...buildDynamicEntries(conservationSlugs, "conservation-programs", 0.7),
    ...buildDynamicEntries(natureEducationSlugs, "nature-education", 0.7),
    ...buildDynamicEntries(tripReportSlugs, "trip-report", 0.6),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
