import Hero from "@/components/our-story/Hero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type PolicySection = {
  title: string;
  intro?: string;
  items: string[];
};

const content = {
  en: {
    title: "Privacy Policy",
    intro:
      "At HiVOOC, we are committed to protecting the privacy and personal data of our guests. This policy outlines how we collect, use, and safeguard your information when you visit our website, www.hivooc.com, or book an expedition with us.",
    sections: [
      {
        title: "Information We Collect",
        intro:
          "To provide our specialized wildlife tours and conservation experiences, we collect the following categories of information:",
        items: [
          "Identity Data: Full name, gender, date of birth, and nationality.",
          "Contact Data: Email address, phone number, and physical address.",
          "Logistical Data: Passport details required for restricted nature reserve permits, flight schedules, and hotel pickup locations.",
          "Health & Dietary Data: Information regarding physical fitness levels, medical conditions, or dietary restrictions to ensure your safety during treks.",
          "Technical Data: IP address, browser type, and usage patterns on our website via cookies.",
        ],
      },
      {
        title: "How We Use Your Information",
        intro: "We use your data strictly for the following purposes:",
        items: [
          "Tour Operations: Processing bookings, securing permits from Management Boards such as Son Tra or Cat Ba, and arranging transportation.",
          "Personalization: Tailoring the expedition to your interests, such as birdwatching or professional photography.",
          "Safety: Ensuring our Wildlife Experts are aware of any health requirements during field activities.",
          "Communication: Sending trip updates, safety briefings, and, with your consent, newsletters regarding our conservation projects.",
        ],
      },
      {
        title: "Data Sharing & Third Parties",
        intro:
          "We do not sell or rent your data. We only share essential information with:",
        items: [
          "Operational Partners: Hotels, local boat operators, and transport providers.",
          "Authorities: Nature reserve management boards and local government agencies for mandatory permits.",
          "Emergency Services: Medical providers in the event of an injury or health emergency.",
        ],
      },
      {
        title: "Data Security",
        items: [
          "We implement industry-standard security measures to protect your data from unauthorized access, loss, or alteration.",
          "Access to your personal data is limited to authorized HiVOOC personnel who require it for operational purposes.",
        ],
      },
      {
        title: "Media & Photography",
        intro:
          "During our tours, HiVOOC staff may take photographs or videos for promotional use.",
        items: [
          "If you do not wish to appear in promotional materials, please notify us at tourbooking@hivooc.com or dailytour@hivooc.com before your tour.",
          "We respect your right to privacy and will blur or remove images upon valid request.",
        ],
      },
      {
        title: "Your Legal Rights",
        intro: "Under applicable data protection laws, you have the right to:",
        items: [
          "Request access to the personal data we hold about you.",
          "Request the correction of inaccurate information.",
          "Request the deletion of your data following the completion of your tour.",
          "Withdraw consent for marketing communications at any time.",
        ],
      },
      {
        title: "Contact Us",
        intro:
          "If you have any questions regarding this Privacy Policy or how your data is handled, please contact us at:",
        items: [
          "HiVOOC Conservation Travel, K39/21 Thanh Vinh 1, Son Tra, Da Nang.",
          "Email: tourbooking@hivooc.com or dailytour@hivooc.com.",
          "Phone: (+84) 835 949 222 or (+84) 813 949 222.",
        ],
      },
    ],
  },
  vi: {
    title: "Chính sách bảo mật",
    intro:
      "Tại HiVOOC, chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của khách. Chính sách này trình bày cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi bạn truy cập website www.hivooc.com hoặc đặt một chuyến trải nghiệm cùng chúng tôi.",
    sections: [
      {
        title: "Thông tin chúng tôi thu thập",
        intro:
          "Để cung cấp các tour thiên nhiên hoang dã chuyên biệt và trải nghiệm bảo tồn, chúng tôi thu thập các nhóm thông tin sau:",
        items: [
          "Dữ liệu định danh: Họ tên, giới tính, ngày sinh và quốc tịch.",
          "Dữ liệu liên hệ: Địa chỉ email, số điện thoại và địa chỉ cư trú.",
          "Dữ liệu hậu cần: Thông tin hộ chiếu cần thiết cho giấy phép vào khu bảo tồn hạn chế, lịch bay và địa điểm đón tại khách sạn.",
          "Dữ liệu sức khỏe và ăn uống: Thông tin về thể lực, tình trạng y tế hoặc hạn chế ăn uống nhằm bảo đảm an toàn cho bạn trong quá trình đi rừng.",
          "Dữ liệu kỹ thuật: Địa chỉ IP, loại trình duyệt và hành vi sử dụng website thông qua cookie.",
        ],
      },
      {
        title: "Cách chúng tôi sử dụng thông tin",
        intro: "Chúng tôi chỉ sử dụng dữ liệu của bạn cho các mục đích sau:",
        items: [
          "Vận hành tour: Xử lý đặt tour, xin giấy phép từ các Ban quản lý như Sơn Trà hoặc Cát Bà, và sắp xếp phương tiện.",
          "Cá nhân hóa: Điều chỉnh chuyến đi theo mối quan tâm của bạn, chẳng hạn như quan sát chim hoặc nhiếp ảnh chuyên nghiệp.",
          "An toàn: Giúp các Chuyên gia Thiên nhiên Hoang dã của chúng tôi nắm rõ các yêu cầu sức khỏe trong hoạt động thực địa.",
          "Liên lạc: Gửi cập nhật chuyến đi, hướng dẫn an toàn và, khi có sự đồng ý của bạn, bản tin về các dự án bảo tồn.",
        ],
      },
      {
        title: "Chia sẻ dữ liệu và bên thứ ba",
        intro:
          "Chúng tôi không bán hoặc cho thuê dữ liệu của bạn. Chúng tôi chỉ chia sẻ thông tin cần thiết với:",
        items: [
          "Đối tác vận hành: Khách sạn, đơn vị thuyền địa phương và nhà cung cấp vận chuyển.",
          "Cơ quan có thẩm quyền: Ban quản lý khu bảo tồn thiên nhiên và cơ quan chính quyền địa phương cho các giấy phép bắt buộc.",
          "Dịch vụ khẩn cấp: Đơn vị y tế trong trường hợp có chấn thương hoặc sự cố sức khỏe.",
        ],
      },
      {
        title: "Bảo mật dữ liệu",
        items: [
          "Chúng tôi áp dụng các biện pháp bảo mật theo tiêu chuẩn ngành để bảo vệ dữ liệu khỏi truy cập trái phép, thất lạc hoặc thay đổi.",
          "Quyền truy cập dữ liệu cá nhân chỉ giới hạn cho nhân sự HiVOOC được ủy quyền và cần thông tin đó cho mục đích vận hành.",
        ],
      },
      {
        title: "Hình ảnh và ghi hình",
        intro:
          "Trong các tour, nhân sự HiVOOC có thể chụp ảnh hoặc quay video cho mục đích truyền thông.",
        items: [
          "Nếu bạn không muốn xuất hiện trong tư liệu truyền thông, vui lòng thông báo cho chúng tôi qua tourbooking@hivooc.com hoặc dailytour@hivooc.com trước chuyến đi.",
          "Chúng tôi tôn trọng quyền riêng tư của bạn và sẽ làm mờ hoặc gỡ bỏ hình ảnh khi có yêu cầu hợp lệ.",
        ],
      },
      {
        title: "Quyền pháp lý của bạn",
        intro: "Theo các quy định bảo vệ dữ liệu hiện hành, bạn có quyền:",
        items: [
          "Yêu cầu truy cập dữ liệu cá nhân mà chúng tôi đang lưu giữ về bạn.",
          "Yêu cầu chỉnh sửa thông tin không chính xác.",
          "Yêu cầu xóa dữ liệu sau khi chuyến đi của bạn hoàn tất.",
          "Rút lại sự đồng ý nhận thông tin tiếp thị bất kỳ lúc nào.",
        ],
      },
      {
        title: "Liên hệ",
        intro:
          "Nếu bạn có câu hỏi về Chính sách bảo mật này hoặc cách dữ liệu của bạn được xử lý, vui lòng liên hệ:",
        items: [
          "HiVOOC Conservation Travel, K39/21 Thanh Vinh 1, Sơn Trà, Đà Nẵng.",
          "Email: tourbooking@hivooc.com hoặc dailytour@hivooc.com.",
          "Điện thoại: (+84) 835 949 222 hoặc (+84) 813 949 222.",
        ],
      },
    ],
  },
} satisfies Record<
  "en" | "vi",
  {
    title: string;
    subtitle?: string;
    intro: string;
    sections: PolicySection[];
  }
>;

function PolicyBody({
  intro,
  sections,
}: {
  intro: string;
  sections: PolicySection[];
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

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const pageContent = locale === "vi" ? content.vi : content.en;

  return (
    <main className="w-full">
      <Hero title={pageContent.title} subtitle={""} />
      <PolicyBody intro={pageContent.intro} sections={pageContent.sections} />
    </main>
  );
}
