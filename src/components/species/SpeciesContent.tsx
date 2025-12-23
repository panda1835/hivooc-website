"use client";

import { useMemo, useState } from "react";
import SpeciesFilters from "./SpeciesFilters";
import SpeciesCard, { type SpeciesCardData } from "./SpeciesCard";
import SpeciesPagination from "./SpeciesPagination";

interface FilterOption {
  label: string;
  value: string;
}

interface SpeciesContentProps {
  species: SpeciesCardData[];
  filterOptions: FilterOption[];
  filterTitle: string;
  filterSubtitle: string;
  emptyStateText: string;
}

const PAGE_SIZE = 9;

export default function SpeciesContent({
  species,
  filterOptions,
  filterTitle,
  filterSubtitle,
  emptyStateText,
}: SpeciesContentProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSpecies = useMemo(() => {
    if (!selectedCategories.length) return species;
    return species.filter((item) =>
      selectedCategories.includes(item.category)
    );
  }, [selectedCategories, species]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSpecies.length / PAGE_SIZE)
  );
  const currentSpecies = filteredSpecies.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <div className="lg:sticky lg:top-28 self-start">
            <SpeciesFilters
              title={filterTitle}
              subtitle={filterSubtitle}
              options={filterOptions}
              selected={selectedCategories}
              onToggle={toggleCategory}
              onClear={selectedCategories.length ? clearFilters : undefined}
            />
          </div>

          <div className="space-y-8">
            {currentSpecies.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSpecies.map((item) => (
                  <SpeciesCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-10 text-center text-branding-green/70">
                {emptyStateText}
              </div>
            )}

            <SpeciesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
