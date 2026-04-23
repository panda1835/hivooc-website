"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface RichSection {
  title: string;
  contentHtml: string;
}

interface RichSectionsAccordionProps {
  title: string;
  sections: RichSection[];
}

export default function RichSectionsAccordion({
  title,
  sections,
}: RichSectionsAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  if (sections.length === 0) {
    return null;
  }

  const toggleItem = (index: number) => {
    const next = new Set(expandedItems);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setExpandedItems(next);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-[#192B28]">{title}</h2>

      <div>
        {sections.map((section, index) => (
          <div
            key={`${section.title}-${index}`}
            className={`border ${index === 0 ? "rounded-t-lg" : ""} ${index === sections.length - 1 ? "rounded-b-lg" : ""} overflow-hidden`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <h3 className="text-base font-semibold text-[#192B28]">
                {section.title}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedItems.has(index) ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedItems.has(index) && (
              <div className="px-4 pb-4 bg-white border-t border-gray-100">
                <div
                  className="cms-body-normal pt-4 text-[#192B28] [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
