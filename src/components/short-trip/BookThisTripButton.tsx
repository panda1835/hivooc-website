"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface BookThisTripButtonProps {
  label: string;
  className?: string;
  inquiryType?: string;
  inquiryName?: string;
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
  inquiryType,
  inquiryName,
}: BookThisTripButtonProps) {
  const t = useTranslations("ShortTrips.bookForm");
  const [isOpen, setIsOpen] = useState(false);
  const [needsHotelAddress, setNeedsHotelAddress] = useState<"yes" | "not-yet">(
    "not-yet",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    setSubmitState("idle");
    setSubmitError(null);
    setIsSubmitting(false);
    setNeedsHotelAddress("not-yet");
  };

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSubmitState("idle");
        setNeedsHotelAddress("not-yet");
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
        onClick={() => {
          setSubmitState("idle");
          setSubmitError(null);
          setIsOpen(true);
        }}
      >
        {label}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={closeModal}
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
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-branding-green">
              {t("title")}
            </h2>

            {submitState === "success" ? (
              <div className="space-y-4 rounded border  p-5">
                <h3 className="text-xl font-semibold ">
                  Request submitted successfully
                </h3>
                <p className="">
                  Thank you. We received your booking request and our team will
                  contact you soon.
                </p>
                <div>
                  <Button type="button" variant="green" onClick={closeModal}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form
                className="space-y-8"
                onSubmit={async (event) => {
                  event.preventDefault();

                  const form = event.currentTarget;
                  const formData = new FormData(form);
                  const fields: Record<string, string | string[]> = {};
                  const pathname = window.location.pathname;
                  const resolvedInquiryType =
                    inquiryType ||
                    (pathname.includes("/nature-education/")
                      ? "Nature Education Tour"
                      : "Short Tour");
                  const resolvedInquiryTitle = inquiryName
                    ? `${resolvedInquiryType} Inquiry - ${inquiryName}`
                    : `${resolvedInquiryType} Inquiry`;

                  for (const [key, rawValue] of formData.entries()) {
                    const value = String(rawValue).trim();

                    if (!value) {
                      continue;
                    }

                    const existing = fields[key];

                    if (existing === undefined) {
                      fields[key] = value;
                    } else if (Array.isArray(existing)) {
                      existing.push(value);
                    } else {
                      fields[key] = [existing, value];
                    }
                  }

                  fields.tour_type = resolvedInquiryType;
                  if (inquiryName) {
                    fields.tour_name = inquiryName;
                  }

                  setIsSubmitting(true);
                  setSubmitState("idle");
                  setSubmitError(null);

                  try {
                    const response = await fetch("/api/tour-inquiry", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        formType: "Tour Booking",
                        inquiryTitle: resolvedInquiryTitle,
                        sourcePath: window.location.pathname,
                        fields,
                      }),
                    });

                    if (!response.ok) {
                      const errorPayload = (await response
                        .json()
                        .catch(() => null)) as {
                        error?: string;
                        details?: string;
                      } | null;
                      throw new Error(
                        errorPayload?.details ||
                          errorPayload?.error ||
                          "Failed to send short inquiry",
                      );
                    }

                    setSubmitState("success");
                    form.reset();
                    setNeedsHotelAddress("not-yet");
                  } catch (error) {
                    const message =
                      error instanceof Error && error.message
                        ? error.message
                        : "Could not send your inquiry right now.";
                    setSubmitState("error");
                    setSubmitError(message);
                  } finally {
                    setIsSubmitting(false);
                  }
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
                      name="full_name"
                      placeholder={t("enterFullName")}
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">{t("email")}</label>
                    <input
                      type="email"
                      name="email"
                      placeholder={t("enterEmail")}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-medium">
                      {t("whatsappNumber")}
                    </label>
                    <input
                      type="tel"
                      name="whatsapp_number"
                      placeholder={t("enterWhatsappNumber")}
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">{t("country")}</label>
                    <input
                      type="text"
                      name="country"
                      placeholder={t("enterCountry")}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-medium">{t("tourDate")}</label>
                    <input
                      type="date"
                      name="tour_date"
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">
                      {t("participants")}
                    </label>
                    <input
                      type="number"
                      min={1}
                      name="participants"
                      placeholder={t("enterParticipants")}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-medium">
                    {t("travelInsurance")}
                  </label>
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
                  <label className="block font-medium">
                    {t("hotelAddress")}
                  </label>
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
                      name="hotel_address"
                      placeholder={t("hotelAddressPlaceholder")}
                      className={inputClassName}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block font-medium">
                    {t("medicalConditions")}
                  </label>
                  <p className="text-sm text-branding-green/85">
                    {t("medicalConditionsDescription")}
                  </p>
                  <textarea
                    rows={4}
                    name="medical_conditions"
                    className={inputClassName}
                    placeholder={t("medicalConditionsPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium">
                    {t("additionalInfo")}
                  </label>
                  <textarea
                    rows={4}
                    name="additional_info"
                    className={inputClassName}
                    placeholder={t("additionalInfoPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        required
                        name="terms_agreement"
                        value="agreed"
                        className={checkboxClassName}
                      />
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
                    <Link
                      href="/terms-of-service"
                      className="underline hover:text-branding-green"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("termsLinkText")}
                    </Link>
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block font-medium">
                    {t("howDidYouHear")}
                  </label>
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
                          <input
                            type="checkbox"
                            name="how_did_you_hear"
                            value={option}
                            className={checkboxClassName}
                          />
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
                    name="how_did_you_hear_other"
                    placeholder={t("otherPlaceholder")}
                    className={inputClassName}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="green"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : t("submit")}
                  </Button>
                </div>

                {submitState === "error" && (
                  <p className="text-sm text-red-700">
                    {submitError ||
                      "Could not send your inquiry right now. Please try again."}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
