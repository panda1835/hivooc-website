"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PrimateTourPage() {
  /* ---------------------------- COPY PROTECTION ---------------------------- */
  const handleCopy = (e: React.ClipboardEvent) => e.preventDefault();
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleDragStart = (e: React.DragEvent) => e.preventDefault();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const isMac =
      typeof navigator !== "undefined" &&
      navigator.platform.toLowerCase().includes("mac");

    const isCopyCombo =
      (isMac && event.metaKey && event.key.toLowerCase() === "c") ||
      (!isMac && event.ctrlKey && event.key.toLowerCase() === "c");

    if (isCopyCombo) event.preventDefault();
  };

  return (
    <main
      tabIndex={0}
      onCopy={handleCopy}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-6"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <Card className="max-w-3xl w-full border border-slate-200 shadow-sm bg-white">
        <CardContent className="p-8 space-y-8">
          {/* --------------------------- NON-DOWNLOADABLE IMAGE --------------------------- */}
          <div className="relative w-full h-64 overflow-hidden rounded-lg border border-slate-200">
            <Image
              src="/hero/image3.jpg"
              alt="Red-Shanked Douc Langur"
              fill
              draggable={false}
              onDragStart={handleDragStart}
              onContextMenu={(e) => e.preventDefault()}
              className="object-cover w-full h-full pointer-events-none select-none"
              style={{
                WebkitTouchCallout: "none", // disable image save on mobile
              }}
            />

            {/* Transparent overlay to block right-click + long press */}
            <div
              className="absolute inset-0 pointer-events-auto"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

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
              Red-Shanked Douc Langur— one of the world’s most striking
              primates—while learning about conservation efforts in Central
              Vietnam.
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
              <p className="text-xs text-slate-500">Ideal time for sightings</p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-4 space-y-1">
              <p className="text-[0.7rem] uppercase tracking-widest text-slate-500">
                Group Size
              </p>
              <p className="font-medium">Max 10 participants</p>
              <p className="text-xs text-slate-500">Low-impact eco-tour</p>
            </div>
          </section>

          {/* Highlights */}
          <section className="grid gap-8 md:grid-cols-[1.2fr,1fr] text-sm">
            <div className="space-y-3">
              <h2 className="text-base font-semibold">Tour Highlights</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>
                  Observe Red-Shanked Douc Langurs in their natural canopy
                  habitat.
                </li>
                <li>Guided forest walk with trained wildlife spotters.</li>
                <li>
                  Learn about primate ecology, behavior, and conservation
                  challenges.
                </li>
                <li>Explore Sơn Trà’s unique evergreen forest ecosystem.</li>
                <li>Support community-led biodiversity protection efforts.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-semibold">Sample Itinerary</h2>
              <ol className="space-y-1 text-slate-700">
                <li>
                  <span className="font-medium">05:30</span> · Meet at ranger
                  station
                </li>
                <li>
                  <span className="font-medium">06:00</span> · Slow-drive
                  wildlife spotting
                </li>
                <li>
                  <span className="font-medium">07:30</span> · Guided forest
                  walk
                </li>
                <li>
                  <span className="font-medium">09:00</span> · Conservation talk
                </li>
                <li>
                  <span className="font-medium">10:00</span> · End of program
                </li>
              </ol>
            </div>
          </section>

          {/* Inclusions */}
          <section className="grid gap-8 md:grid-cols-2 text-sm">
            <div className="space-y-2">
              <h2 className="text-base font-semibold">What’s Included</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Wildlife guide & binoculars</li>
                <li>Bottled water & snacks</li>
                <li>Environmental education session</li>
                <li>Conservation support fee</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold">Not Included</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Transport to/from Sơn Trà</li>
                <li>Meals beyond snacks</li>
                <li>Travel insurance</li>
              </ul>
            </div>
          </section>

          {/* Notes */}
          <section className="space-y-2 text-xs text-slate-600">
            <h2 className="text-sm font-semibold">Important Notes</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Primate sightings vary with weather and forest conditions.
              </li>
              <li>
                Participants must remain quiet and follow ranger guidance.
              </li>
              <li>Do not feed, approach, or touch wildlife.</li>
              <li>Tours may be modified during sensitive breeding seasons.</li>
            </ul>
          </section>

          {/* CTA */}
          <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-4">
            <p className="text-xs text-slate-500">
              Your participation contributes directly to primate conservation in
              Đà Nẵng.
            </p>
            <Button>Request Availability</Button>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
