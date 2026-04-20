"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useLocale } from "next-intl";
import { useRef, useState } from "react";

const inputClass =
  "w-full rounded-[4px] border border-[#D8D5CF] bg-white px-4 py-3 text-branding-green placeholder:text-branding-green/45 focus:outline-none focus:ring-2 focus:ring-branding-orange/25";
const textareaClass =
  "w-full min-h-36 rounded-[4px] border border-[#D8D5CF] bg-white px-4 py-3 text-branding-green placeholder:text-branding-green/45 focus:outline-none focus:ring-2 focus:ring-branding-orange/25";
const labelClass = "text-lg font-medium text-branding-green";
const sectionTitleClass =
  "font-condensed text-[30px] leading-tight text-branding-green";

type InquiryFields = Record<string, string | string[]>;

interface BookConservationTourButtonProps {
  programTitle?: string;
  className?: string;
  formOnly?: boolean;
}

function toReadableLabel(key: string): string {
  const normalized = key
    .replaceAll(/[_-]+/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!normalized) {
    return "Field";
  }

  return normalized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function collectFormFields(form: HTMLFormElement): InquiryFields {
  const formData = new FormData(form);
  const fields: InquiryFields = {};

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

  return fields;
}

function checkList(name: string, options: string[]) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((item) => (
        <label
          key={`${name}-${item}`}
          className="flex items-start gap-3 text-[15px] text-branding-green"
        >
          <input
            type="checkbox"
            name={name}
            value={item}
            className="mt-[2px] h-4 w-4 shrink-0 rounded border-[#BEB8AF] accent-branding-green"
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}

function radioList(name: string, options: string[]) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((item) => (
        <label
          key={`${name}-${item}`}
          className="flex items-start gap-3 text-[15px] text-branding-green"
        >
          <input
            type="radio"
            name={name}
            value={item}
            className="mt-[2px] h-4 w-4 shrink-0 accent-branding-green"
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}

export default function BookConservationTourButton({
  programTitle,
  className = "",
  formOnly = false,
}: BookConservationTourButtonProps) {
  const locale = useLocale();
  const isVi = locale === "vi";
  const tx = (en: string, vi: string) => (isVi ? vi : en);

  const stepLabels = [
    tx("Step 1: Personal & Group", "Bước 1: Cá nhân & đoàn"),
    tx("Step 2: Conservation Focus", "Bước 2: Trọng tâm bảo tồn"),
    tx("Step 3: Wildlife Experience", "Bước 3: Trải nghiệm hoang dã"),
    tx("Step 4: Comfort & Pace", "Bước 4: Tiện nghi & nhịp độ"),
    tx("Step 5: Philanthropic Interest", "Bước 5: Đóng góp bảo tồn"),
    tx("Step 6: Travel Framework", "Bước 6: Khung hành trình"),
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
    setSubmitState("idle");
    setSubmitError(null);
  };

  const closeSuccessState = () => {
    if (formOnly) {
      setSubmitState("idle");
      return;
    }

    closeModal();
  };

  const nextStep = () =>
    setCurrentStep((value) => Math.min(value + 1, stepLabels.length - 1));
  const prevStep = () => setCurrentStep((value) => Math.max(value - 1, 0));

  const handleSubmit = async () => {
    const form = formRef.current;
    if (!form) {
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitError(null);

    try {
      const fields = collectFormFields(form);
      const response = await fetch("/api/tour-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "Conservation Tour",
          inquiryTitle: "Conservation Tour Booking Request",
          locale,
          sourcePath: window.location.pathname,
          fields,
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as {
          error?: string;
          details?: string;
        } | null;
        throw new Error(
          errorPayload?.details ||
            errorPayload?.error ||
            "Failed to send conservation tour inquiry",
        );
      }

      setSubmitState("success");
      setCurrentStep(0);
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "We could not send your request right now. Please try again.";
      setSubmitState("error");
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formHref = programTitle
    ? `/conservation-tour-form?program=${encodeURIComponent(programTitle)}`
    : "/conservation-tour-form";

  return (
    <>
      {!formOnly && (
        <div className={`w-full bg-white py-10 ${className}`}>
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 sm:px-6 lg:px-8">
            <p className="max-w-3xl text-branding-green/75">
              {tx(
                "Ready to design a conservation legacy journey with HIVOOC's wildlife specialists?",
                "Bạn đã sẵn sàng thiết kế một hành trình bảo tồn cùng các chuyên gia động vật hoang dã của HIVOOC?",
              )}
            </p>
            <Button
              type="button"
              variant="orange"
              size="lg"
              className="group font-sans cursor-pointer"
              asChild
            >
              <Link href={formHref}>
                {tx("Book Conservation Tour", "Đặt Chuyến Đi Bảo Tồn")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {(isOpen || formOnly) && (
        <div
          className={
            formOnly
              ? "w-full"
              : "fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6"
          }
          onClick={formOnly ? undefined : closeModal}
          role={formOnly ? undefined : "presentation"}
        >
          <div
            className={
              formOnly
                ? "mx-auto w-full max-w-6xl rounded-lg bg-white p-6 text-branding-green shadow-sm md:p-10"
                : "relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 text-branding-green shadow-sm md:p-10"
            }
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={tx(
              "Conservation tour booking form",
              "Biểu mẫu đặt chuyến đi bảo tồn",
            )}
          >
            {!formOnly && (
              <button
                type="button"
                className="absolute right-4 top-4 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                aria-label={tx("Close form", "Đóng biểu mẫu")}
                onClick={closeModal}
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {submitState === "success" ? (
              <div className="space-y-5 p-4">
                <h2 className="font-condensed text-[36px] leading-tight">
                  {tx(
                    "Request submitted successfully",
                    "Yêu cầu đã được gửi thành công",
                  )}
                </h2>
                <p className="text-branding-green/80">
                  {tx(
                    "Thank you. We received your conservation tour request and our team will contact you soon.",
                    "Cảm ơn bạn. Chúng tôi đã nhận được yêu cầu chuyến đi bảo tồn và đội ngũ sẽ sớm liên hệ.",
                  )}
                </p>
                <Button
                  type="button"
                  variant="green"
                  size="lg"
                  className="font-sans cursor-pointer"
                  onClick={closeSuccessState}
                >
                  {tx("Close", "Đóng")}
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="pr-8">
                  <h2 className="mt-3 font-condensed text-[42px] leading-tight">
                    {tx(
                      "Begin Designing Your Conservation Legacy Journey",
                      "Bắt Đầu Thiết Kế Hành Trình Bảo Tồn",
                    )}
                  </h2>
                  <p className="mt-4 max-w-4xl text-branding-green/80">
                    {tx(
                      "This form helps us understand your interests, expectations, and group profile before designing your program.",
                      "Biểu mẫu này giúp chúng tôi hiểu sở thích, kỳ vọng và hồ sơ đoàn trước khi thiết kế chương trình phù hợp.",
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {stepLabels.map((label, index) => {
                    const isActive = index === currentStep;
                    const isDone = index < currentStep;

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setCurrentStep(index)}
                        className={`inline-flex items-center rounded-[4px] border px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? "border-branding-orange bg-branding-orange/20 text-branding-green"
                            : isDone
                              ? "border-branding-green bg-branding-green text-white"
                              : "border-[#DDD8CF] bg-white text-branding-green/75 hover:bg-branding-yellow"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <form
                  ref={formRef}
                  className="space-y-8"
                  onSubmit={(event) => event.preventDefault()}
                >
                  {programTitle && (
                    <input
                      type="hidden"
                      name="source_program"
                      value={programTitle}
                    />
                  )}

                  <section hidden={currentStep !== 0} className="space-y-6">
                    <h3 className={sectionTitleClass}>
                      {tx(
                        "Step 1 - Personal & Group Information",
                        "Bước 1 - Thông tin cá nhân & đoàn",
                      )}
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <label className="space-y-2">
                        <span className={labelClass}>
                          {tx("Full name", "Họ và tên")}
                        </span>
                        <input
                          type="text"
                          name="full_name"
                          className={inputClass}
                          placeholder={tx("Your full name", "Nhập họ và tên")}
                        />
                      </label>
                      <label className="space-y-2">
                        <span className={labelClass}>
                          {tx("Country of residence", "Quốc gia cư trú")}
                        </span>
                        <input
                          type="text"
                          name="country_of_residence"
                          className={inputClass}
                        />
                      </label>
                      <label className="space-y-2">
                        <span className={labelClass}>Email</span>
                        <input
                          type="email"
                          name="email"
                          className={inputClass}
                          placeholder="you@example.com"
                        />
                      </label>
                      <label className="space-y-2">
                        <span className={labelClass}>
                          {tx(
                            "Estimated number of participants",
                            "Số người tham gia dự kiến",
                          )}
                        </span>
                        <input
                          type="number"
                          name="estimated_participants"
                          className={inputClass}
                          min={1}
                        />
                      </label>
                    </div>

                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx(
                          "Preferred contact method",
                          "Phương thức liên hệ ưu tiên",
                        )}
                      </p>
                      {checkList("preferred_contact_method", [
                        tx("Email", "Email"),
                        tx("WhatsApp", "WhatsApp"),
                        tx(
                          "Private consultation call",
                          "Cuộc gọi tư vấn riêng",
                        ),
                      ])}
                    </div>

                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx("Group structure", "Cơ cấu đoàn")}
                      </p>
                      {radioList("group_structure", [
                        tx(
                          "Private journey (1-6 participants)",
                          "Hành trình riêng (1-6 người)",
                        ),
                        tx(
                          "Small curated group (7-15 participants)",
                          "Nhóm tuyển chọn nhỏ (7-15 người)",
                        ),
                        tx(
                          "Larger delegation (16-30 participants)",
                          "Đoàn lớn hơn (16-30 người)",
                        ),
                      ])}
                    </div>
                  </section>

                  <section hidden={currentStep !== 1} className="space-y-6">
                    <h3 className={sectionTitleClass}>
                      {tx(
                        "Step 2 - Conservation Engagement Focus",
                        "Bước 2 - Trọng tâm tham gia bảo tồn",
                      )}
                    </h3>
                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx(
                          "What aspects of conservation engagement interest you most?",
                          "Bạn quan tâm nhất đến khía cạnh bảo tồn nào?",
                        )}
                      </p>
                      {checkList("conservation_engagement_focus", [
                        tx(
                          "Meetings with conservation NGOs",
                          "Gặp gỡ các tổ chức bảo tồn",
                        ),
                        tx(
                          "Field visits with conservation teams",
                          "Thăm thực địa cùng đội ngũ bảo tồn",
                        ),
                        tx(
                          "Community forest protection initiatives",
                          "Sáng kiến bảo vệ rừng dựa vào cộng đồng",
                        ),
                        tx(
                          "University engagement & student dialogue",
                          "Giao lưu đại học & đối thoại với sinh viên",
                        ),
                        tx(
                          "School-based environmental workshops",
                          "Workshop môi trường tại trường học",
                        ),
                        tx(
                          "Tree planting / habitat restoration",
                          "Trồng cây / phục hồi sinh cảnh",
                        ),
                        tx(
                          "Exploring philanthropic support opportunities",
                          "Tìm hiểu cơ hội hỗ trợ thiện nguyện",
                        ),
                      ])}
                    </div>
                    <label className="space-y-2">
                      <span className={labelClass}>
                        {tx(
                          "Organizations of interest, if known",
                          "Tổ chức bạn quan tâm, nếu có",
                        )}
                      </span>
                      <textarea
                        name="organizations_of_interest"
                        className={textareaClass}
                        placeholder="Save Vietnam Wildlife, WildAct, FFI Vietnam, Cat Ba Langur Conservation Project..."
                      />
                    </label>
                  </section>

                  <section hidden={currentStep !== 2} className="space-y-6">
                    <h3 className={sectionTitleClass}>
                      {tx(
                        "Step 3 - Wildlife Experience",
                        "Bước 3 - Trải nghiệm động vật hoang dã",
                      )}
                    </h3>
                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx(
                          "Preferred wildlife engagement",
                          "Hình thức trải nghiệm động vật hoang dã mong muốn",
                        )}
                      </p>
                      {checkList("preferred_wildlife_engagement", [
                        tx(
                          "Accessible primate observation (minimal trekking)",
                          "Quan sát linh trưởng dễ tiếp cận (ít trekking)",
                        ),
                        tx("Light field visits", "Thăm thực địa nhẹ nhàng"),
                        tx(
                          "Birdwatching in comfortable locations",
                          "Quan sát chim tại địa điểm thoải mái",
                        ),
                        tx(
                          "Coastal or island wildlife experiences",
                          "Trải nghiệm động vật hoang dã ven biển hoặc đảo",
                        ),
                        tx(
                          "Combination of wildlife & cultural heritage",
                          "Kết hợp động vật hoang dã & di sản văn hóa",
                        ),
                      ])}
                    </div>
                  </section>

                  <section hidden={currentStep !== 3} className="space-y-6">
                    <h3 className={sectionTitleClass}>
                      {tx(
                        "Step 4 - Comfort & Pace",
                        "Bước 4 - Tiện nghi & nhịp độ",
                      )}
                    </h3>
                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx(
                          "Preferred accommodation level",
                          "Mức lưu trú mong muốn",
                        )}
                      </p>
                      {checkList("preferred_accommodation_level", [
                        tx(
                          "Boutique heritage hotels",
                          "Khách sạn boutique di sản",
                        ),
                        tx(
                          "Premium nature lodges",
                          "Lodge thiên nhiên cao cấp",
                        ),
                        tx("Luxury retreats", "Khu nghỉ dưỡng sang trọng"),
                        tx(
                          "Mixed comfort levels",
                          "Kết hợp nhiều mức tiện nghi",
                        ),
                      ])}
                    </div>
                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx("Preferred pace", "Nhịp độ mong muốn")}
                      </p>
                      {radioList("preferred_pace", [
                        tx(
                          "Relaxed and reflective",
                          "Thư thả và có thời gian chiêm nghiệm",
                        ),
                        tx(
                          "Balanced engagement and rest",
                          "Cân bằng giữa tham gia và nghỉ ngơi",
                        ),
                        tx("Moderate activity", "Hoạt động vừa phải"),
                      ])}
                    </div>
                  </section>

                  <section hidden={currentStep !== 4} className="space-y-6">
                    <h3 className={sectionTitleClass}>
                      {tx(
                        "Step 5 - Philanthropic Interest",
                        "Bước 5 - Mối quan tâm đóng góp bảo tồn",
                      )}
                    </h3>
                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx(
                          "Are you open to exploring:",
                          "Bạn có quan tâm tìm hiểu:",
                        )}
                      </p>
                      {checkList("philanthropic_interest", [
                        tx(
                          "Direct conservation sponsorship",
                          "Tài trợ trực tiếp cho bảo tồn",
                        ),
                        tx(
                          "Community livelihood support initiatives",
                          "Sáng kiến hỗ trợ sinh kế cộng đồng",
                        ),
                        tx(
                          "Scholarship or education support",
                          "Hỗ trợ học bổng hoặc giáo dục",
                        ),
                        tx(
                          "Structured conservation partnerships",
                          "Hợp tác bảo tồn có cấu trúc",
                        ),
                        tx("One-time contribution", "Đóng góp một lần"),
                        tx(
                          "Exploring options during meetings",
                          "Tìm hiểu lựa chọn trong các buổi gặp",
                        ),
                      ])}
                    </div>
                  </section>

                  <section hidden={currentStep !== 5} className="space-y-6">
                    <h3 className={sectionTitleClass}>
                      {tx(
                        "Step 6 - Travel Framework",
                        "Bước 6 - Khung hành trình",
                      )}
                    </h3>
                    <label className="space-y-2">
                      <span className={labelClass}>
                        {tx(
                          "Preferred travel window",
                          "Khung thời gian mong muốn",
                        )}
                      </span>
                      <input
                        type="text"
                        name="preferred_travel_window"
                        className={inputClass}
                        placeholder={tx(
                          "e.g. October 2026",
                          "ví dụ: Tháng 10/2026",
                        )}
                      />
                    </label>
                    <div className="space-y-4">
                      <p className={labelClass}>
                        {tx("Preferred duration", "Thời lượng mong muốn")}
                      </p>
                      {radioList("preferred_duration", [
                        tx("7-10 days", "7-10 ngày"),
                        tx("10-14 days", "10-14 ngày"),
                        tx("14-20 days", "14-20 ngày"),
                      ])}
                    </div>
                    <label className="space-y-2">
                      <span className={labelClass}>
                        {tx(
                          "What would make this journey meaningful for you or your group?",
                          "Điều gì sẽ khiến hành trình này có ý nghĩa với bạn hoặc đoàn của bạn?",
                        )}
                      </span>
                      <textarea
                        name="meaningful_journey_reflection"
                        className="w-full min-h-44 rounded-[4px] border border-[#D8D5CF] bg-white px-4 py-3 text-branding-green placeholder:text-branding-green/45 focus:outline-none focus:ring-2 focus:ring-branding-orange/25"
                      />
                    </label>

                    <div className="rounded-[4px] bg-branding-yellow/45 p-5 text-[15px] leading-relaxed">
                      <p className="text-lg font-medium">
                        {tx(
                          "What happens next?",
                          "Điều gì sẽ diễn ra tiếp theo?",
                        )}
                      </p>
                      <ul className="mt-3 list-disc space-y-1 pl-5">
                        <li>
                          {tx(
                            "Design a tailored conservation engagement program",
                            "Thiết kế chương trình tham gia bảo tồn phù hợp",
                          )}
                        </li>
                        <li>
                          {tx(
                            "Coordinate meetings with appropriate organizations",
                            "Điều phối các buổi gặp với tổ chức phù hợp",
                          )}
                        </li>
                        <li>
                          {tx(
                            "Structure wildlife experiences suited to your group",
                            "Xây dựng trải nghiệm thiên nhiên phù hợp với đoàn",
                          )}
                        </li>
                        <li>
                          {tx(
                            "Discuss optional contribution pathways",
                            "Trao đổi các hướng đóng góp tự chọn",
                          )}
                        </li>
                      </ul>
                    </div>
                  </section>

                  {submitState === "error" && (
                    <p className="text-sm text-red-700">
                      {submitError ||
                        tx(
                          "We could not send your request right now. Please try again.",
                          "Hiện chưa thể gửi yêu cầu của bạn. Vui lòng thử lại.",
                        )}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3DED5] pt-6">
                    <Button
                      type="button"
                      variant="outline-green"
                      size="lg"
                      className="font-sans cursor-pointer"
                      onClick={prevStep}
                      disabled={currentStep === 0 || isSubmitting}
                    >
                      <ArrowLeft className="h-5 w-5" />
                      {tx("Previous", "Quay lại")}
                    </Button>

                    {currentStep < stepLabels.length - 1 ? (
                      <Button
                        type="button"
                        variant="orange"
                        size="lg"
                        onClick={nextStep}
                        className="group font-sans cursor-pointer"
                      >
                        {tx("Next step", "Bước tiếp theo")}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="green"
                        size="lg"
                        className="font-sans cursor-pointer"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? tx("Sending...", "Đang gửi...")
                          : tx("Submit Request", "Gửi Yêu Cầu ")}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
