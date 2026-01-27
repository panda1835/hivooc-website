import React from "react";
import Image from "next/image";

const specialist = {
  name: "Dr. Tilo Nadler",
  image: "/our-story/tilo.jpg", // Adjust path as needed
  expertIn: "Primate, Bird",
  description: `Dr. Tilo Nadler stands as a pivotal figure in conservation within Vietnam, widely known and respected for his unwavering dedication to primates and forest ecosystems.\n\nHis remarkable life has become a source of inspiration for anyone fortunate enough to encounter him. His devotion to the old-growth forests of Vietnam has earned him the esteemed title of \"knight of the old forests of Vietnam,\" a testament to his extensive conservation efforts that extend beyond the realm of primate research and protection.`,
};

function SpecialistCard() {
  return (
    <div className="flex gap-8 mb-10">
      <Image
        unoptimized
        src={specialist.image}
        alt={specialist.name}
        width={260}
        height={260}
        className="object-cover rounded-[4px]"
      />
      <div className="flex-1">
        <div className="font-bold text-[22px] mb-2">{specialist.name}</div>
        <div className="flex gap-4 mb-4">
          <div className="bg-[#F5F6F7] rounded px-4 py-2 text-[15px] flex items-center gap-2">
            <span className="font-semibold flex gap-2 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_400_6785)">
                  <path
                    d="M10.8327 18L12.4993 17.1667L14.166 18V12.1667H10.8327M14.166 8V6.33333L12.4993 7.16667L10.8327 6.33333V8L9.16602 8.83333L10.8327 9.66667V11.3333L12.4993 10.5L14.166 11.3333V9.66667L15.8327 8.83333M16.666 3H3.33268C2.89065 3 2.46673 3.17559 2.15417 3.48816C1.84161 3.80072 1.66602 4.22464 1.66602 4.66667V13C1.66602 13.442 1.84161 13.8659 2.15417 14.1785C2.46673 14.4911 2.89065 14.6667 3.33268 14.6667H9.16602V13H3.33268V4.66667H16.666V13H15.8327V14.6667H16.666C17.108 14.6667 17.532 14.4911 17.8445 14.1785C18.1571 13.8659 18.3327 13.442 18.3327 13V4.66667C18.3327 4.22464 18.1571 3.80072 17.8445 3.48816C17.532 3.17559 17.108 3 16.666 3ZM9.16602 7.16667H4.16602V5.5H9.16602M7.49935 9.66667H4.16602V8H7.49935M9.16602 12.1667H4.16602V10.5H9.16602V12.1667Z"
                    fill="#262C29"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_400_6785">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Expert in
            </span>
            <span>{specialist.expertIn}</span>
          </div>
        </div>
        <div className="text-[16px] text-[#2B3A3A] leading-relaxed whitespace-pre-line">
          {specialist.description}
        </div>
      </div>
    </div>
  );
}

const Specialist = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
      <h2 className="text-[28px] font-semibold text-[#2B3A3A] mb-8 flex items-center gap-4">
        HiVOOC Specialist
        <span className="flex-1 h-px bg-[#D9D9D9] ml-4" />
      </h2>
      <SpecialistCard />
      <SpecialistCard />
      <div className="text-center mt-6">
        <button className="bg-transparent hover:underline border-none text-[#DC5C1C] font-semibold text-[16px] cursor-pointer inline-flex items-center gap-2">
          View More
          <span className="text-[18px] ml-1">&#8594;</span>
        </button>
      </div>
    </section>
  );
};

export default Specialist;
