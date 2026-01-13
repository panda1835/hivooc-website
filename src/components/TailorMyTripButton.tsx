"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface TailorMyTripButtonProps {
  onClick?: () => void;
}

export default function TailorMyTripButton({ onClick }: TailorMyTripButtonProps) {
  const t = useTranslations("Header");

  return (
    <Link href="/tailor-my-trip-form" onClick={onClick}>
      <Button variant="orange" size="lg" className="group font-sans cursor-pointer">
        {t("tailorMyTrip")}
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  );
}
