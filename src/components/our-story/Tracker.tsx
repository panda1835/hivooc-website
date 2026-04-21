"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface LangurTracker {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
}

interface TrackerProps {
  trackers?: LangurTracker[];
}

const PAGE_SIZE = 6;

const Tracker = ({ trackers = [] }: TrackerProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(trackers.length / PAGE_SIZE);
  const paginatedTrackers = trackers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <section className=" bg-[#F5F0E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <h2 className="text-[32px] font-medium mr-4">
            HiVOOC Langur Tracker
          </h2>
          <div className="flex-1 border-t border-[#2F3F3B]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {paginatedTrackers.length === 0 && (
            <div className="md:col-span-3 border border-[#2F3F3B]/20 rounded-[4px] p-6 text-[#00342B]">
              No langur trackers are available right now.
            </div>
          )}

          {paginatedTrackers.map((tracker) => (
            <div key={tracker.id} className=" overflow-hidden flex flex-col h-full">
              <div className="w-full h-48 relative overflow-hidden rounded-[4px]">
                <Image
                  unoptimized
                  src={tracker.image}
                  alt={tracker.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="py-5 flex flex-col flex-1">
                <h3 className="text-[26px] text-[#00342B] font-medium mb-1">
                  {tracker.name}
                </h3>
                <div className="text-[16px] text-[#5A7363] mb-2 font-semibold uppercase tracking-wide">
                  {tracker.title}
                </div>
                <p className=" text-[#00342B] flex-1">{tracker.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded ${page === i + 1 ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 bg-white"}`}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tracker;
