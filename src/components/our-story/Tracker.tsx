import React, { useState } from "react";
import Image from "next/image";

const TRACKERS = [
  {
    name: "Vũ Nguyễn",
    title: "SON TRA LANGUR TRACKER",
    image: "/our-story/tracker.jpg",
    description:
      "Special local staff in Son Tra Peninsula who play an important role in our primate tours. He work for his passion and love for the QUEEN (Red-shanked douc langur and wildlife of the Son Tra peninsula.",
  },
  {
    name: "Mr. Nguyen Huu Tho",
    title: "SON TRA LANGUR TRACKER",
    image: "/our-story/tracker.jpg",
    description:
      "Special local staff in Son Tra Peninsula who play an important role in our primate tours. He work for his passion and love for the QUEEN (Red-shanked douc langur and wildlife of the Son Tra peninsula.",
  },
  {
    name: "Tam My Tay team",
    title: "TAM MY TAY LANGUR TRACKER",
    image: "/our-story/tracker.jpg",
    description:
      "The Tam My Tay Conservation Community Group, dedicated and passionate, has inspired their community to work together to protect the last douc langurs in Nui Thanh district, Quang Nam province.",
  },
  {
    name: "Mr. Nguyen Thanh Tu (Tú Vooc)",
    title: "HA TINH LANGUR TRACKER",
    image: "/our-story/tracker.jpg",
    description:
      "Mr. Nguyen Thanh Tu (Tu Vooc) and the community protection team in Thach Hoa, Quang Binh is a testament to the dedication and tireless efforts of individuals and the local community in conservation. Their significant contributions have helped protect and increase the population of the Ha Tinh langur, a critically endangered primate",
  },
  {
    name: "Mr. Nguyen Thanh Tu (Tú Vooc)",
    title: "HA TINH LANGUR TRACKER",
    image: "/our-story/tracker.jpg",
    description:
      "Mr. Nguyen Thanh Tu (Tu Vooc) and the community protection team in Thach Hoa, Quang Binh is a testament to the dedication and tireless efforts of individuals and the local community in conservation. Their significant contributions have helped protect and increase the population of the Ha Tinh langur, a critically endangered primate",
  },
  {
    name: "Mr. Nguyen Thanh Tu (Tú Vooc)",
    title: "HA TINH LANGUR TRACKER",
    image: "/our-story/tracker.jpg",
    description:
      "Mr. Nguyen Thanh Tu (Tu Vooc) and the community protection team in Thach Hoa, Quang Binh is a testament to the dedication and tireless efforts of individuals and the local community in conservation. Their significant contributions have helped protect and increase the population of the Ha Tinh langur, a critically endangered primate",
  },
];

const PAGE_SIZE = 6;

const Tracker = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(TRACKERS.length / PAGE_SIZE);
  const paginatedTrackers = TRACKERS.slice(
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
          {paginatedTrackers.map((tracker, idx) => (
            <div key={idx} className=" overflow-hidden flex flex-col h-full">
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
