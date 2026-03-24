"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

const inputClass =
  "w-full rounded-[4px] border border-[#D8D5CF] bg-white px-4 py-3 text-branding-green placeholder:text-branding-green/45 focus:outline-none focus:ring-2 focus:ring-branding-orange/25";
const textareaClass =
  "w-full min-h-28 rounded-[4px] border border-[#D8D5CF] bg-white px-4 py-3 text-branding-green placeholder:text-branding-green/45 focus:outline-none focus:ring-2 focus:ring-branding-orange/25";
const sectionTitleClass =
  "font-condensed text-[30px] leading-tight text-branding-green";
const labelClass = "text-lg font-medium text-branding-green";

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

export default function TailorForm() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const tx = (en: string, vi: string) => (isVi ? vi : en);

  const stepLabels = [
    tx(
      "Step 1: Destinations & Species Focus",
      "Bước 1: Điểm đến & Loài mục tiêu",
    ),
    tx("Step 2: Style & Objectives", "Bước 2: Phong cách & Mục tiêu"),
    tx("Step 3: Group & Contact Details", "Bước 3: Thông tin đoàn & Liên hệ"),
  ];

  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((value) => Math.min(value + 1, stepLabels.length - 1));
  const prevStep = () => setCurrentStep((value) => Math.max(value - 1, 0));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 text-branding-green">
      <section className="rounded-lg bg-white p-8 shadow-sm md:p-12">
        <h1 className="font-condensed text-[42px] leading-tight text-branding-green">
          {tx(
            "Tailor-Made Tour With HIVOOC",
            "Tour Thiết Kế Riêng Cùng HIVOOC",
          )}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-branding-green">
          {tx("Dear HIVOOC friends,", "Thân gửi những người bạn của HIVOOC, ")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-branding-green">
          {tx(
            "Thank you for your interest in exploring Vietnam's rare primates, wildlife habitats, and diverse cultures. As a pioneer in primate tourism for conservation, we design private, conservation-led expeditions for serious nature enthusiasts, mature travelers preparing meaningful journeys, professional photographers, wildlife film crews, and curated private groups.",
            "Cảm ơn bạn đã quan tâm đến hành trình khám phá các loài linh trưởng quý hiếm, sinh cảnh hoang dã và văn hóa đa dạng của Việt Nam. Là đơn vị tiên phong về du lịch linh trưởng vì bảo tồn, chúng tôi thiết kế các chuyến đi riêng tư, định hướng bảo tồn cho người yêu thiên nhiên nghiêm túc, du khách trưởng thành, nhiếp ảnh gia chuyên nghiệp, ê-kíp làm phim và các nhóm riêng được tuyển chọn.",
          )}
        </p>
        <p className="mt-4 text-base leading-relaxed text-branding-green">
          {tx(
            "Each expedition is guided or strategically designed with the involvement of primate conservation specialists, supported by experienced local trackers and porters. Our team combines field expertise, ecological understanding, and professional wildlife photography skills, with experience guiding international photographers and documentary crews.",
            "Mỗi chuyến đi đều được hướng dẫn hoặc thiết kế chiến lược với sự tham gia của các chuyên gia bảo tồn linh trưởng, được hỗ trợ bởi những người dẫn đường và khuân vác địa phương giàu kinh nghiệm. Đội ngũ của chúng tôi kết hợp chuyên môn thực địa, hiểu biết về sinh thái và kỹ năng nhiếp ảnh động vật hoang dã chuyên nghiệp, với kinh nghiệm hướng dẫn các nhiếp ảnh gia quốc tế và ê-kíp làm phim tài liệu.",
          )}
        </p>
        <p className="mt-4 text-base leading-relaxed text-branding-green">
          {tx(
            "Guests have described their journeys as creating “magical memories” and “Exceptional and unforgettable experiences,” while recognizing the strength of our conservation team and its dedicated work in primate protection and education. For many, encounters in Son Tra — often referred to as meeting the “Queen of Primates” — have become defining highlights.",
            "Khách hàng đã mô tả hành trình của họ như tạo ra “những kỷ niệm kỳ diệu” và “những trải nghiệm đặc biệt và khó quên”, đồng thời công nhận sức mạnh của đội ngũ bảo tồn của chúng tôi và công việc tận tâm của họ trong việc bảo vệ và giáo dục về linh trưởng. Đối với nhiều người, những cuộc gặp gỡ tại Sơn Trà — thường được gọi là gặp “Nữ hoàng của các loài linh trưởng” — đã trở thành những điểm nhấn quan trọng.",
          )}
        </p>
        <p className="mt-4 text-base leading-relaxed text-branding-green">
          {tx(
            "Our approach is responsible and deliberate: ethical observation, realistic wildlife expectations, and structured planning that also contributes to local livelihoods and conservation outcomes.",
            "Cách tiếp cận của chúng tôi có trách nhiệm và thận trọng: quan sát có đạo đức, kỳ vọng thực tế khi xem động vật hoang dã và lập kế hoạch có cấu trúc, đồng thời đóng góp cho sinh kế địa phương và mục tiêu bảo tồn.",
          )}
        </p>
        <p className="mt-4 text-base leading-relaxed text-branding-green">
          {tx(
            "To begin planning, please complete the form below so our team can assess ecological timing, species feasibility, group profile, and logistics before proposing your tailored concept.",
            "Để bắt đầu lên kế hoạch, vui lòng điền biểu mẫu bên dưới để đội ngũ của chúng tôi đánh giá thời điểm sinh thái, tính khả thi của loài mục tiêu, hồ sơ đoàn và hậu cần trước khi đề xuất hành trình phù hợp.",
          )}
        </p>
        <div className="mt-6 rounded-[4px] border border-branding-orange/30 bg-branding-yellow p-4 text-sm leading-relaxed">
          {tx(
            "If you prefer not to fill in the full form now, contact us directly at",
            "Nếu bạn chưa có thời gian điền toàn bộ biểu mẫu, hãy liên hệ trực tiếp qua",
          )}{" "}
          <a
            className="font-semibold text-branding-orange underline"
            href="mailto:tourbooking@hivooc.com"
          >
            tourbooking@hivooc.com
          </a>{" "}
          {tx("or WhatsApp", "hoặc WhatsApp")}{" "}
          <a
            className="font-semibold text-branding-orange underline"
            href="https://wa.me/84813949222"
            target="_blank"
          >
            +84 813 949 222 (Ms. Quynh)
          </a>
          .
        </div>
        {!started && (
          <div className="mt-8">
            <Button
              variant="orange"
              size="lg"
              onClick={() => setStarted(true)}
              className="group"
            >
              {tx(
                "Begin Your Private Expedition Planning",
                "Bắt Đầu Lên Kế Hoạch Chuyến Đi Riêng",
              )}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </section>

      {started && (
        <section className="rounded-lg bg-white p-8 shadow-sm md:p-12">
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {stepLabels.map((label, index) => {
                const isActive = index === currentStep;
                const isDone = index < currentStep;

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={`inline-flex items-center gap-2 rounded-[4px] border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "border-branding-orange bg-branding-orange/25 text-branding-green"
                        : isDone
                          ? "border-branding-green bg-branding-green text-white"
                          : "border-[#DDD8CF] bg-white text-branding-green/75 hover:bg-branding-yellow"
                    }`}
                  >
                    {/* {isDone && <Check className="h-4 w-4" />} */}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-branding-green/70">
              {tx(
                "Long form, made easy: complete one step at a time and move forward when ready.",
                "Biểu mẫu dài nhưng dễ dùng: hoàn thành từng bước và tiếp tục khi bạn sẵn sàng.",
              )}
            </p>
          </div>

          <form className="space-y-10">
            <section hidden={currentStep !== 0} className="space-y-8">
              <h2 className={sectionTitleClass}>
                {tx(
                  "Step 1: Destinations & Species Focus",
                  "Bước 1: Điểm đến & Loài mục tiêu",
                )}
              </h2>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Preferred destinations (select all that interest you)",
                    "Điểm đến ưu tiên (chọn tất cả lựa chọn bạn quan tâm)",
                  )}
                </p>
                <div className="space-y-5">
                  <div>
                    <h3 className="mb-3 text-lg text-branding-green">
                      {tx("Northern Vietnam", "Miền Bắc Việt Nam")}
                    </h3>
                    {checkList("destinations_north", [
                      tx(
                        "Cuc Phuong National Park",
                        "Vườn quốc gia Cúc Phương",
                      ),
                      tx(
                        "Van Long Nature Reserve - Delacour's langurs",
                        "Khu bảo tồn thiên nhiên Vân Long - Voọc mông trắng",
                      ),
                      tx(
                        "Van Ho - White-cheeked Gibbon Forest",
                        "Vân Hồ - Rừng vượn má trắng",
                      ),
                      tx(
                        "Cat Ba Island - Cat Ba Langur",
                        "Đảo Cát Bà - Voọc Cát Bà",
                      ),
                      tx(
                        "Tuyen Phu - Ha Tinh Langur Forest",
                        "Tuyên Phú - Rừng Voọc Hà Tĩnh",
                      ),
                    ])}
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg text-branding-green">
                      {tx("Central Vietnam", "Miền Trung Việt Nam")}
                    </h3>
                    {checkList("destinations_central", [
                      tx(
                        "Phong Nha Ke Bang National Park (caves, primates, landscapes)",
                        "Vườn quốc gia Phong Nha - Kẻ Bàng (hang động, linh trưởng, phong cảnh)",
                      ),
                      tx(
                        "Bach Ma National Park (trekking and wildlife)",
                        "Vườn quốc gia Bạch Mã (trekking và động vật hoang dã)",
                      ),
                      tx(
                        "Son Tra Mountain (red-shanked douc langur)",
                        "Núi Sơn Trà (voọc chà vá chân nâu)",
                      ),
                      tx(
                        "Song Dam Lake (bird-focused)",
                        "Hồ Sông Đầm (trọng tâm quan sát chim)",
                      ),
                      tx(
                        "Cham Island (sightseeing and culture)",
                        "Đảo Cù Lao Chàm (tham quan và văn hóa)",
                      ),
                      tx(
                        "Tam My - Grey-shanked Douc Forest",
                        "Tam Mỹ - Rừng chà vá chân xám",
                      ),
                      tx(
                        "Ngoc Linh and Mang Den Forest (bird-focused)",
                        "Rừng Ngọc Linh và Măng Đen (trọng tâm quan sát chim)",
                      ),
                      tx(
                        "Elephant Protected Area in Da Nang",
                        "Khu bảo vệ voi tại Đà Nẵng",
                      ),
                    ])}
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg text-branding-green">
                      {tx("Southern Vietnam", "Miền Nam Việt Nam")}
                    </h3>
                    {checkList("destinations_south", [
                      tx("Cat Tien National Park", "Vườn quốc gia Cát Tiên"),
                      tx(
                        "Ma Da Forest (bird-focused)",
                        "Rừng Mã Đà (trọng tâm quan sát chim)",
                      ),
                      tx(
                        "Ha Tien - Silver Langur Forest",
                        "Hà Tiên - Rừng voọc bạc",
                      ),
                      tx(
                        "Da Lat (bird-focused)",
                        "Đà Lạt (trọng tâm quan sát chim)",
                      ),
                      tx(
                        "Can Gio Mangrove Forest (Monkey Island)",
                        "Rừng ngập mặn Cần Giờ (Đảo Khỉ)",
                      ),
                      tx(
                        "Yok Don National Park (bird-focused and elephants)",
                        "Vườn quốc gia Yok Đôn (chim và voi)",
                      ),
                    ])}
                  </div>
                </div>
                <label className="flex items-start gap-3 rounded-[4px] border border-[#DDD8CF] bg-branding-yellow/40 p-4 text-[15px]">
                  <input
                    type="checkbox"
                    name="multi_park_recommendation"
                    className="mt-[2px] h-4 w-4 shrink-0 rounded border-[#BEB8AF] accent-branding-green"
                  />
                  <span>
                    {tx(
                      "I would like a multi-park primate-focused recommendation from HIVOOC's experts.",
                      "Tôi muốn nhận gợi ý lịch trình linh trưởng đa điểm từ các chuyên gia của HIVOOC.",
                    )}
                  </span>
                </label>
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "High-priority primate species (up to 5)",
                    "Loài linh trưởng ưu tiên cao (tối đa 5 loài)",
                  )}
                </p>
                <div>
                  <h3 className="mb-3 text-lg text-branding-green">
                    {tx(
                      "Visible rarest langurs in Vietnam",
                      "Các loài voọc quý hiếm có thể quan sát tại Việt Nam",
                    )}
                  </h3>
                  {checkList("species_langurs", [
                    tx("Red-shanked douc langur", "Voọc chà vá chân nâu"),
                    tx("Grey-shanked douc langur", "Voọc chà vá chân xám"),
                    tx("Black-shanked douc langur", "Voọc chà vá chân đen"),
                    tx(
                      "Cat Ba langur / Golden-headed langur",
                      "Voọc Cát Bà / Voọc đầu vàng",
                    ),
                    tx("Delacour's langur", "Voọc mông trắng"),
                    tx("Ha Tinh langur", "Voọc Hà Tĩnh"),
                    tx("Tonkin snub-nosed monkey", "Voọc mũi hếch Bắc Bộ"),
                  ])}
                </div>
                <div>
                  <h3 className="mb-3 text-lg text-branding-green">
                    {tx(
                      "Visible gibbons in Vietnam",
                      "Các loài vượn có thể quan sát tại Việt Nam",
                    )}
                  </h3>
                  {checkList("species_gibbons", [
                    tx(
                      "Southern yellow-cheeked gibbon",
                      "Vượn má vàng phương Nam",
                    ),
                    tx(
                      "Northern yellow-cheeked gibbon",
                      "Vượn má vàng phương Bắc",
                    ),
                    tx(
                      "Southern white-cheeked gibbon",
                      "Vượn má trắng phương Nam",
                    ),
                    tx(
                      "Northern white-cheeked gibbon",
                      "Vượn má trắng phương Bắc",
                    ),
                  ])}
                </div>
                <div>
                  <h3 className="mb-3 text-lg text-branding-green">
                    {tx(
                      "Visible macaques / monkeys",
                      "Các loài khỉ có thể quan sát",
                    )}
                  </h3>
                  {checkList("species_macaques", [
                    tx("Rhesus macaque", "Khỉ vàng"),
                    tx("Long-tailed macaque", "Khỉ đuôi dài"),
                    tx("Pig-tailed macaque", "Khỉ đuôi lợn"),
                    tx("Stump-tailed macaque", "Khỉ mặt đỏ"),
                    tx("Assam macaque", "Khỉ mốc"),
                  ])}
                </div>
                <div>
                  <h3 className="mb-3 text-lg text-branding-green">
                    {tx(
                      "Visible lorises (nocturnal primates)",
                      "Các loài cu li có thể quan sát (linh trưởng hoạt động ban đêm)",
                    )}
                  </h3>
                  {checkList("species_loris", [
                    tx("Slow pygmy loris", "Cu li chậm"),
                    tx("Pygmy loris", "Cu li nhỏ"),
                  ])}
                </div>
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx("Additional interests", "Mối quan tâm bổ sung")}
                </p>
                {checkList("additional_interests", [
                  tx("Birds", "Chim"),
                  tx("Nocturnal mammals", "Thú hoạt động về đêm"),
                  tx("Reptiles & amphibians", "Bò sát & lưỡng cư"),
                  tx(
                    "Insects (butterflies, dragonflies, others)",
                    "Côn trùng (bướm, chuồn chuồn, loài khác)",
                  ),
                  tx(
                    "Special plant species with a botanist",
                    "Các loài thực vật đặc biệt cùng chuyên gia thực vật",
                  ),
                  tx("Forest ecology", "Sinh thái rừng"),
                  tx(
                    "Meeting local conservationists",
                    "Gặp gỡ các nhà bảo tồn địa phương",
                  ),
                  tx(
                    "Presentations at universities/local NGOs on conservation and wildlife photography",
                    "Tham gia/chia sẻ tại trường đại học hoặc NGO địa phương về bảo tồn và nhiếp ảnh thiên nhiên",
                  ),
                  tx(
                    "Contributing to local conservation efforts",
                    "Đóng góp cho các nỗ lực bảo tồn tại địa phương",
                  ),
                  tx(
                    "Planting trees for primates at destinations",
                    "Trồng cây cho linh trưởng tại điểm đến",
                  ),
                ])}
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Additional destinations for sightseeing, history, culture, and landscape photography",
                    "Điểm đến bổ sung cho tham quan, lịch sử, văn hóa và nhiếp ảnh phong cảnh",
                  )}
                </p>
                <div>
                  <h3 className="mb-3 text-lg text-branding-green">
                    {tx("North", "Miền Bắc")}
                  </h3>
                  {checkList("sightseeing_north", [
                    tx("Ha Long Bay", "Vịnh Hạ Long"),
                    tx("Lan Ha Bay", "Vịnh Lan Hạ"),
                    tx("Sa Pa", "Sa Pa"),
                    tx(
                      "Trang An Landscape Complex",
                      "Quần thể danh thắng Tràng An",
                    ),
                    tx("Tam Coc Bich Dong", "Tam Cốc - Bích Động"),
                  ])}
                </div>
                <div>
                  <h3 className="mb-3 text-lg text-branding-green">
                    {tx("Central", "Miền Trung")}
                  </h3>
                  {checkList("sightseeing_central", [
                    tx(
                      "Caves in Phong Nha Ke Bang National Park",
                      "Hệ thống hang động ở Vườn quốc gia Phong Nha - Kẻ Bàng",
                    ),
                    tx("Ba Na Hills", "Bà Nà Hills"),
                    tx("My Son Sanctuary", "Thánh địa Mỹ Sơn"),
                    tx("Ky Anh Tunnel in Da Nang", "Địa đạo Kỳ Anh ở Đà Nẵng"),
                    tx("Hoi An Ancient Town", "Phố cổ Hội An"),
                    tx("Cruise on Han River", "Du thuyền trên sông Hàn"),
                  ])}
                </div>
                <div>
                  <h3 className="mb-3 text-lg text-branding-green">
                    {tx("South", "Miền Nam")}
                  </h3>
                  {checkList("sightseeing_south", [
                    tx(
                      "Cu Chi Tunnel in Ho Chi Minh City",
                      "Địa đạo Củ Chi (TP. Hồ Chí Minh)",
                    ),
                    tx("Tombs in Hue City", "Lăng tẩm ở Huế"),
                    tx("Can Tho Floating Market", "Chợ nổi Cần Thơ"),
                    tx("Dalat Plateau", "Cao nguyên Đà Lạt"),
                  ])}
                </div>
              </div>
            </section>

            <section hidden={currentStep !== 1} className="space-y-8">
              <h2 className={sectionTitleClass}>
                {tx(
                  "Step 2: Style & Objectives",
                  "Bước 2: Phong cách & Mục tiêu",
                )}
              </h2>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx("Primary intention", "Mục tiêu chính")}
                </p>
                {checkList("primary_intention", [
                  tx(
                    "Vietnam primate photography/videography tour with primate experts (max 7 clients)",
                    "Tour chụp ảnh/quay phim linh trưởng tại Việt Nam cùng chuyên gia (tối đa 7 khách)",
                  ),
                  tx(
                    "Only focus on endemic Vietnam primates (max 7 clients)",
                    "Chỉ tập trung vào các loài linh trưởng đặc hữu Việt Nam (tối đa 7 khách)",
                  ),
                  tx(
                    "Only focus on red-shanked douc langurs (on request)",
                    "Chỉ tập trung vào voọc chà vá chân nâu (theo yêu cầu)",
                  ),
                  tx(
                    "Behavioral observation and ecological learning (on request)",
                    "Quan sát tập tính và học tập sinh thái (theo yêu cầu)",
                  ),
                  tx(
                    "Multi-species wildlife immersion with major focus on targeted primates",
                    "Trải nghiệm đa loài với trọng tâm là các loài linh trưởng mục tiêu",
                  ),
                  tx(
                    "Conservation-focused journey (up to 20 clients)",
                    "Hành trình tập trung vào bảo tồn (tối đa 20 khách)",
                  ),
                  tx(
                    "Private nature retreat (on request)",
                    "Nghỉ dưỡng thiên nhiên riêng tư (theo yêu cầu)",
                  ),
                  tx(
                    "Paid internship program (on request)",
                    "Chương trình thực tập có trả phí (theo yêu cầu)",
                  ),
                ])}
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "If photography/filming-focused, what is your major objective?",
                    "Nếu tập trung chụp ảnh/quay phim, mục tiêu chính của bạn là gì?",
                  )}
                </p>
                {checkList("media_objective", [
                  tx("Personal portfolio", "Hồ sơ tác phẩm cá nhân"),
                  tx("Exhibition or publication", "Triển lãm hoặc xuất bản"),
                  tx("Documentary storytelling", "Kể chuyện tài liệu"),
                  tx("Conservation awareness", "Nâng cao nhận thức bảo tồn"),
                  tx("Personal milestone", "Cột mốc cá nhân"),
                ])}
                <textarea
                  name="media_objective_notes"
                  className={textareaClass}
                  placeholder={tx(
                    "Please elaborate if relevant.",
                    "Vui lòng chia sẻ thêm nếu cần.",
                  )}
                />
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Expedition structure & operational pace",
                    "Cấu trúc hành trình & nhịp độ vận hành",
                  )}
                </p>
                <div className="space-y-4">
                  <label className="block rounded-[4px] border border-[#DDD8CF] p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="pace"
                        value="rapid_multi_site"
                        className="mt-1 h-4 w-4 accent-branding-green"
                      />
                      <div className="text-[15px]">
                        <p className="text-lg font-medium">
                          {tx(
                            "Rapid Multi-Site Expedition",
                            "Hành trình nhanh qua nhiều điểm",
                          )}
                        </p>
                        <p className="mt-1 text-branding-green/80">
                          {tx(
                            "Short timeframe, multiple protected areas, species-focused schedule. Optimized for researchers and wildlife specialists seeking biodiversity and efficiency. Generally 0.5-1 day for 01 habitat/species.",
                            "Khung thời gian ngắn, đi qua nhiều khu bảo tồn, lịch trình tập trung theo loài. Tối ưu cho nhà nghiên cứu và chuyên gia động vật hoang dã cần đa dạng sinh học và hiệu quả. Thông thường 0,5-1 ngày cho 01 sinh cảnh/loài.",
                          )}
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="block rounded-[4px] border border-[#DDD8CF] p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="pace"
                        value="single_species_focus"
                        className="mt-1 h-4 w-4 accent-branding-green"
                      />
                      <div className="text-[15px]">
                        <p className="text-lg font-medium">
                          {tx(
                            "Extended Single-Species Focus",
                            "Theo dõi chuyên sâu một loài",
                          )}
                        </p>
                        <p className="mt-1 text-branding-green/80">
                          {tx(
                            "Longer stay in one habitat, centered on a specific primate species. Best for behavioral observation, photography, or documentary work. 2-10 days for one habitat or 01 species.",
                            "Lưu trú dài ngày tại một sinh cảnh, tập trung vào một loài linh trưởng cụ thể. Phù hợp nhất cho quan sát tập tính, chụp ảnh hoặc làm phim tài liệu. 2-10 ngày cho một sinh cảnh hoặc 01 loài.",
                          )}
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="block rounded-[4px] border border-[#DDD8CF] p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="pace"
                        value="structured_field_immersion"
                        className="mt-1 h-4 w-4 accent-branding-green"
                      />
                      <div className="text-[15px]">
                        <p className="text-lg font-medium">
                          {tx(
                            "Structured Field Immersion",
                            "Trải nghiệm thực địa có cấu trúc",
                          )}
                        </p>
                        <p className="mt-1 text-branding-green/80">
                          {tx(
                            "Balanced wildlife sessions with planned recovery periods. Suitable for serious enthusiasts seeking depth without excessive movement.",
                            "Cân bằng giữa các phiên quan sát động vật hoang dã và các khoảng nghỉ được lên kế hoạch. Phù hợp với người đam mê nghiêm túc muốn chiều sâu mà không di chuyển quá nhiều.",
                          )}
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="block rounded-[4px] border border-[#DDD8CF] p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="pace"
                        value="moderate_exploratory"
                        className="mt-1 h-4 w-4 accent-branding-green"
                      />
                      <div className="text-[15px]">
                        <p className="text-lg font-medium">
                          {tx(
                            "Moderate Exploratory Pace",
                            "Nhịp khám phá vừa phải",
                          )}
                        </p>
                        <p className="mt-1 text-branding-green/80">
                          {tx(
                            "Selective field sessions with reduced logistical pressure. Appropriate for guests prioritizing comfort and ecological interpretation.",
                            "Các phiên thực địa chọn lọc với áp lực hậu cần thấp hơn. Phù hợp cho khách ưu tiên sự thoải mái và diễn giải sinh thái.",
                          )}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                <p className="text-sm text-branding-green/70">
                  {tx(
                    "Notes: Final structure will be refined based on species priority, seasonal timing, and conservation regulations.",
                    "Lưu ý: Cấu trúc cuối cùng sẽ được tinh chỉnh dựa trên mức ưu tiên loài, tính mùa vụ và quy định bảo tồn.",
                  )}
                </p>
              </div>
            </section>

            <section hidden={currentStep !== 2} className="space-y-8">
              <h2 className={sectionTitleClass}>
                {tx(
                  "Step 3: Group & Contact Details",
                  "Bước 3: Thông tin đoàn & Liên hệ",
                )}
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={labelClass}>
                    {tx("Travel window", "Khung thời gian đi")}
                  </span>
                  <select
                    name="travel_month"
                    className={inputClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {tx("Select month", "Chọn tháng")}
                    </option>
                    <option>{tx("January", "Tháng 1")}</option>
                    <option>{tx("February", "Tháng 2")}</option>
                    <option>{tx("March", "Tháng 3")}</option>
                    <option>{tx("April", "Tháng 4")}</option>
                    <option>{tx("May", "Tháng 5")}</option>
                    <option>{tx("June", "Tháng 6")}</option>
                    <option>{tx("July", "Tháng 7")}</option>
                    <option>{tx("August", "Tháng 8")}</option>
                    <option>{tx("September", "Tháng 9")}</option>
                    <option>{tx("October", "Tháng 10")}</option>
                    <option>{tx("November", "Tháng 11")}</option>
                    <option>{tx("December", "Tháng 12")}</option>
                  </select>
                </label>
                <label className="flex items-start gap-3 rounded-[4px] border border-[#DDD8CF] bg-branding-yellow/40 p-4 text-[15px]">
                  <input
                    type="checkbox"
                    name="need_recommendation_for_time"
                    className="mt-[2px] h-4 w-4 shrink-0 rounded border-[#BEB8AF] accent-branding-green"
                  />
                  <span>
                    {tx(
                      "Need recommendations from HIVOOC's experts before deciding travel timing.",
                      "Cần tư vấn thêm từ chuyên gia HIVOOC trước khi quyết định thời gian đi.",
                    )}
                  </span>
                </label>
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx("Preferred duration", "Thời lượng mong muốn")}
                </p>
                {checkList("duration", [
                  tx("2-5 days", "2-5 ngày"),
                  tx("6-10 days", "6-10 ngày"),
                  tx("10-15 days", "10-15 ngày"),
                  tx("16-20 days", "16-20 ngày"),
                  tx(
                    "Extended expedition (>20 days)",
                    "Thám hiểm dài ngày (>20 ngày)",
                  ),
                  tx(
                    "Flexible, based on consultation with HIVOOC's experts",
                    "Linh hoạt, theo tư vấn của chuyên gia HIVOOC",
                  ),
                ])}
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Group structure - who will be traveling?",
                    "Cơ cấu đoàn - Ai sẽ cùng đi?",
                  )}
                </p>
                {checkList("group_structure", [
                  tx("Solo traveler", "Đi một mình"),
                  tx("Couple", "Cặp đôi"),
                  tx("Traveling with partner", "Đi cùng bạn đời"),
                  tx("Family", "Gia đình"),
                  tx("Private group of friends", "Nhóm bạn riêng"),
                  tx(
                    "Organized group led by a tour leader",
                    "Đoàn tổ chức có tour leader",
                  ),
                ])}
                <p className="text-sm text-branding-green/70">
                  {tx(
                    "If organizer-led, please contact us directly at tourbooking@hivooc.com or WhatsApp +84 813949222 (Ms. Quynh) for collaboration details.",
                    "Nếu đoàn do trưởng đoàn/tour leader tổ chức, vui lòng liên hệ trực tiếp qua tourbooking@hivooc.com hoặc WhatsApp +84 813949222 (Ms. Quỳnh) để trao đổi cách phối hợp.",
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={labelClass}>
                    {tx(
                      "Total number of participants",
                      "Tổng số người tham gia",
                    )}
                  </span>
                  <input
                    type="number"
                    name="participants_total"
                    className={inputClass}
                    min={1}
                    placeholder={tx("e.g. 6", "ví dụ: 6")}
                  />
                </label>
                <div className="space-y-2">
                  <span className={`${labelClass} opacity-0`} aria-hidden>
                    {tx(
                      "Total number of participants",
                      "Tổng số người tham gia",
                    )}
                  </span>
                  <label
                    className={`${inputClass} flex min-h-[50px] items-center gap-3`}
                  >
                    <input
                      type="checkbox"
                      name="participants_not_fixed"
                      className="h-4 w-4 accent-branding-green"
                    />
                    <span>{tx("Not fixed yet", "Chưa chốt số lượng")}</span>
                  </label>
                </div>
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Are there children in the group?",
                    "Trong đoàn có trẻ em không?",
                  )}
                </p>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 text-[15px]">
                    <input
                      type="radio"
                      name="children_in_group"
                      value="no"
                      className="h-4 w-4 accent-branding-green"
                    />
                    {tx("No", "Không")}
                  </label>
                  <label className="flex items-center gap-3 text-[15px]">
                    <input
                      type="radio"
                      name="children_in_group"
                      value="yes"
                      className="h-4 w-4 accent-branding-green"
                    />
                    {tx("Yes", "Có")}
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className={labelClass}>
                      {tx("Number of children", "Số lượng trẻ em")}
                    </span>
                    <input
                      type="number"
                      name="children_count"
                      className={inputClass}
                      min={0}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>
                      {tx("Age(s) of children", "Độ tuổi của trẻ em")}
                    </span>
                    <input
                      type="text"
                      name="children_ages"
                      className={inputClass}
                      placeholder={tx("e.g. 9, 12", "ví dụ: 9, 12")}
                    />
                  </label>
                </div>
              </div>

              <label className="space-y-2">
                <span className={labelClass}>
                  {tx(
                    "Age range of adult participants",
                    "Độ tuổi người lớn trong đoàn",
                  )}
                </span>
                <input
                  type="text"
                  name="adult_age_range"
                  className={inputClass}
                  placeholder={tx("e.g. 52-68", "ví dụ: 52-68")}
                />
              </label>

              <div className="space-y-5 mt-8">
                <p className={labelClass}>
                  {tx(
                    "Accommodation comfort level",
                    "Mức độ tiện nghi lưu trú",
                  )}
                </p>
                <p className="text-sm text-branding-green/80">
                  {tx(
                    "Please select the level of comfort you prefer:",
                    "Vui lòng chọn mức độ tiện nghi bạn mong muốn:",
                  )}
                </p>
                {checkList("accommodation_level", [
                  tx(
                    "Field-Oriented (Habitat Priority) - Simple, clean forest lodges or ranger guesthouses located close to key wildlife areas. Focus is on proximity to habitat rather than luxury.",
                    "Thiên về thực địa (Ưu tiên Sinh cảnh) - Nhà nghỉ rừng hoặc nhà khách kiểm lâm đơn giản, sạch sẽ và gần các khu vực động vật hoang dã trọng điểm. Ưu tiên tiếp cận sinh cảnh hơn là xa xỉ.",
                  ),
                  tx(
                    "Eco-Comfort - Well-maintained eco-lodges offering reliable amenities while remaining close to nature.",
                    "Tiện nghi sinh thái - Eco-lodge được duy trì tốt, tiện ích ổn định, vẫn gần gũi với thiên nhiên.",
                  ),
                  tx(
                    "Premium Nature Lodge - High-quality accommodation with enhanced comfort and service standards, where available.",
                    "Lodge thiên nhiên cao cấp - Lưu trú chất lượng cao với mức tiện nghi và tiêu chuẩn dịch vụ nâng cao tại các điểm có sẵn.",
                  ),
                  tx(
                    "Luxury & Boutique Integration - High-end hotels or boutique properties incorporated in selected segments (urban, coastal, or cultural stops), combined with field-based lodging near wildlife habitats.",
                    "Kết hợp Sang trọng & Boutique - Khách sạn cao cấp hoặc cơ sở boutique được tích hợp ở một số chặng chọn lọc (đô thị, ven biển hoặc điểm văn hóa), kết hợp với lưu trú thực địa gần sinh cảnh động vật hoang dã.",
                  ),
                  tx(
                    "Flexible by region - Recommend the Best Balance",
                    "Linh hoạt theo vùng - Đề xuất phương án cân bằng tốt nhất",
                  ),
                ])}
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx("Transportation services", "Dịch vụ di chuyển")}
                </p>
                {checkList("transportation_services", [
                  tx(
                    "Private car (4, 7, 16-seater)",
                    "Xe riêng (4, 7, 16 chỗ)",
                  ),
                  tx("Train", "Tàu hỏa"),
                  tx(
                    "Domestic flights - economy class",
                    "Chuyến bay nội địa - hạng phổ thông",
                  ),
                  tx("Luxury car service", "Dịch vụ xe cao cấp"),
                  tx(
                    "Domestic flights - VIP class",
                    "Chuyến bay nội địa - hạng VIP",
                  ),
                ])}
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Expedition structure & booking preference",
                    "Cách tổ chức hành trình & phương án đặt dịch vụ",
                  )}
                </p>
                {checkList("booking_preference", [
                  tx(
                    "Fully managed expedition package",
                    "Gói hành trình trọn gói do HIVOOC điều phối",
                  ),
                  tx(
                    "Specialist-led field support only",
                    "Chỉ hỗ trợ thực địa do chuyên gia dẫn dắt",
                  ),
                  tx(
                    "Flexible - to be determined after consultation",
                    "Linh hoạt - quyết định sau khi tư vấn",
                  ),
                ])}
                <div className="rounded-[4px] border border-branding-orange bg-branding-orange p-4 text-sm leading-relaxed text-white">
                  <p className="text-lg font-medium">
                    {tx(
                      "Important note on remote forest areas",
                      "Lưu ý quan trọng về các khu rừng xa trung tâm",
                    )}
                  </p>
                  <p className="mt-2">
                    {tx(
                      "Certain primate habitats are located in remote forest zones with limited infrastructure. In these areas:",
                      "Một số sinh cảnh linh trưởng nằm trong các vùng rừng xa với hạ tầng hạn chế. Tại những khu vực này:",
                    )}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>
                      {tx(
                        "Accommodation may not be available for independent online booking.",
                        "Chỗ lưu trú có thể không khả dụng để tự đặt trực tuyến.",
                      )}
                    </li>
                    <li>
                      {tx(
                        "Options may include ranger stations, community lodges, or restricted-access guesthouses.",
                        "Lựa chọn có thể bao gồm trạm kiểm lâm, nhà cộng đồng hoặc nơi lưu trú giới hạn tiếp cận.",
                      )}
                    </li>
                    <li>
                      {tx(
                        "Advance coordination through our team may be required to ensure legal access and conservation compliance.",
                        "Có thể cần phối hợp trước thông qua đội ngũ của chúng tôi để đảm bảo tiếp cận hợp pháp và tuân thủ quy định bảo tồn.",
                      )}
                    </li>
                  </ul>
                  <p className="mt-2">
                    {tx(
                      "Final arrangements in such locations will be discussed during the planning stage.",
                      "Phương án cuối cùng tại những khu vực này sẽ được trao đổi trong giai đoạn lập kế hoạch.",
                    )}
                  </p>
                </div>
              </div>

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
                    {tx("Email address", "Địa chỉ email")}
                  </span>
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
                      "Phone number (available on WhatsApp)",
                      "Số điện thoại (có WhatsApp)",
                    )}
                  </span>
                  <input
                    type="tel"
                    name="phone_whatsapp"
                    className={inputClass}
                    placeholder="+84 914000940"
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>
                    {tx("Country", "Quốc gia")}
                  </span>
                  <input
                    type="text"
                    name="country"
                    className={inputClass}
                    placeholder={tx("Country of residence", "Quốc gia cư trú")}
                  />
                </label>
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Preferred contact method",
                    "Phương thức liên hệ ưu tiên",
                  )}
                </p>
                {checkList("contact_method", [
                  tx("Email", "Email"),
                  tx("WhatsApp", "WhatsApp"),
                  tx("Scheduled video call", "Video call theo lịch hẹn"),
                ])}
              </div>

              <div className="space-y-5">
                <p className={labelClass}>
                  {tx(
                    "Ethical & conservation commitment",
                    "Cam kết đạo đức & bảo tồn",
                  )}
                </p>
                {checkList("ethical_commitment", [
                  tx(
                    "I understand wildlife encounters are probabilistic and cannot be guaranteed.",
                    "Tôi hiểu rằng việc quan sát động vật hoang dã mang tính xác suất và không thể đảm bảo chắc chắn.",
                  ),
                  tx(
                    "I agree to respect protected area regulations and ethical wildlife distances.",
                    "Tôi đồng ý tuân thủ quy định khu bảo tồn và giữ khoảng cách quan sát động vật phù hợp.",
                  ),
                  tx(
                    "I value contributing to primate conservation and local livelihoods through responsible travel.",
                    "Tôi trân trọng việc đóng góp cho bảo tồn linh trưởng và sinh kế địa phương thông qua du lịch có trách nhiệm.",
                  ),
                ])}
              </div>

              <label className="space-y-2">
                <span className={labelClass}>
                  {tx(
                    "What would make this journey unforgettable?",
                    "Điều gì sẽ khiến hành trình này trở nên đáng nhớ nhất với bạn?",
                  )}
                </span>
                <textarea
                  name="journey_success_definition"
                  className="w-full min-h-40 rounded-[4px] border border-[#D8D5CF] bg-white px-4 py-3 text-branding-green placeholder:text-branding-green/45 focus:outline-none focus:ring-2 focus:ring-branding-orange/25"
                  placeholder={tx(
                    "Please share what would define success for you.",
                    "Hãy chia sẻ điều bạn xem là thành công của hành trình này.",
                  )}
                />
              </label>

              <div className="rounded-[4px]  bg-branding-yellow/35 text-[15px] leading-relaxed mt-8">
                <p className="text-lg font-medium">
                  {tx("What happens next?", "Điều gì sẽ diễn ra tiếp theo?")}
                </p>
                <p className="mt-3 ">
                  {tx(
                    "Our expedition team will:",
                    "Đội thám hiểm của chúng tôi sẽ:",
                  )}
                </p>

                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>
                    {tx(
                      "Evaluate ecological timing and species feasibility",
                      "Đánh giá thời điểm sinh thái và tính khả thi của loài mục tiêu",
                    )}
                  </li>
                  <li>
                    {tx(
                      "Assess your group profile and physical readiness",
                      "Đánh giá hồ sơ đoàn và mức độ sẵn sàng thể lực",
                    )}
                  </li>
                  <li>
                    {tx(
                      "Design a conservation-aligned multi-park strategy",
                      "Thiết kế chiến lược đa điểm đến phù hợp định hướng bảo tồn",
                    )}
                  </li>
                  <li>
                    {tx(
                      "Contact you to begin shaping your private expedition",
                      "Liên hệ để cùng xây dựng hành trình riêng dành cho bạn",
                    )}
                  </li>
                </ul>
                <p className="mt-3 text-branding-green/80">
                  {tx(
                    "We move deliberately because once-in-a-lifetime journeys deserve careful planning.",
                    "Chúng tôi làm việc cẩn trọng vì một hành trình có thể chỉ diễn ra một lần trong đời luôn xứng đáng được chuẩn bị kỹ lưỡng.",
                  )}
                </p>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3DED5] pt-6">
              <Button
                type="button"
                variant="outline-green"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4" />
                {tx("Previous", "Quay lại")}
              </Button>

              {currentStep < stepLabels.length - 1 ? (
                <Button
                  type="button"
                  variant="orange"
                  onClick={nextStep}
                  className="group"
                >
                  {tx("Next step", "Bước tiếp theo")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button type="submit" variant="green">
                  {tx("Submit request", "Gửi yêu cầu")}
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
