"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PrimateTourPage() {
  const handleCopy = (e: React.ClipboardEvent) => e.preventDefault();
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const isMac =
      typeof navigator !== "undefined" &&
      navigator.platform.toLowerCase().includes("mac");
    const copyCombo =
      (isMac && event.metaKey && event.key.toLowerCase() === "c") ||
      (!isMac && event.ctrlKey && event.key.toLowerCase() === "c");
    if (copyCombo) event.preventDefault();
  };

  return (
    <main
      className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-6"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      onCopy={handleCopy}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Card className="max-w-3xl w-full border border-slate-200 shadow-sm bg-white">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <section className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-emerald-600/80">
              Đà Nẵng · Conservation Experience
            </p>

            <h1 className="text-3xl font-semibold">
              Primate Watching Tour – Sơn Trà Peninsula
            </h1>

            <p className="text-sm text-slate-600">
              Explore the lush Sơn Trà Nature Reserve and observe the rare
              Red-Shanked Douc Langur— one of the world’s most beautiful
              primates—while learning about ongoing conservation efforts in
              Central Vietnam.
            </p>
          </section>

          {/* Key info */}
          <section className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-md border border-slate-200 bg-white p-4 space-y-1">
              <p className="text-[0.7rem] uppercase tracking-widest text-slate-500">
                Location
              </p>
              <p className="font-medium">Sơn Trà Peninsula, Đà Nẵng</p>
              <p className="text-xs text-slate-500">
                Protected primate habitat
              </p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-4 space-y-1">
              <p className="text-[0.7rem] uppercase tracking-widest text-slate-500">
                Duration
              </p>
              <p className="font-medium">Half-day · 05:30 – 10:00</p>
              <p className="text-xs text-slate-500">Best time for sightings</p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-4 space-y-1">
              <p className="text-[0.7rem] uppercase tracking-widest text-slate-500">
                Group Size
              </p>
              <p className="font-medium">Max 10 participants</p>
              <p className="text-xs text-slate-500">Low-impact eco-tour</p>
            </div>
          </section>

          {/* Highlights & itinerary */}
          <section className="grid gap-8 md:grid-cols-[1.2fr,1fr] text-sm">
            <div className="space-y-3">
              <h2 className="text-base font-semibold">Tour Highlights</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>
                  View Red-Shanked Douc Langurs in their natural forest canopy.
                </li>
                <li>
                  Learn about the ecology and behaviors of Vietnam’s primate
                  species.
                </li>
                <li>
                  Walk through ancient evergreen forests with experienced
                  guides.
                </li>
                <li>
                  Understand threats such as habitat loss and illegal wildlife
                  trade.
                </li>
                <li>
                  Support community-driven conservation programs in Đà Nẵng.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-semibold">Sample Itinerary</h2>
              <ol className="space-y-1 text-slate-700">
                <li>
                  <span className="font-medium">05:30</span> · Meet at Sơn Trà
                  ranger station
                </li>
                <li>
                  <span className="font-medium">06:00</span> · Begin slow-drive
                  wildlife spotting along the ridge
                </li>
                <li>
                  <span className="font-medium">07:30</span> · Guided forest
                  walk to hidden observation points
                </li>
                <li>
                  <span className="font-medium">09:00</span> · Conservation talk
                  with local experts
                </li>
                <li>
                  <span className="font-medium">10:00</span> · Finish & return
                  to meeting point
                </li>
              </ol>
            </div>
          </section>

          {/* Inclusions */}
          <section className="grid gap-8 md:grid-cols-2 text-sm">
            <div className="space-y-2">
              <h2 className="text-base font-semibold">What’s Included</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Guided tour with trained wildlife spotters</li>
                <li>High-quality binoculars provided</li>
                <li>Environmental education session</li>
                <li>Bottled water & light snacks</li>
                <li>Conservation support fee</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold">Not Included</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Transportation to Sơn Trà</li>
                <li>Meals beyond snacks</li>
                <li>Personal travel insurance</li>
              </ul>
            </div>
          </section>

          {/* Notes */}
          <section className="space-y-2 text-xs text-slate-600">
            <h2 className="text-sm font-semibold">Important Notes</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Primates are wild animals—sightings depend on weather, noise,
                and natural behavior.
              </li>
              <li>
                Participants must remain quiet and follow biodiversity
                protection guidelines.
              </li>
              <li>
                Feeding, approaching, or calling wildlife is strictly
                prohibited.
              </li>
              <li>Tours may be adjusted during sensitive breeding seasons.</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
