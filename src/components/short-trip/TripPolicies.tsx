import type React from "react";

interface PolicySection {
  title: string;
  items: string[];
}

interface TripPoliciesProps {
  additionalInfo?: string[];
  reserveNote?: string;
  cancellationPolicy: PolicySection;
  depositPolicy: PolicySection;
  kidsPolicy: PolicySection;
}

export default function TripPolicies({
  additionalInfo = [],
  reserveNote,
  cancellationPolicy,
  depositPolicy,
  kidsPolicy,
}: TripPoliciesProps) {
  return (
    <div className="space-y-8">
      {/* Additional Information */}
      {additionalInfo.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-medium text-[#192B28]">
            Additional information
          </h2>
          <ul className="space-y-2">
            {additionalInfo.map((info, index) => (
              <li
                key={index}
                className="flex items-start gap-2  text-[#192B28] font-[Inter]"
              >
                <span className="text-[#192B28]">•</span>
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reserve Note & Deposit/Cancellation/Kids Policies */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Reserve Now and Pay Later */}
          {reserveNote && (
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-[#192B28]">
                Reserve now and pay later
              </h2>
              <ol className="space-y-2 list-decimal list-inside">
                <li className=" text-[#192B28] font-[Inter]">
                  Please reserve your booking by{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    following page
                  </a>
                </li>
                <li className=" text-[#192B28] font-[Inter]">
                  Fill up required information to complete your booking
                </li>
                <li className=" text-[#192B28] font-[Inter]">{reserveNote}</li>
              </ol>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Deposit Policy */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-[#192B28]">
              {depositPolicy.title}
            </h2>
            <ul className="space-y-2">
              {depositPolicy.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2  text-[#192B28] font-[Inter]"
                >
                  <span className="text-[#192B28]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Cancellation Policy */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-[#192B28]">
              {cancellationPolicy.title}
            </h2>
            <ul className="space-y-2">
              {cancellationPolicy.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2  text-[#192B28] font-[Inter]"
                >
                  <span className="text-[#192B28]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Kids Policy */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-[#192B28]">
              {kidsPolicy.title}
            </h2>
            <ul className="space-y-2">
              {kidsPolicy.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2  text-[#192B28] font-[Inter]"
                >
                  <span className="text-[#192B28]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
