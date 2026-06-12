import Hero from "@/components/our-story/Hero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type PolicySection = {
  title: string;
  intro?: string;
  items: string[];
  note?: string;
};

const content = {
  en: {
    title: "Terms of Service",
    sections: [
      {
        title: "Booking Policy",
        items: [
          "Bookings for the next day's tour must be confirmed before 18:00 (6:00 PM) to ensure at least 12 hours for operational preparation.",
          "For example, a tour departing on March 9 must be confirmed before 18:00 on March 8.",
          "Bookings made after 18:00 may be moved to the afternoon departure, if available.",
          "A booking is valid only when all service details are agreed upon by both parties, the deposit or payment has been completed, and a Booking Confirmation has been issued.",
          "If a booking confirmation has been sent but payment is not completed within the required time, the reservation will not be held.",
        ],
      },
      {
        title: "Payment Responsibility",
        items: [
          "If a bank transfer has technical issues, guests are responsible for completing payment at least 3 days before the tour date to secure the booking.",
          "The organizer cannot guarantee the reservation without confirmed payment.",
        ],
      },
      {
        title: "Deposit Policy",
        intro:
          "To ensure fairness and proper operational planning, deposits are required as follows:",
        items: [
          "Over 30 days notice: 50% deposit of total tour value.",
          "30 to 07 days notice: 70% deposit of total tour value.",
          "Less than 03 days notice: 100% full payment required.",
        ],
        note: "Reservations are held only in proportion to the actual payment amount completed.",
      },
      {
        title: "Payment Methods",
        intro: "Guests can choose one of the following methods:",
        items: [
          "Cash Payment: Guests will receive a payment receipt with the booking code.",
          "Bank Transfer: The booking code must be included in the transfer note. The booking is confirmed only after the payment is received.",
          "Card Payment (POS): Bank service fees may apply. The payment receipt will include the booking code.",
        ],
      },
      {
        title: "Cancellation & Refund Policy",
        items: [
          "Cancellation time is calculated based on the tour departure time.",
          "Cancel 72 hours before departure: 70% of the deposit will be charged.",
          "Cancel 24 hours before departure: 100% of the deposit will be charged.",
        ],
        note: "Cancellations within 24 hours or a no-show will result in a 100% charge of the total amount paid. Refunds, if applicable, will be processed using the original payment method for accounting transparency.",
      },
      {
        title: "Participant Replacement Policy",
        items: [
          "Guests may transfer their tour seat to another person.",
          "The change must be notified at least 24 hours before departure.",
          "Full personal information of the replacement guest is required to complete travel insurance procedures.",
        ],
        note: "Invoices can only be issued under the original booking name. Replacement guests cannot request a new invoice under a different name. If the change is not notified within the required time, the organizer may refuse the request and treat it as a tour cancellation.",
      },
    ],
  },
  vi: {
    title: "Điều khoản sử dụng",
    sections: [
      {
        title: "Chính sách đặt tour",
        items: [
          "Các đặt tour cho ngày hôm sau phải được xác nhận trước 18:00 để bảo đảm tối thiểu 12 giờ chuẩn bị vận hành.",
          "Ví dụ: tour khởi hành ngày 9 tháng 3 cần được xác nhận trước 18:00 ngày 8 tháng 3.",
          "Các đặt tour sau 18:00 có thể được chuyển sang chuyến khởi hành buổi chiều nếu còn chỗ.",
          "Một đặt tour chỉ được xem là hợp lệ khi hai bên đã thống nhất toàn bộ chi tiết dịch vụ, khoản đặt cọc hoặc thanh toán đã hoàn tất, và Xác nhận đặt tour đã được phát hành.",
          "Nếu xác nhận đặt tour đã được gửi nhưng khách chưa hoàn tất thanh toán trong thời hạn yêu cầu, chỗ đặt sẽ không được giữ.",
        ],
      },
      {
        title: "Trách nhiệm thanh toán",
        items: [
          "Nếu chuyển khoản ngân hàng gặp sự cố kỹ thuật, khách có trách nhiệm hoàn tất thanh toán ít nhất 3 ngày trước ngày tour để bảo đảm đặt chỗ.",
          "Đơn vị tổ chức không thể bảo đảm đặt chỗ nếu chưa có thanh toán được xác nhận.",
        ],
      },
      {
        title: "Chính sách đặt cọc",
        intro:
          "Để bảo đảm sự công bằng và công tác vận hành phù hợp, mức đặt cọc được áp dụng như sau:",
        items: [
          "Thông báo trước hơn 30 ngày: đặt cọc 50% tổng giá trị tour.",
          "Thông báo trước từ 30 đến 07 ngày: đặt cọc 70% tổng giá trị tour.",
          "Thông báo trước dưới 03 ngày: yêu cầu thanh toán 100%.",
        ],
        note: "Chỗ đặt chỉ được giữ tương ứng với số tiền thực tế đã thanh toán.",
      },
      {
        title: "Phương thức thanh toán",
        intro: "Khách có thể chọn một trong các phương thức sau:",
        items: [
          "Thanh toán tiền mặt: Khách sẽ nhận phiếu thu có mã đặt tour.",
          "Chuyển khoản ngân hàng: Mã đặt tour phải được ghi trong nội dung chuyển khoản. Đặt tour chỉ được xác nhận sau khi khoản thanh toán được nhận.",
          "Thanh toán thẻ (POS): Có thể phát sinh phí dịch vụ ngân hàng. Phiếu thanh toán sẽ bao gồm mã đặt tour.",
        ],
      },
      {
        title: "Chính sách hủy và hoàn tiền",
        items: [
          "Thời điểm hủy tour được tính dựa trên giờ khởi hành của tour.",
          "Hủy trước 72 giờ so với giờ khởi hành: thu 70% tiền đặt cọc.",
          "Hủy trước 24 giờ so với giờ khởi hành: thu 100% tiền đặt cọc.",
        ],
        note: "Hủy trong vòng 24 giờ hoặc không có mặt sẽ bị thu 100% tổng số tiền đã thanh toán. Khoản hoàn tiền, nếu có, sẽ được xử lý qua phương thức thanh toán ban đầu để bảo đảm minh bạch kế toán.",
      },
      {
        title: "Chính sách thay thế người tham gia",
        items: [
          "Khách có thể chuyển chỗ tham gia tour cho người khác.",
          "Việc thay đổi phải được thông báo ít nhất 24 giờ trước giờ khởi hành.",
          "Cần cung cấp đầy đủ thông tin cá nhân của khách thay thế để hoàn tất thủ tục bảo hiểm du lịch.",
        ],
        note: "Hóa đơn chỉ có thể được xuất theo tên đặt tour ban đầu. Khách thay thế không thể yêu cầu xuất hóa đơn mới dưới tên khác. Nếu thay đổi không được thông báo trong thời hạn yêu cầu, đơn vị tổ chức có thể từ chối yêu cầu và xử lý như trường hợp hủy tour.",
      },
    ],
  },
} satisfies Record<
  "en" | "vi",
  {
    title: string;
    subtitle?: string;
    sections: PolicySection[];
  }
>;

function PolicyBody({ sections }: { sections: PolicySection[] }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              {section.note && (
                <p className="mt-5 text-lg leading-8 text-black/75">
                  {section.note}
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { locale } = await params;
  const pageContent = locale === "vi" ? content.vi : content.en;

  return (
    <main className="w-full">
      <Hero title={pageContent.title} subtitle={""} />
      <PolicyBody sections={pageContent.sections} />
    </main>
  );
}
