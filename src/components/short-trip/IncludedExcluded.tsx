import type React from "react";
import { Check, X } from "lucide-react";

interface IncludedExcludedProps {
  included: string[];
  excluded: string[];
}

export default function IncludedExcluded({
  included,
  excluded,
}: IncludedExcludedProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      {/* What's Included */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-[#192B28]">
          What&apos;s included
        </h2>

        <div className="space-y-3">
          {included.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-[#192B28] font-[Inter]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What's NOT Included */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-[#192B28]">
          What&apos;s NOT included
        </h2>

        <div className="space-y-3">
          {excluded.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-[#192B28] font-[Inter]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
