"use client";

import TripReportCard from "./TripReportCard";

interface TripReport {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug?: string;
}

interface TripReportListingProps {
  reports: TripReport[];
}

export default function TripReportListing({ reports }: TripReportListingProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-[36px] font-medium text-gray-900 mb-4">Latest</h2>
          <p className="text-[#192B28] max-w-3xl">
            Praesent vitae sem eu neque suscipit sollicitudin. Ut et ligula eget
            risus scelerisque hendrerit. Sed venenatis auctor placerat. Donec
            volutpat, velit et pretium porttitor, augue risus consectetur
            tortor, ut accumsan erat ante et mauris. Aliquam tempor erato
            interdum sollicitudin ut accumsan erat ante et mauris.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <TripReportCard
              key={report.id}
              id={report.id}
              title={report.title}
              description={report.description}
              date={report.date}
              image={report.image}
              slug={report.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
