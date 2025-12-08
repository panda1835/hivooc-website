"use client";

import { useTranslations } from "next-intl";
import { Calendar, Clock, Flag, Users } from "lucide-react";
import GalleryImage from "@/components/GalleryImage";

interface TripInfoProps {
  ages: string;
  duration: string;
  toursPerDay: string;
  tourTimes: string;
  guide: string;
  guideLanguages: string[];
  photographicLocation: string;
  locationDetails: string;
  images: string[];
}

export default function TripInfo({
  ages,
  duration,
  toursPerDay,
  tourTimes,
  guide,
  guideLanguages,
  photographicLocation,
  locationDetails,
  images,
}: TripInfoProps) {
  const t = useTranslations("TripInfo");

  const infoItems = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5715 15.1429H10.8572C11.181 15.1429 11.4526 15.0286 11.6721 14.8C11.8915 14.5715 12.0008 14.2889 12.0001 13.9524V12.1667C12.0001 11.8294 11.8904 11.5469 11.6709 11.3191C11.4515 11.0913 11.1803 10.977 10.8572 10.9762H9.14293V9.78575H12.0001V8.00003H8.5715C8.24769 8.00003 7.97645 8.11432 7.75778 8.34289C7.53912 8.57146 7.4294 8.854 7.42864 9.19051V13.9524C7.42864 14.2897 7.53835 14.5727 7.75778 14.8012C7.97721 15.0298 8.24845 15.1437 8.5715 15.1429ZM9.14293 13.9524V12.1667H10.2858V13.9524H9.14293ZM14.2858 13.9524H15.4286V12.1667H17.1429V10.9762H15.4286V9.19051H14.2858V10.9762H12.5715V12.1667H14.2858V13.9524ZM4.00007 22.2857C3.3715 22.2857 2.83359 22.0528 2.38636 21.5869C1.93912 21.1211 1.71512 20.5604 1.71436 19.9048V3.23813C1.71436 2.58337 1.93836 2.02305 2.38636 1.55718C2.83436 1.0913 3.37226 0.857971 4.00007 0.857178H20.0001C20.6286 0.857178 21.1669 1.09051 21.6149 1.55718C22.0629 2.02384 22.2865 2.58416 22.2858 3.23813V19.9048C22.2858 20.5596 22.0622 21.1203 21.6149 21.5869C21.1677 22.0536 20.6294 22.2865 20.0001 22.2857H4.00007ZM4.00007 19.9048H20.0001V3.23813H4.00007V19.9048Z" fill="#00342B"/>
</svg>
,
      label: t("ages"),
      value: ages,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 14.6198H4.10526V17.7624H9.36842V14.6198L13.5789 18.8099L9.36842 23V19.8574H4.10526V23H2V14.6198ZM19.8947 19.8574V8.33473H5.15789V12.5248H3.05263V5.19217C3.05263 4.02943 3.98947 3.09713 5.15789 3.09713H6.21053V1H8.31579V3.09713H16.7368V1H18.8421V3.09713H19.8947C20.4531 3.09713 20.9886 3.31786 21.3834 3.71076C21.7782 4.10365 22 4.63653 22 5.19217V19.8574C22 21.0097 21.0526 21.9525 19.8947 21.9525H13.4L15.5053 19.8574H19.8947Z" fill="#00342B"/>
</svg>
,
      label: t("duration"),
      value: duration,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 22V2H7V4H21L19 9L21 14H7V22H5ZM12.5 11C13.05 11 13.521 10.8043 13.913 10.413C14.305 10.0217 14.5007 9.55067 14.5 9C14.4993 8.44933 14.3037 7.97867 13.913 7.588C13.5223 7.19733 13.0513 7.00133 12.5 7C11.9487 6.99867 11.478 7.19467 11.088 7.588C10.698 7.98133 10.502 8.452 10.5 9C10.498 9.548 10.694 10.019 11.088 10.413C11.482 10.807 11.9527 11.0027 12.5 11Z" fill="#00342B"/>
</svg>
,
      label: t("toursPerDay"),
      value: toursPerDay,
      subValue: tourTimes,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.0001 23L10.0751 7.45001C10.1751 6.96667 10.4001 6.60401 10.7501 6.36201C11.1001 6.12001 11.4668 5.99934 11.8501 6.00001C12.2334 6.00067 12.5878 6.08401 12.9131 6.25001C13.2384 6.41601 13.5008 6.66601 13.7001 7.00001L14.7001 8.60001C15.0001 9.08334 15.3878 9.52101 15.8631 9.91301C16.3384 10.305 16.8841 10.5923 17.5001 10.775V9.00001H19.0001V23H17.5001V12.85C16.7001 12.6667 15.9584 12.375 15.2751 11.975C14.5918 11.575 14.0001 11.0833 13.5001 10.5L12.9001 13.5L15.0001 15.5V23H13.0001V17L10.9001 15L9.1001 23H7.0001ZM7.4251 13.125L5.3001 12.725C5.03343 12.675 4.8251 12.5373 4.6751 12.312C4.5251 12.0867 4.4751 11.8327 4.5251 11.55L5.2751 7.62501C5.3751 7.09167 5.65843 6.67067 6.1251 6.36201C6.59176 6.05334 7.09176 5.94934 7.6251 6.05001L8.7751 6.27501L7.4251 13.125ZM13.5001 5.50001C12.9501 5.50001 12.4794 5.30434 12.0881 4.91301C11.6968 4.52167 11.5008 4.05067 11.5001 3.50001C11.4994 2.94934 11.6954 2.47867 12.0881 2.08801C12.4808 1.69734 12.9514 1.50134 13.5001 1.50001C14.0488 1.49867 14.5198 1.69467 14.9131 2.08801C15.3064 2.48134 15.5021 2.95201 15.5001 3.50001C15.4981 4.04801 15.3024 4.51901 14.9131 4.91301C14.5238 5.30701 14.0528 5.50267 13.5001 5.50001Z" fill="#00342B"/>
</svg>
,
      label: t("guide"),
      value: guide,
      subValue: guideLanguages.join(", "),
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H7L9 2H15L17 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="#00342B"/>
</svg>
,
      label: t("photographicLocation"),
      value: photographicLocation,
      subValue: locationDetails,
    },
  ];

  return (
    <>
      {/* Info Section - White Background */}
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {infoItems.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-[#00342B]">
                  <div className="w-6 h-6 flex-shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-sm md:text-base text-[#00342B]">
                    {item.label}
                  </h3>
                </div>
                <p className="text-[#00342B] text-sm md:text-base">
                  {item.value}
                </p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Black Background */}
      <section className="w-full py-8" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Horizontal Scrollable Image Row */}
          <div className="overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-3 md:gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-56 h-56 md:w-56 md:h-56 rounded-[4px] overflow-hidden"
                >
                  <GalleryImage
                    images={images}
                    initialIndex={index}
                    className="relative w-full h-full"
                    alt={`${t("imageAlt")} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
