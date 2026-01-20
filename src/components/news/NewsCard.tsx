"use client";

import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug?: string;
}

export default function NewsCard({
  id,
  title,
  description,
  date,
  category,
  image,
  slug,
}: NewsCardProps) {
  const href = slug ? `/news/${slug}` : `/news/${id}`;

  return (
    <article className="bg-white overflow-hidden">
      <Link href={href} className="block">
        <div className="relative h-64 overflow-hidden rounded-t-[4px] mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
        <div className="">
          <h3
            className="text-[24px] font-medium text-[#192B28] mb-3 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </h3>
          <p
            className="text-[#192B28] leading-relaxed overflow-hidden mb-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">{date}</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#5A7363] font-medium">{category}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
