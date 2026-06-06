import Image from "next/image";

export type CoreMemberProfile = {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
};

export default function Founder({
  members,
}: {
  members: CoreMemberProfile[];
}) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section className="w-full mb-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-12">
            {members.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-10"
              >
                <div className="relative md:col-span-4 h-[220px] md:h-[260px] rounded-[6px] overflow-hidden shadow-sm">
                  <Image
                    unoptimized
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 100vw"
                  />
                </div>

                <div className="md:col-span-8 space-y-3 text-[#00342B] leading-relaxed">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl md:text-[26px] font-semibold">
                      {member.name}
                    </h3>
                    <span className="hidden md:block flex-1 border-t border-[#2F3F3B]" />
                  </div>
                  <p className="font-semibold tracking-[0.08em] uppercase text-[#5A7363]">
                    {member.title}
                  </p>
                  <p className="text-[#191919]">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
