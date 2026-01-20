import type React from "react";

interface AdditionalInfoItem {
  icon?: string;
  title?: string;
  content: string;
}

interface AdditionalInfoProps {
  items?: (string | AdditionalInfoItem)[];
}

export default function AdditionalInfo({ items = [] }: AdditionalInfoProps) {
  if (items.length === 0) return null;

  const renderItem = (item: string | AdditionalInfoItem, index: number) => {
    // Handle legacy string format
    if (typeof item === "string") {
      return (
        <li
          key={index}
          className="flex items-start gap-2 text-[#192B28] font-[Inter]"
        >
          <span className="text-[#192B28]">•</span>
          <span>{item}</span>
        </li>
      );
    }

    // Handle new object format with icons and titles
    return (
      <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
        <div className="flex items-start gap-3">
          {/* {item.icon && (
            <div className="flex-shrink-0 mt-1">
              <span className="text-xl">{item.icon}</span>
            </div>
          )} */}
          <div className="flex-1">
            {item.title && (
              <h3 className="font-semibold text-[20px] text-[#192B28] mb-1">
                {item.title}
              </h3>
            )}
            <p className="text-[#192B28] text-sm leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-[24px] font-medium text-[#192B28]">
        Additional information
      </h2>
      <ul className="space-y-4 border rounded-lg p-4">
        {items.map((info, index) => renderItem(info, index))}
      </ul>
    </div>
  );
}
