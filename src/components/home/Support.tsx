import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export default function Support() {
  const t = useTranslations("Support");

  return (
    <section className="w-full bg-branding-orange py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-white mb-3 md:mb-4">{t("title")}</h2>
            <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
              {t("description")}
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center lg:justify-start">
            <Button
              variant="outline-green"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-branding-orange"
            >
              {t("browseProgram")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
