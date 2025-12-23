interface SpeciesIntroProps {
  title: string;
  description: string;
}

export default function SpeciesIntro({ title, description }: SpeciesIntroProps) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-5xl">
          <h2 className="text-branding-green mb-4 leading-tight">{title}</h2>
          <p className="text-branding-green/80 leading-relaxed text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
