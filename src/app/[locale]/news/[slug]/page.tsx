"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

// Mock data for news articles - replace with actual data from your CMS/API
const mockNewsArticles = [
  {
    id: "1",
    title:
      "Major Reforestation Project Launched to Restore Native Forest Habitats",
    description:
      "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatien langur, and more.",
    content: `
      <p>In a groundbreaking initiative to combat deforestation and protect biodiversity, a comprehensive reforestation project has been launched to restore native forest habitats across critical conservation areas in Vietnam.</p>
      
      <p>The captivating landscapes attract photographers to come and capture the beauty of nature and its inhabitants. This ambitious project aims to restore over 10,000 hectares of degraded forest land, providing crucial habitat for endangered species and supporting local communities.</p>
      
      <h2>Project Objectives</h2>
      <p>The reforestation initiative focuses on planting native tree species that are essential for the survival of endemic wildlife. These include dipterocarp trees, which form the canopy of tropical rainforests and provide food and shelter for countless species.</p>
      
      <h2>Conservation Impact</h2>
      <p>This project will directly benefit numerous endangered species, including the Red-shanked douc langur, pygmy loris, and Hatien langur. By restoring their natural habitat, we aim to increase population numbers and ensure long-term survival of these remarkable primates.</p>
      
      <p>The project also incorporates community engagement programs, providing sustainable livelihood opportunities for local residents through eco-friendly employment and environmental education initiatives.</p>
      
      <h2>Monitoring and Success</h2>
      <p>Advanced monitoring systems, including camera traps and biodiversity surveys, will track the project's progress and measure its impact on wildlife populations. Early indicators show promising signs of ecosystem recovery in pilot areas.</p>
      
      <p>This reforestation project represents a significant step forward in Vietnam's conservation efforts and demonstrates the commitment to protecting our natural heritage for future generations.</p>
    `,
    date: "3 hrs ago",
    category: "Conservation",
    image: "/news/image1.jpg",
    imageCaption: "The captivating landscapes attract photographers to come.",
    slug: "major-reforestation-project-launched",
    author: "Dr. Emily Chen",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Red-shanked douc langur Conservation Success",
    description:
      "A remarkable conservation story showcasing the recovery of one of Vietnam's most endangered primates.",
    content: `
      <p>The Red-shanked douc langur (Pygathrix nemaeus) has become a symbol of conservation success in Vietnam, with populations showing encouraging recovery signs thanks to dedicated protection efforts.</p>
      
      <p>These magnificent primates, known for their striking red legs and distinctive facial features, were once on the brink of extinction due to habitat loss and hunting pressure. Today, conservation programs are making a real difference.</p>
      
      <h2>Habitat Protection</h2>
      <p>Protected areas have been expanded to cover critical douc langur habitats, ensuring these arboreal primates have sufficient forest canopy for feeding and breeding. The species requires large territories of undisturbed primary forest to thrive.</p>
      
      <p>Community-based conservation programs have been instrumental in changing local attitudes toward wildlife protection, with former hunters now serving as forest guardians and wildlife guides.</p>
    `,
    date: "1 day ago",
    category: "Species Conservation",
    image: "/news/image2.jpg",
    imageCaption: "Red-shanked douc langur in its natural habitat.",
    slug: "red-shanked-douc-langur",
    author: "Dr. Minh Nguyen",
    readTime: "4 min read",
  },
];

interface NewsDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = useParams();

  // Find the article by slug
  const article = mockNewsArticles.find((article) => article.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-8">
        {/* Title and Metadata */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-[41px] font-medium text-[#192B28] leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-[#5A7363]">
            <span>{article.date}</span>
            <span>|</span>
            <span className="text-gray-900">{article.category}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-2">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[4px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Image Caption */}
        {article.imageCaption && (
          <p className="text-center text-sm text-gray-600 italic mt-2">
            {article.imageCaption}
          </p>
        )}
      </section>

      {/* Article Content */}
      <section className="max-w-5xl px-6 py-16">
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Article Description */}
          <div className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
            {article.description}
          </div>

          {/* Article Body */}
          <div
            className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {mockNewsArticles
              .filter((relatedArticle) => relatedArticle.slug !== slug)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                >
                  <article className="bg-white rounded-[4px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 text-sm">
                        <span className="text-[#5A7363] font-medium">
                          {relatedArticle.category}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">
                          {relatedArticle.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
                        {relatedArticle.title}
                      </h3>

                      <p className="text-gray-600 line-clamp-3">
                        {relatedArticle.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
