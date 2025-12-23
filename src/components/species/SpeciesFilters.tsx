import { Separator } from "@/components/ui/separator";

interface FilterOption {
  label: string;
  value: string;
}

interface SpeciesFiltersProps {
  title: string;
  subtitle: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear?: () => void;
}

export default function SpeciesFilters({
  title,
  subtitle,
  options,
  selected,
  onToggle,
  onClear,
}: SpeciesFiltersProps) {
  return (
    <aside className="rounded-md border border-gray-200 bg-white p-5">
      <div className="mb-4">
        <p className=" font-medium text-[#191919]">{title}</p>
        <Separator className="my-6" />
        <p className="font-medium text-[#191919]">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-sm text-branding-green cursor-pointer"
          >
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer accent-branding-green"
              checked={selected.includes(option.value)}
              onChange={() => onToggle(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 text-sm text-branding-green underline underline-offset-4 hover:text-branding-green/80"
        >
          Clear filters
        </button>
      )}
    </aside>
  );
}
