import type React from "react";

export interface PolicySection {
  title: string;
  items: string[];
}

interface PoliciesProps {
  sections: PolicySection[];
}

export default function Policies({ sections }: PoliciesProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-[24px] font-medium">Policies</h2>
      {sections.map((section, groupIndex) => {
        // Group sections in pairs for 2-column layout
        if (groupIndex % 2 === 0) {
          const leftSection = sections[groupIndex];
          const rightSection = sections[groupIndex + 1];

          return (
            <div
              key={groupIndex}
              className="grid md:grid-cols-2 gap-6 md:gap-8"
            >
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium text-[#192B28]">
                    {leftSection.title}
                  </h2>
                  <ul className="space-y-2">
                    {leftSection.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-[#192B28] font-[Inter]"
                      >
                        <span className="text-[#192B28]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              {rightSection && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-medium text-[#192B28]">
                      {rightSection.title}
                    </h2>
                    <ul className="space-y-2">
                      {rightSection.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-[#192B28] font-[Inter]"
                        >
                          <span className="text-[#192B28]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
