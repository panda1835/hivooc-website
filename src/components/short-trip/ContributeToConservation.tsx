import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import TailorMyTripButton from "../TailorMyTripButton";

export default function ContributeToConservation() {
  const t = useTranslations("ContributeToConservation");

  return (
    <section className="w-full bg-branding-green py-12 md:py-10 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col  justify-between gap-2">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-white mb-3 md:mb-4">{t("title")}</h2>
            <p className="text-white text-base font-[Inter] mb-6 md:mb-6  mx-auto lg:mx-0">
              {t("description")}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center lg:justify-start">
            <Button
              variant="outline-green"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-branding-green"
            >
              {t("learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
