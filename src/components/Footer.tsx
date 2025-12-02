import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-branding-green text-white font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                unoptimized
                src="/logo.png"
                alt="HIVOOC Logo"
                width={400}
                height={400}
                className="w-40 h-40 object-contain"
              />
              <div>
                <p className="text-xs sm:text-sm italic font-dancing-script text-white/90">
                  Wildlife Tourism For Conservation
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base mb-3 text-white/90">
              {t("description")}
            </p>
            <p className="text-sm text-white/80">{t("mission")}</p>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl mb-4 sm:mb-6">{t("explore")}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/experiences"
                  className="text-sm sm:text-base text-white/80 hover:text-white transition-colors"
                >
                  {t("allExperiences")}
                </Link>
              </li>
              <li>
                <Link
                  href="/conservation"
                  className="text-sm sm:text-base font-light text-white/80 hover:text-white transition-colors"
                >
                  {t("conservation")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm sm:text-base font-light text-white/80 hover:text-white transition-colors"
                >
                  {t("ourGuides")}
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-tips"
                  className="text-sm sm:text-base text-white/80 hover:text-white transition-colors"
                >
                  {t("travelTips")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              {t("contact")}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-white/80">
                  {t("address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <a
                  href="mailto:tourbooking@hivooc.com"
                  className="text-sm sm:text-base text-white/80 hover:text-white transition-colors"
                >
                  {t("email")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <a
                  href="tel:0813949222"
                  className="text-sm sm:text-base text-white/80 hover:text-white transition-colors"
                >
                  {t("phone")}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://facebook.com/hivooc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://instagram.com/hivooc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70 text-center sm:text-left">
              {t("copyright")}
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {t("termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
