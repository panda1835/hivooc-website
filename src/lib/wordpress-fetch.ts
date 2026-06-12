type WordPressFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

const WORDPRESS_FETCH_TIMEOUT_MS = 8_000;

export async function fetchWordPress(
  input: string | URL,
  init: WordPressFetchInit = {},
): Promise<Response | null> {
  try {
    return await fetch(input, {
      ...init,
      signal: AbortSignal.timeout(WORDPRESS_FETCH_TIMEOUT_MS),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(`WordPress request failed (${message}): ${input}`);
    return null;
  }
}
