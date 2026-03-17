"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface BookThisTripButtonProps {
  label: string;
  className?: string;
}

const inputClassName =
  "w-full p-3 border border-gray-200 rounded bg-gray-50/30 focus:outline-none focus:border-branding-green focus:ring-1 focus:ring-branding-green/20 transition-colors placeholder:text-gray-400";

const radioClassName =
  "peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-branding-green checked:border-2 transition-colors";

const checkboxClassName =
  "peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-branding-green checked:border-branding-green transition-colors";

export default function BookThisTripButton({
  label,
  className,
}: BookThisTripButtonProps) {
  const t = useTranslations("ShortTrips.bookForm");
  const [isOpen, setIsOpen] = useState(false);
  const [needsHotelAddress, setNeedsHotelAddress] = useState<"yes" | "not-yet">(
    "not-yet",
  );

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-8 text-branding-green shadow-sm md:p-12"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t("dialogAriaLabel")}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label={t("closeForm")}
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-branding-green">
              {t("title")}
            </h2>

            <form
              className="space-y-8"
              onSubmit={(event) => {
                event.preventDefault();
                setIsOpen(false);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-medium">
                    {t("fullName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("enterFullName")}
                    className={inputClassName}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-medium">{t("email")}</label>
                  <input
                    type="email"
                    placeholder={t("enterEmail")}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-medium">{t("whatsappNumber")}</label>
                  <input
                    type="tel"
                    placeholder={t("enterWhatsappNumber")}
                    className={inputClassName}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-medium">{t("country")}</label>
                  <input
                    type="text"
                    placeholder={t("enterCountry")}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-medium">{t("tourDate")}</label>
                  <input type="date" className={inputClassName} />
                </div>
                <div className="space-y-2">
                  <label className="block font-medium">{t("participants")}</label>
                  <input
                    type="number"
                    min={1}
                    placeholder={t("enterParticipants")}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-medium">{t("travelInsurance")}</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="travel_insurance"
                        value="yes"
                        className={radioClassName}
                      />
                      <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="group-hover:text-branding-green/80 transition-colors">
                      {t("yes")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="travel_insurance"
                        value="no"
                        className={radioClassName}
                      />
                      <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="group-hover:text-branding-green/80 transition-colors">
                      {t("no")}
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-medium">{t("hotelAddress")}</label>
                <div className="flex flex-wrap gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="hotel_address_status"
                        value="yes"
                        checked={needsHotelAddress === "yes"}
                        onChange={() => setNeedsHotelAddress("yes")}
                        className={radioClassName}
                      />
                      <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="group-hover:text-branding-green/80 transition-colors">
                      {t("yes")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="hotel_address_status"
                        value="not-yet"
                        checked={needsHotelAddress === "not-yet"}
                        onChange={() => setNeedsHotelAddress("not-yet")}
                        className={radioClassName}
                      />
                      <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="group-hover:text-branding-green/80 transition-colors">
                      {t("notYet")}
                    </span>
                  </label>
                </div>
                {needsHotelAddress === "yes" && (
                  <input
                    type="text"
                    placeholder={t("hotelAddressPlaceholder")}
                    className={inputClassName}
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-medium">{t("medicalConditions")}</label>
                <p className="text-sm text-branding-green/85">
                  {t("medicalConditionsDescription")}
                </p>
                <textarea
                  rows={4}
                  className={inputClassName}
                  placeholder={t("medicalConditionsPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium">{t("additionalInfo")}</label>
                <textarea
                  rows={4}
                  className={inputClassName}
                  placeholder={t("additionalInfoPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative mt-0.5">
                    <input type="checkbox" required className={checkboxClassName} />
                    <svg
                      className="absolute inset-0 m-auto w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>
                    {t("termsAgreement")}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <p className="text-sm text-branding-green/85">
                  {t("pleaseVisit")}{" "}
                  <a
                    href="#"
                    className="underline hover:text-branding-green"
                    onClick={(event) => event.preventDefault()}
                  >
                    {t("termsLinkText")}
                  </a>
                </p>
              </div>

              <div className="space-y-3">
                <label className="block font-medium">{t("howDidYouHear")}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    t("hearOptions.searchEngines"),
                    t("hearOptions.socialMedia"),
                    t("hearOptions.onlineAdvertisement"),
                    t("hearOptions.recommendationPreviousGuests"),
                    t("hearOptions.recommendationHivoocFriends"),
                    t("hearOptions.travelBlogsWebsites"),
                    t("hearOptions.tourOperatorTravelAgency"),
                    t("hearOptions.repeatGuest"),
                    t("hearOptions.friendsOfFounder"),
                    t("hearOptions.other"),
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative flex items-start">
                        <input type="checkbox" className={checkboxClassName} />
                        <svg
                          className="absolute inset-0 m-auto w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="group-hover:text-branding-green/80 transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder={t("otherPlaceholder")}
                  className={inputClassName}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="green" size="lg">
                  {t("submit")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
