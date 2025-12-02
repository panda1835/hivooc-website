"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Star } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
  location: string;
}

export default function Reviews() {
  const t = useTranslations("Reviews");

  // Placeholder reviews - replace with actual Google Maps reviews
  // See implementation notes below for fetching real reviews
  const reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      text: "The wildlife experience exceeded all expectations. Our guide's knowledge was incredible, and we saw species I never dreamed I'd encounter in the wild.",
      author: "Sarah Mitchell",
      location: "United Kingdom",
    },
    {
      id: 2,
      rating: 5,
      text: "A truly personalized adventure. Every detail was tailored to our interests. The conservation focus made the experience even more meaningful.",
      author: "David Chen",
      location: "Singapore",
    },
    {
      id: 3,
      rating: 5,
      text: "Vietnam's wildlife is stunning, and this tour brought us incredibly close to nature. The ethical approach to wildlife viewing was impressive.",
      author: "Emma Larsson",
      location: "Sweden",
    },
    {
      id: 4,
      rating: 5,
      text: "The wildlife experience exceeded all expectations. Our guide's knowledge was incredible, and we saw species I never dreamed I'd encounter in the wild.",
      author: "Sarah Mitchell",
      location: "United Kingdom",
    },
    {
      id: 5,
      rating: 5,
      text: "A truly personalized adventure. Every detail was tailored to our interests. The conservation focus made the experience even more meaningful.",
      author: "David Chen",
      location: "Singapore",
    },
    {
      id: 6,
      rating: 5,
      text: "Vietnam's wildlife is stunning, and this tour brought us incredibly close to nature. The ethical approach to wildlife viewing was impressive.",
      author: "Emma Larsson",
      location: "Sweden",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-branding-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h2 className="text-branding-green leading-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-branding-green/70 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* View More Link */}
          <a
            href="https://www.google.com/maps/place/HiVOOC+-+Wildlife+Tourism+for+Conservation/@16.105849,108.252301,12z/data=!4m6!3m5!1s0x31421733205d9bed:0xa601ff592b66ca29!8m2!3d16.1058494!4d108.2523011!16s%2Fg%2F11vj5_z7p2?hl=vi&entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-branding-green hover:text-branding-green/80 transition-colors group"
          >
            <span className="font-medium">{t("viewMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="w-5 h-5 fill-branding-green text-branding-green"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-branding-green/80 italic leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Author Info */}
              <div>
                <p className="text-branding-green font-medium">
                  {review.author}
                </p>
                <p className="text-branding-green/60 text-sm">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
 * HOW TO FETCH REAL GOOGLE MAPS REVIEWS:
 * 
 * Option 1: Google Places API (Recommended)
 * ------------------------------------------
 * 1. Get a Google Cloud API key with Places API enabled
 * 2. Use the Place Details API to fetch reviews
 * 3. Create a server-side API route in Next.js:
 * 
 * // app/api/reviews/route.ts
 * export async function GET() {
 *   const placeId = 'ChIJ7Z0dMjMXQjQRKcpmsVn_AaY'; // Your place ID
 *   const apiKey = process.env.GOOGLE_PLACES_API_KEY;
 *   
 *   const response = await fetch(
 *     `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`
 *   );
 *   
 *   const data = await response.json();
 *   return Response.json(data.result.reviews);
 * }
 * 
 * 4. Fetch in your component:
 * useEffect(() => {
 *   fetch('/api/reviews')
 *     .then(res => res.json())
 *     .then(data => setReviews(data));
 * }, []);
 * 
 * Option 2: Third-party Services
 * -------------------------------
 * - Outscraper API (https://outscraper.com/)
 * - Apify Google Maps Scraper
 * - SerpApi Google Maps Reviews
 * 
 * Option 3: Manual Update
 * -----------------------
 * - Periodically copy reviews from Google Maps manually
 * - Store in a JSON file or CMS
 * - Update when new reviews come in
 * 
 * Note: Google's Terms of Service restrict automated scraping.
 * Always use official APIs or comply with their terms.
 */
