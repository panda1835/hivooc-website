interface ClassificationItem {
  label: string;
  value: string;
}

interface SpeciesInfoCardProps {
  conservationStatus: string[];
  citesStatus: string;
  classification: ClassificationItem[];
  binomialName: string;
  rangeMapImage?: {
    src: string;
    alt: string;
  };
  thumbnail?: {
    src: string;
    alt: string;
  };
}

export default function SpeciesInfoCard({
  conservationStatus,
  citesStatus,
  classification,
  binomialName,
}: SpeciesInfoCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 shadow-sm p-4 text-sm text-branding-green">
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-branding-green">
            Conservation status
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {conservationStatus.map((status) => (
              <span
                key={status}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-branding-green shadow-sm border border-gray-200"
              >
                {status}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-branding-green/70">{citesStatus}</p>
        </div>

        <div className="space-y-1 border-t border-gray-200 pt-3">
          <h4 className="text-sm font-semibold text-branding-green">
            Scientific classification
          </h4>
          <dl className="space-y-1">
            {classification.map((item) => (
              <div key={item.label} className="flex gap-2">
                <dt className="w-28 text-branding-green/70">{item.label}:</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-1 border-t border-gray-200 pt-3">
          <h4 className="text-sm font-semibold text-branding-green">
            Binomial name
          </h4>
          <p className="italic">{binomialName}</p>
        </div>
      </div>
    </div>
  );
}
