import DetailHero from "@/components/ui/DetailHero";
import { notFound } from "next/navigation";
import Image from "next/image";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
interface TripReportDetail {
  title: string;
  date: string;
  heroImage: string;
  content: {
    type: "paragraph" | "image" | "heading";
    value: string;
    caption?: string;
  }[];
}

// Mock data - replace with actual data fetching
const tripReports: Record<string, TripReportDetail> = {
  "ninh-binh-nature-enthusiast": {
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    date: "JAN, 2028",
    heroImage: "/gallery/image1.jpg",
    content: [
      {
        type: "paragraph",
        value:
          "Ninh Binh, often referred to as 'Ha Long Bay on land,' offers an enchanting landscape of limestone karsts, winding rivers, and lush rice paddies. Our recent expedition to this stunning region proved to be an unforgettable journey through one of Vietnam's most spectacular natural wonders.",
      },
      {
        type: "heading",
        value: "The Journey Begins",
      },
      {
        type: "paragraph",
        value:
          "We started our adventure early in the morning, departing from Hanoi as the sun began to rise over the Red River Delta. The two-hour drive south took us through verdant countryside, where water buffalo grazed peacefully and local farmers tended to their fields.",
      },
      {
        type: "image",
        value: "/trip-report/ninh-binh-landscape.jpg",
        caption: "The stunning karst landscape of Ninh Binh",
      },
      {
        type: "heading",
        value: "Exploring Trang An",
      },
      {
        type: "paragraph",
        value:
          "Our first stop was Trang An, a UNESCO World Heritage Site known for its dramatic scenery and ancient temples. We boarded traditional sampan boats, each rowed by a local guide who navigated us through a network of caves and grottoes. The journey took us past towering limestone cliffs draped in vegetation, creating an atmosphere that felt both mystical and serene.",
      },
      {
        type: "paragraph",
        value:
          "As we glided through the water, we encountered several species of birds, including cormorants and herons. Our guide shared stories about the area's rich history, pointing out ancient temples nestled in the karsts and explaining their significance to the local communities.",
      },
    ],
  },
  "ninh-binh-nature-enthusiast-2": {
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    date: "JAN, 2028",
    heroImage: "/gallery/image3.jpg",
    content: [
      {
        type: "paragraph",
        value:
          "Ninh Binh, often referred to as 'Ha Long Bay on land,' offers an enchanting landscape of limestone karsts, winding rivers, and lush rice paddies. Our recent expedition to this stunning region proved to be an unforgettable journey through one of Vietnam's most spectacular natural wonders.",
      },
    ],
  },
  "ninh-binh-nature-enthusiast-3": {
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    date: "JAN, 2028",
    heroImage: "/gallery/image4.jpg",
    content: [
      {
        type: "paragraph",
        value:
          "Ninh Binh, often referred to as 'Ha Long Bay on land,' offers an enchanting landscape of limestone karsts, winding rivers, and lush rice paddies. Our recent expedition to this stunning region proved to be an unforgettable journey through one of Vietnam's most spectacular natural wonders.",
      },
    ],
  },
  "ninh-binh-nature-enthusiast-4": {
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    date: "JAN, 2028",
    heroImage: "/gallery/image6.jpg",
    content: [
      {
        type: "paragraph",
        value:
          "Ninh Binh, often referred to as 'Ha Long Bay on land,' offers an enchanting landscape of limestone karsts, winding rivers, and lush rice paddies. Our recent expedition to this stunning region proved to be an unforgettable journey through one of Vietnam's most spectacular natural wonders.",
      },
    ],
  },
  "ninh-binh-nature-enthusiast-5": {
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    date: "JAN, 2028",
    heroImage: "/gallery/image8.jpg",
    content: [
      {
        type: "paragraph",
        value:
          "Ninh Binh, often referred to as 'Ha Long Bay on land,' offers an enchanting landscape of limestone karsts, winding rivers, and lush rice paddies. Our recent expedition to this stunning region proved to be an unforgettable journey through one of Vietnam's most spectacular natural wonders.",
      },
    ],
  },
  "ninh-binh-nature-enthusiast-6": {
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    date: "JAN, 2028",
    heroImage: "/gallery/image13.jpg",
    content: [
      {
        type: "paragraph",
        value:
          "Ninh Binh, often referred to as 'Ha Long Bay on land,' offers an enchanting landscape of limestone karsts, winding rivers, and lush rice paddies. Our recent expedition to this stunning region proved to be an unforgettable journey through one of Vietnam's most spectacular natural wonders.",
      },
    ],
  },
};

export default async function TripReportDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const report = tripReports[slug];

  if (!report) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-white">
      <DetailHero
        category={report.date}
        title={report.title}
        image={report.heroImage}
      />

      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <article className="prose prose-lg max-w-none">
            {report.content.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={index}
                    className="text-branding-green leading-relaxed mb-6 text-lg"
                  >
                    {block.value}
                  </p>
                );
              }

              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-medium text-branding-green mt-10 mb-4"
                  >
                    {block.value}
                  </h2>
                );
              }

              if (block.type === "image") {
                return (
                  <figure key={index} className="my-8">
                    <div className="relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
                      <Image
                        unoptimized
                        src={block.value}
                        alt={block.caption || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-sm text-gray-600 mt-3 italic text-center">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return null;
            })}
          </article>
        </div>
        <div className="mt-16">
          <ContributeToConservation />
          <TailorMadeTrips />
          <Support />
        </div>
      </div>
    </main>
  );
}
