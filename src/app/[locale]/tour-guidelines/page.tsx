import Hero from "@/components/our-story/Hero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type GuidelineSection = {
  title: string;
  intro?: string;
  items: string[];
};

const content = {
  en: {
    title: "Guidelines For Participants",
    intro:
      "To ensure guest safety, protect the ecosystem, and follow the regulations of the Son Tra Nature Reserve Management Board, please read and follow the guidelines below.",
    sections: [
      {
        title: "Participant Requirements",
        items: [
          "Guests under 18 years old must be accompanied by a legal guardian, parent, or close family member.",
          "Guests should inform the organizer in advance if they have any health conditions that may affect participation.",
        ],
      },
      {
        title: "Conservation Rules",
        items: [
          "Guests must follow all instructions from the Son Tra Management Board and the tour guide during the tour.",
          "If a guest's behavior damages the environment or disturbs wildlife, the organizer has the right to terminate the tour for that guest without a refund.",
          "Any violations of conservation regulations may result in legal responsibility according to local laws.",
        ],
      },
      {
        title: "Wildlife Observation Rules",
        items: [
          "Do not chase, disturb, or approach wildlife.",
          "Keep a safe distance as instructed by the guide or tracker.",
          "Keep noise to a minimum.",
          "Feeding animals is strictly prohibited.",
          "Flash photography is not allowed.",
          "This is an eco-tour, and wildlife observation follows the principle: No interference, no disturbance.",
          "The guide and tracker will decide the best observation position to ensure safety for both guests and wildlife.",
        ],
      },
      {
        title: "Clothing & Personal Items",
        intro:
          "Guests should wear comfortable outdoor clothing suitable for light trekking. Recommended items:",
        items: [
          "Sunscreen.",
          "Insect repellent.",
          "Light raincoat.",
          "Personal drinking water.",
          "Heavy luggage is not recommended. Suggested weight is under 2 kg.",
        ],
      },
      {
        title: "Environmental Protection",
        items: [
          "Do not litter.",
          "Dispose of waste properly or carry it out of the forest.",
          "Do not break plants or damage natural surroundings.",
        ],
      },
      {
        title: "Personal Responsibility",
        items: [
          "Guests are responsible for their personal belongings during the tour.",
          "The tour operator is not responsible for lost or forgotten items.",
        ],
      },
      {
        title: "Learning & Interaction",
        items: [
          "Guests are encouraged to ask questions and interact with the guide to better understand the ecosystem, biodiversity, and conservation value of Son Tra.",
        ],
      },
    ],
  },
  vi: {
    title: "Hướng dẫn tham gia tour",
    intro:
      "Để bảo đảm an toàn cho khách, bảo vệ hệ sinh thái và tuân thủ quy định của Ban quản lý Khu bảo tồn thiên nhiên Sơn Trà, vui lòng đọc và thực hiện các hướng dẫn dưới đây.",
    sections: [
      {
        title: "Yêu cầu đối với người tham gia",
        items: [
          "Khách dưới 18 tuổi phải đi cùng người giám hộ hợp pháp, cha mẹ hoặc thành viên thân thiết trong gia đình.",
          "Khách nên thông báo trước cho đơn vị tổ chức nếu có bất kỳ tình trạng sức khỏe nào có thể ảnh hưởng đến việc tham gia.",
        ],
      },
      {
        title: "Quy định bảo tồn",
        items: [
          "Khách phải tuân thủ mọi hướng dẫn từ Ban quản lý Sơn Trà và hướng dẫn viên trong suốt tour.",
          "Nếu hành vi của khách gây tổn hại môi trường hoặc làm phiền động vật hoang dã, đơn vị tổ chức có quyền kết thúc tour đối với khách đó mà không hoàn tiền.",
          "Mọi vi phạm quy định bảo tồn có thể dẫn đến trách nhiệm pháp lý theo luật địa phương.",
        ],
      },
      {
        title: "Quy định quan sát động vật hoang dã",
        items: [
          "Không rượt đuổi, làm phiền hoặc tiếp cận động vật hoang dã.",
          "Giữ khoảng cách an toàn theo hướng dẫn của hướng dẫn viên hoặc tracker.",
          "Hạn chế tiếng ồn ở mức tối thiểu.",
          "Nghiêm cấm cho động vật ăn.",
          "Không sử dụng đèn flash khi chụp ảnh.",
          "Đây là tour sinh thái, và việc quan sát động vật hoang dã tuân theo nguyên tắc: Không can thiệp, không làm phiền.",
          "Hướng dẫn viên và tracker sẽ quyết định vị trí quan sát phù hợp nhất để bảo đảm an toàn cho cả khách và động vật hoang dã.",
        ],
      },
      {
        title: "Trang phục và vật dụng cá nhân",
        intro:
          "Khách nên mặc trang phục ngoài trời thoải mái, phù hợp với hoạt động trekking nhẹ. Các vật dụng được khuyến nghị:",
        items: [
          "Kem chống nắng.",
          "Thuốc chống côn trùng.",
          "Áo mưa nhẹ.",
          "Nước uống cá nhân.",
          "Không khuyến khích mang hành lý nặng. Trọng lượng gợi ý dưới 2 kg.",
        ],
      },
      {
        title: "Bảo vệ môi trường",
        items: [
          "Không xả rác.",
          "Bỏ rác đúng nơi quy định hoặc mang rác ra khỏi rừng.",
          "Không bẻ cây hoặc làm tổn hại cảnh quan tự nhiên.",
        ],
      },
      {
        title: "Trách nhiệm cá nhân",
        items: [
          "Khách tự chịu trách nhiệm với tư trang cá nhân trong suốt tour.",
          "Đơn vị tổ chức tour không chịu trách nhiệm đối với đồ thất lạc hoặc bị bỏ quên.",
        ],
      },
      {
        title: "Học hỏi và tương tác",
        items: [
          "Khách được khuyến khích đặt câu hỏi và tương tác với hướng dẫn viên để hiểu rõ hơn về hệ sinh thái, đa dạng sinh học và giá trị bảo tồn của Sơn Trà.",
        ],
      },
    ],
  },
} satisfies Record<
  "en" | "vi",
  {
    title: string;
    intro: string;
    sections: GuidelineSection[];
  }
>;

function GuidelinesBody({
  intro,
  sections,
}: {
  intro: string;
  sections: GuidelineSection[];
}) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-12 text-xl leading-9 text-black/75">{intro}</p>
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="">
              <h2 className="mb-5 text-branding-green">{section.title}</h2>
              {section.intro && (
                <p className="mb-5 text-lg leading-8 text-black/75">
                  {section.intro}
                </p>
              )}
              <ul className="space-y-2 text-lg leading-8 text-black/75">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 list-disc list-inside">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function TourGuidelinesPage({ params }: PageProps) {
  const { locale } = await params;
  const pageContent = locale === "vi" ? content.vi : content.en;

  return (
    <main className="w-full">
      <Hero title={pageContent.title} subtitle={""} />
      <GuidelinesBody
        intro={pageContent.intro}
        sections={pageContent.sections}
      />
    </main>
  );
}
