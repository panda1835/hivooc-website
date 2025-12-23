interface TripOverviewProps {
  location: string;
  locationSubtitle: string;
  duration: string;
  durationSubtitle: string;
  ages: string;
  agesSubtitle: string;
  guide: string;
  guideSubtitle: string;
  description: string;
}

export default function TripOverview({
  location,
  locationSubtitle,
  duration,
  durationSubtitle,
  ages,
  agesSubtitle,
  guide,
  guideSubtitle,
  description,
}: TripOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="border rounded-[4px] py-4 px-5">
          <p className="text-sm text-[#5A7363] font-semibold font-[Inter] uppercase tracking-wide mb-1">
            Location
          </p>
          <p className="text-base font-[Inter] font-semibold text-black">
            {location}
          </p>
          <p className="text-sm font-[Inter] text-[#5A7363] mt-0.5">
            {locationSubtitle}
          </p>
        </div>

        <div className="border rounded-[4px] py-4 px-5">
          <p className="text-sm text-[#5A7363] font-semibold font-[Inter] uppercase tracking-wide mb-1">
            Duration
          </p>
          <p className="text-base font-[Inter] font-semibold text-black">
            {duration}
          </p>
          <p className="text-sm font-[Inter] text-[#5A7363] mt-0.5">
            {durationSubtitle}
          </p>
        </div>

        <div className="border rounded-[4px] py-4 px-5">
          <p className="text-sm text-[#5A7363] font-semibold font-[Inter] uppercase tracking-wide mb-1">
            Ages
          </p>
          <p className="text-base font-[Inter] font-semibold text-black">
            {ages}
          </p>
          <p className="text-sm font-[Inter] text-[#5A7363] mt-0.5">
            {agesSubtitle}
          </p>
        </div>

        <div className="border rounded-[4px] py-4 px-5">
          <p className="text-sm text-[#5A7363] font-semibold font-[Inter] uppercase tracking-wide mb-1">
            Live Wildlife Expert Guide
          </p>
          <p className="text-base font-[Inter] font-semibold text-black">
            {guide}
          </p>
          <p className="text-sm font-[Inter] text-[#5A7363] mt-0.5">
            {guideSubtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="flex gap-2 mt-10">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-12"
        >
          <path
            d="M4 4H7L9 2H15L17 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"
            fill="#30403E"
          />
        </svg>

        <p className="md:text-base text-black font-[Inter] font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
