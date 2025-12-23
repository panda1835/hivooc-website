interface SpeciesFactsProps {
  title: string;
  facts: string[];
}

export default function SpeciesFacts({ title, facts }: SpeciesFactsProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-branding-green">{title}</h3>
      <ul className="list-disc space-y-3 pl-5 text-branding-green/90 leading-relaxed">
        {facts.map((fact, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: fact }} />
        ))}
      </ul>
    </section>
  );
}
