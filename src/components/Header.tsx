"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Search, ChevronDown, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import TailorMyTripButton from "@/components/TailorMyTripButton";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLanguageDropdownOpen(false);
  };

  const handleMenuEnter = (menuId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setExpandedMenu(menuId);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setExpandedMenu(null);
    }, 150);
  };

  const menuItems = [
    {
      id: "wildlife-experiences",
      label: t("wildlifeExperiences"),
      items: [],
      columns: [
        {
          title: "",
          items: [
            { label: t("tailorTour"), href: "/tailor-trip", featured: false },
            { label: t("preMadeTour"), href: "/short-trip", featured: true },
          ],
        },
        {
          title: "",
          items: [
            { label: t("shortTour"), href: "/short-trip", featured: true },
            { label: t("dailyTours"), href: "/daily-tours", featured: false },
            {
              label: t("natureEducation"),
              href: "/nature-education",
              featured: false,
            },
          ],
        },
        {
          title: "",
          items: [
            {
              label: t("sonTraTours"),
              href: "/son-tra-tours",
              featured: false,
            },
            {
              label: t("primateTours"),
              href: "/primate-tours",
              featured: true,
            },
            {
              label: t("birdingTours"),
              href: "/birding-tours",
              featured: false,
            },
            {
              label: t("wildlifeTourNorth"),
              href: "/wildlife-tour-north",
              featured: false,
            },
            {
              label: t("wildlifeTourSouth"),
              href: "/wildlife-tour-south",
              featured: false,
            },
          ],
        },
      ],
    },
    {
      id: "conservation-programs",
      label: t("conservationPrograms"),
      href: "/conservation-programs",
      items: [],
      columns: [],
    },
    {
      id: "services",
      label: t("services"),
      href: "/services",
      items: [],
      columns: [],
    },
    {
      id: "archives",
      label: t("archives"),
      href: "/archives",
      items: [],
      columns: [],
    },
    {
      id: "about-us",
      label: t("aboutUs"),
      href: "/our-story",
      items: [],
      columns: [],
    },
    {
      id: "news",
      label: t("news"),
      href: "/news",
      items: [],
      columns: [],
    },
  ];

  const localeNames: Record<string, string> = {
    en: "English",
    vi: "Tiếng Việt",
  };

  return (
    <header className="w-full z-50 shadow-md">
      {/* Top Bar */}
      <div className="w-full bg-branding-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Tagline */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  unoptimized
                  src="/logo.png"
                  alt="HIVOOC Logo"
                  width={150}
                  height={150}
                  className="w-32 h-32 object-contain"
                />
                <p className="hidden md:block text-xs  italic font-dancing-script text-white/90">
                  Wildlife Tourism For Conservation
                </p>
              </Link>
            </div>

            {/* Right Section: Language Switcher, Search, and CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 rounded-[4px] px-3 h-10 py-2 text-xs  text-white hover:bg-white/20 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {localeNames[locale]}
                  </span>
                  <span className="sm:hidden">{locale.toUpperCase()}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      languageDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Language Dropdown Menu */}
                {languageDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setLanguageDropdownOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-[4px] shadow-lg py-1 min-w-[140px] z-20">
                      <button
                        onClick={() => handleLocaleChange("en")}
                        className={`w-full text-left px-4 py-2 font-sans transition-colors ${
                          locale === "en"
                            ? "bg-branding-green/10 text-branding-green font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleLocaleChange("vi")}
                        className={`w-full text-left px-4 py-2 font-sans transition-colors ${
                          locale === "vi"
                            ? "bg-branding-green/10 text-branding-green font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Tiếng Việt
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Search Bar */}
              <div className="hidden lg:flex items-center bg-white/10 rounded-[4px] px-3 py-2 w-64">
                <Search className="w-4 h-4 text-white/70 mr-2" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-white/50  font-sans outline-none w-full"
                />
              </div>

              {/* Tailor My Trip Button */}
              <div className="hidden sm:block">
                <TailorMyTripButton />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className="w-full hidden lg:block relative"
        style={{ backgroundColor: "#EDF2F2" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-16 py-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMenuEnter(item.id)}
                onMouseLeave={handleMenuLeave}
              >
                {item.columns && item.columns.length > 0 ? (
                  <button className="flex items-center gap-1 text-branding-green hover:text-branding-green/80 font-normal  font-sans transition-colors">
                    {item.label}
                    {item.columns && item.columns.length > 0 && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedMenu === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="flex items-center gap-1 text-branding-green hover:text-branding-green/80 font-normal  font-sans transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Full-width dropdown - outside container */}
        {menuItems.map(
          (item) =>
            item.columns &&
            item.columns.length > 0 &&
            expandedMenu === item.id && (
              <div
                key={`dropdown-${item.id}`}
                className="absolute left-0 right-0 top-full bg-white shadow-lg z-50 pt-0"
                style={{ marginTop: "-1px" }}
                onMouseEnter={() => handleMenuEnter(item.id)}
                onMouseLeave={handleMenuLeave}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-3 gap-8">
                    {item.columns.map((column, idx) => (
                      <div key={idx}>
                        {column.title && (
                          <h3 className="font-normal text-branding-green mb-3 font-condensed">
                            {column.title}
                          </h3>
                        )}
                        <ul className="space-y-2">
                          {column.items.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={subItem.href}
                                className="block  font-sans font-normal text-gray-700 hover:text-orange-500 transition-colors"
                              >
                                {/* {subItem.featured && (
                                  <span className="mr-1">—</span>
                                )} */}
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-4">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-gray-900 placeholder-gray-500  font-sans outline-none w-full"
              />
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() =>
                      setExpandedMenu(expandedMenu === item.id ? null : item.id)
                    }
                    className="w-full flex items-center justify-between text-branding-green font-medium  font-sans py-2"
                  >
                    {item.label}
                    {item.columns && item.columns.length > 0 && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedMenu === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile Submenu */}
                  {item.columns &&
                    item.columns.length > 0 &&
                    expandedMenu === item.id && (
                      <div className="pl-4 space-y-2 pb-2">
                        {item.columns.flatMap((column) =>
                          column.items.map((subItem, idx) => (
                            <Link
                              key={idx}
                              href={subItem.href}
                              className={`block  font-sans py-1 ${
                                subItem.featured
                                  ? "text-orange-500 font-medium"
                                  : "text-gray-700"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.featured && "— "}
                              {subItem.label}
                            </Link>
                          )),
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <div className="block sm:hidden mt-4">
              <TailorMyTripButton onClick={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
