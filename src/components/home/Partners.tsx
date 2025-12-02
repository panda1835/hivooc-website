'use client';

export default function Partners() {
  const partners = Array.from({ length: 16 }).map((_, index) => ({
    id: index + 1,
    name: `Partner ${index + 1}`
  }));

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="relative">
        {/* Carousel wrapper */}
        <div className="flex animate-scroll-left">
          {/* First set of partners */}
          {partners.map((partner) => (
            <div 
              key={`partner-${partner.id}`} 
              className="flex-shrink-0 w-64 mx-4"
            >
              <div className="flex items-center justify-center h-40 bg-branding-green/10 rounded-[4px]">
                {partner.name}
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {partners.map((partner) => (
            <div 
              key={`partner-duplicate-${partner.id}`} 
              className="flex-shrink-0 w-64 mx-4"
            >
              <div className="flex items-center justify-center h-40 bg-branding-green/10 rounded-[4px]">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 10s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
