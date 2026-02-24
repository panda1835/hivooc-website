import type React from "react";
import { AlertTriangle, Check, X } from "lucide-react";

interface IncludedExcludedProps {
  included: string[];
  excluded: string[];
  notAllowed?: string[];
}

export default function IncludedExcluded({
  included,
  excluded,
  notAllowed = [],
}: IncludedExcludedProps) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {/* What's Included */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-[#192B28]">
          What&apos;s included
        </h2>

        <div className="space-y-3">
          {included.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div
                className="text-sm md:text-base text-[#192B28] font-[Inter]"
                dangerouslySetInnerHTML={{ __html: item }}
              />
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
              <div
                className="text-sm md:text-base text-[#192B28] font-[Inter]"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Not Allowed */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-[#192B28]">Not allowed</h2>

        <div className="space-y-3">
          {notAllowed.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div
                className="text-sm md:text-base text-[#192B28] font-[Inter]"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
