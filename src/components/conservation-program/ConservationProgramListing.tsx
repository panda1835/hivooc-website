"use client";

import { useTranslations } from "next-intl";
import ConservationProgramCard from "./ConservationProgramCard";

interface ConservationProgram {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug?: string;
}

interface ConservationProgramListingProps {
  programs: ConservationProgram[];
}

export default function ConservationProgramListing({
  programs,
}: ConservationProgramListingProps) {
  const t = useTranslations("ConservationProgram.Listing");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-[36px] font-medium text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-[#192B28] max-w-7xl">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <ConservationProgramCard
              key={program.id}
              id={program.id}
              title={program.title}
              description={program.description}
              date={program.date}
              image={program.image}
              slug={program.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
