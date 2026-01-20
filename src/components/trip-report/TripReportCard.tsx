"use client";

import Image from "next/image";
import Link from "next/link";

interface TripReportCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug?: string;
}

export default function TripReportCard({
  id,
  title,
  description,
  date,
  image,
  slug,
}: TripReportCardProps) {
  const href = slug ? `/trip-report/${slug}` : `/trip-report/${id}`;

  return (
    <article className="rounded-[4px] overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={href} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
        <div className="py-6 px-4">
          <div className="text-sm text-[#5A7363] mb-2 uppercase tracking-wide">
            {date}
          </div>
          <h3
            className="text-xl font-medium text-gray-900 mb-3 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </h3>
          <p
            className="text-[#192B28] leading-relaxed overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
}
