"use client";
import React, { useEffect, useState } from "react";

interface OverviewItem {
  title: string;
  info: string;
  subtitle: string;
}

interface TripOverviewProps {
  items: OverviewItem[];
}

export default function TripOverview({ items }: TripOverviewProps) {
  const [columnsStyle, setColumnsStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 768) {
        setColumnsStyle({
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        });
      } else {
        setColumnsStyle(undefined);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  return (
    <div className="space-y-6">
      {/* Info Grid */}
      <div
        className={"grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6"}
        style={columnsStyle}
      >
        {items.map((item, index) => (
          <div key={index} className="border rounded-[4px] py-4 px-5">
            <p className="text-sm text-[#5A7363] font-semibold font-[Inter] uppercase tracking-wide mb-1">
              {item.title}
            </p>
            <p className="text-base font-[Inter] font-semibold text-black">
              {item.info}
            </p>
            <p className="text-sm font-[Inter] text-[#5A7363] mt-0.5">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
