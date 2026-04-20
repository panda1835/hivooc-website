import BookConservationTourButton from "@/components/conservation-program/BookConservationTourButton";

export default async function ConservationTourFormPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program } = await searchParams;

  return (
    <div className="min-h-screen bg-branding-yellow px-4 py-12 md:px-8">
      <BookConservationTourButton programTitle={program} formOnly />
    </div>
  );
}
