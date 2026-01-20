"use client";

import Image from "next/image";
import Link from "next/link";

interface FeaturedNewsProps {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug?: string;
}

export default function FeaturedNews({
  id,
  title,
  description,
  date,
  category,
  image,
  slug,
}: FeaturedNewsProps) {
  const href = slug ? `/news/${slug}` : `/news/${id}`;

  return (
    <article className="bg-white">
      <Link href={href} className="block">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Content */}
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-medium text-[#192B28] leading-tight mb-6">
              {title}
            </h2>
            <p className="text-[#192B28] text-lg leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{date}</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#5A7363] font-medium">{category}</span>
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-full lg:w-96">
            <div className="relative h-64 lg:h-80 overflow-hidden rounded-[4px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
