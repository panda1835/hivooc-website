interface WordPressSchemaNode {
  "@type"?: string | string[];
  url?: string;
  contentUrl?: string;
  caption?: string;
}

interface WordPressMediaLike {
  yoast_head_json?: {
    schema?: {
      "@graph"?: WordPressSchemaNode[];
    };
  };
  acf?: {
    thumbnail?: string | { url?: string; source_url?: string };
    images?: unknown;
    [key: string]: unknown;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: {
          thumbnail?: {
            source_url?: string;
          };
        };
      };
    }>;
  };
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

function extractSingleImageUrl(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
      return value;
    }
    return null;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const sizes = record["sizes"] as Record<string, unknown> | undefined;
    const mediaDetails = record["media_details"] as Record<string, unknown> | undefined;
    const mediaSizes = mediaDetails?.["sizes"] as Record<string, unknown> | undefined;
    const metadata = record["metadata"] as Record<string, unknown> | undefined;
    const metadataFull = metadata?.["full"];

    // Prefer full-size image when WP returns a sizes map.
    const fullFromSizes = extractSingleImageUrl(sizes?.["full"]);
    if (fullFromSizes) {
      return fullFromSizes;
    }

    const fullFromMediaSizes = extractSingleImageUrl(mediaSizes?.["full"]);
    if (fullFromMediaSizes) {
      return fullFromMediaSizes;
    }

    const fullFromMetadata = extractSingleImageUrl(metadataFull);
    if (fullFromMetadata) {
      return fullFromMetadata;
    }

    const directUrlCandidates = ["url", "source_url", "contentUrl", "file_url"];
    for (const key of directUrlCandidates) {
      const directUrl = extractSingleImageUrl(record[key]);
      if (directUrl) {
        return directUrl;
      }
    }
  }

  return null;
}

function extractImagesFromAcfImagesField(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return unique(
    value
      .map((item) => extractSingleImageUrl(item))
      .filter((item): item is string => Boolean(item)),
  );
}

function getSchemaImageObject(
  item: WordPressMediaLike,
): WordPressSchemaNode | undefined {
  return item.yoast_head_json?.schema?.["@graph"]?.find((node) => {
    if (Array.isArray(node["@type"])) {
      return node["@type"].includes("ImageObject");
    }
    return node["@type"] === "ImageObject";
  });
}

export function extractWpImageUrl(item: WordPressMediaLike): string | null {
  const schemaImage = getSchemaImageObject(item);

  if (schemaImage?.url || schemaImage?.contentUrl) {
    return schemaImage.url || schemaImage.contentUrl || null;
  }

  const acfThumbnail = item.acf?.thumbnail;

  if (typeof acfThumbnail === "string" && acfThumbnail) {
    return acfThumbnail;
  }

  if (
    acfThumbnail &&
    typeof acfThumbnail === "object" &&
    (acfThumbnail.url || acfThumbnail.source_url)
  ) {
    return acfThumbnail.url || acfThumbnail.source_url || null;
  }

  return (
    item._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail
      ?.source_url ||
    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    null
  );
}

export function extractWpImageCaption(
  item: WordPressMediaLike,
): string | undefined {
  return getSchemaImageObject(item)?.caption;
}

export function extractWpImageUrls(item: WordPressMediaLike): string[] {
  const acfImages = item.acf?.images;
  const urlsFromAcfImages = extractImagesFromAcfImagesField(acfImages);
  if (urlsFromAcfImages.length > 0) {
    return urlsFromAcfImages;
  }

  const singleImage = extractWpImageUrl(item);
  return singleImage ? [singleImage] : [];
}

export async function fetchWpImageFromApiRoute(apiUrl: string): Promise<string> {
  const images = await fetchWpImagesFromApiRoute(apiUrl);
  return images[0];
}

export async function fetchWpImagesFromApiRoute(
  apiUrl: string,
): Promise<string[]> {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch images from API route: ${apiUrl}`);
  }

  const data: WordPressMediaLike[] = await res.json();
  for (const item of data) {
    const images = extractWpImageUrls(item);
    if (images.length > 0) {
      return images;
    }
  }

  throw new Error(`No images found in API response: ${apiUrl}`);
}
