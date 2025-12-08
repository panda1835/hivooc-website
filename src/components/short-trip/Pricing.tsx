"use client";

interface PricingTier {
  pax: string;
  price: number;
}

interface PricingProps {
  title: string;
  description: string;
  pricingTiers: PricingTier[];
}

export default function Pricing({ title, description, pricingTiers }: PricingProps) {
  return (
    <section className="w-full bg-[#F5F1E8] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Title and Description */}
          <div className="space-y-4">
            <h2 className="text-[#00342B] leading-tight">
              {title}
            </h2>
            <p className="text-[#00342B] leading-relaxed text-base md:text-lg">
              {description}
            </p>
          </div>

          {/* Right Column - Pricing Table */}
          <div>
            <h3 className="text-branding-green mb-6">
              Price (USD)
            </h3>
            
            {/* Pricing Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#EDF2F2]">
                    {pricingTiers.map((tier, index) => (
                      <th 
                        key={index}
                        className="text-left px-6 py-4 text-sm md:text-base font-medium"
                      >
                        {tier.pax}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    {pricingTiers.map((tier, index) => (
                      <td 
                        key={index}
                        className="px-6 py-4 text-base md:text-lg"
                      >
                        ${tier.price}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
