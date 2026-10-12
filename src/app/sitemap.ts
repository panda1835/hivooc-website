import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const LOCALES = ["en", "vi"] as const;
const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

type Locale = (typeof LOCALES)[number];

type WordPressPostSummary = {
  slug: string;
  link: string;
  modified_gmt?: string;
};

type LocalizedPost = WordPressPostSummary & {
  locale: Locale;
};

type DynamicRouteConfig = {
  postType: string;
  pathPrefix: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "tailor-trip", priority: 0.9, changeFrequency: "weekly" },
  { path: "short-trip", priority: 0.9, changeFrequency: "weekly" },
  {
    path: "conservation-programs",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  { path: "nature-education", priority: 0.8, changeFrequency: "weekly" },
  { path: "species", priority: 0.8, changeFrequency: "weekly" },
  { path: "destinations", priority: 0.8, changeFrequency: "weekly" },
  { path: "news", priority: 0.7, changeFrequency: "daily" },
  { path: "trip-report", priority: 0.7, changeFrequency: "weekly" },
  { path: "about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { path: "tour-guidelines", priority: 0.4, changeFrequency: "yearly" },
] as const;

const DYNAMIC_ROUTES: DynamicRouteConfig[] = [
  {
    postType: "short-tour",
    pathPrefix: "short-trip",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    postType: "tailor-made-tour",
    pathPrefix: "tailor-trip",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    postType: "news",
    pathPrefix: "news",
    priority: 0.7,
    changeFrequency: "daily",
  },
  {
    postType: "key-species",
    pathPrefix: "species",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    postType: "destinations",
    pathPrefix: "destinations",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    postType: "conservation-program",
    pathPrefix: "conservation-programs",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    postType: "nature-education",
    pathPrefix: "nature-education",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    postType: "trip-report",
    pathPrefix: "trip-report",
    priority: 0.6,
    changeFrequency: "weekly",
  },
];

function getPostLocale(link: string): Locale | null {
  try {
    const firstSegment = new URL(link).pathname.split("/").filter(Boolean)[0];
    return firstSegment === "vi" ? "vi" : "en";
  } catch {
    return null;
  }
}

async function fetchPosts(postType: string): Promise<LocalizedPost[]> {
  if (!WORDPRESS_BASE_URL) return [];

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const posts: LocalizedPost[] = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const params = new URLSearchParams({
        per_page: "100",
        page: String(page),
        _fields: "slug,link,modified_gmt",
      });
      const response = await fetch(
        `${baseUrl}/wp-json/wp/v2/${postType}?${params.toString()}`,
        { next: { revalidate: 3600, tags: ["wordpress", "sitemap"] } },
      );

      if (!response.ok) return posts;

      const data: WordPressPostSummary[] = await response.json();
      for (const post of data) {
        const locale = getPostLocale(post.link);
        if (locale) posts.push({ ...post, locale });
      }

      totalPages = Number(response.headers.get("X-WP-TotalPages") || "1");
      page += 1;
    } while (page <= totalPages);
  } catch {
    return posts;
  }

  return posts;
}

function translationKey(slug: string): string {
  return slug.replace(/-(en|vi)$/i, "");
}

function buildLanguageAlternates(
  posts: LocalizedPost[],
  pathPrefix: string,
): Map<string, Record<string, string>> {
  const groups = new Map<string, Partial<Record<Locale, LocalizedPost>>>();

  for (const post of posts) {
    const key = translationKey(post.slug);
    const group = groups.get(key) ?? {};
    group[post.locale] = post;
    groups.set(key, group);
  }

  const alternatesBySlug = new Map<string, Record<string, string>>();
  for (const group of groups.values()) {
    if (!group.en || !group.vi) continue;

    const languages = {
      en: `${SITE_URL}/en/${pathPrefix}/${group.en.slug}`,
      vi: `${SITE_URL}/vi/${pathPrefix}/${group.vi.slug}`,
      "x-default": `${SITE_URL}/en/${pathPrefix}/${group.en.slug}`,
    };
    alternatesBySlug.set(group.en.slug, languages);
    alternatesBySlug.set(group.vi.slug, languages);
  }

  return alternatesBySlug;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) => {
    const suffix = route.path ? `/${route.path}` : "/";
    const languages = {
      en: `${SITE_URL}/en${suffix}`,
      vi: `${SITE_URL}/vi${suffix}`,
      "x-default": `${SITE_URL}/en${suffix}`,
    };

    return LOCALES.map((locale) => ({
      url: languages[locale],
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });

  const postGroups = await Promise.all(
    DYNAMIC_ROUTES.map(async (config) => ({
      config,
      posts: await fetchPosts(config.postType),
    })),
  );

  const dynamicRoutes: MetadataRoute.Sitemap = postGroups.flatMap(
    ({ config, posts }) => {
      const alternatesBySlug = buildLanguageAlternates(
        posts,
        config.pathPrefix,
      );

      return posts.map((post) => {
        const languages = alternatesBySlug.get(post.slug);
        return {
          url: `${SITE_URL}/${post.locale}/${config.pathPrefix}/${post.slug}`,
          lastModified: post.modified_gmt
            ? new Date(`${post.modified_gmt}Z`)
            : undefined,
          changeFrequency: config.changeFrequency,
          priority: config.priority,
          ...(languages ? { alternates: { languages } } : {}),
        };
      });
    },
  );

  return [...staticRoutes, ...dynamicRoutes];
}
