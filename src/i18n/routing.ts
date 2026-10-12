import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",

  // Page metadata and the sitemap provide only verified translation pairs.
  // Automatic links would incorrectly pair CMS slugs that exist in one locale.
  alternateLinks: false,
});
