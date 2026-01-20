import type React from "react";

interface AdditionalInfoObject {
  icon?: string;
  title: string;
  content: string;
}

interface AdditionalInfoProps {
  items?: string[] | AdditionalInfoObject[];
}

export default function AdditionalInfo({ items = [] }: AdditionalInfoProps) {
  if (items.length === 0) return null;

  const isStringArray = items.length > 0 && typeof items[0] === "string";

  return (
    <div className="space-y-4">
      <h2 className="text-[24px] font-medium text-[#192B28]">
        Additional information
      </h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-[#192B28] font-[Inter]"
          >
            {isStringArray ? (
              <>
                <span className="text-[#192B28]">•</span>
                <span>{item as string}</span>
              </>
            ) : (
              <>
                {(item as AdditionalInfoObject).icon && (
                  <span className="mr-1">
                    {(item as AdditionalInfoObject).icon}
                  </span>
                )}
                <div>
                  <p className="font-semibold">
                    {(item as AdditionalInfoObject).title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(item as AdditionalInfoObject).content}
                  </p>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
