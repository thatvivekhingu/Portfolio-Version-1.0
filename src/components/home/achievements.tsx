"use client";

import React, { useState } from "react";
import Image from "next/image";
import { data } from "@/data/data";
import { IconAward, IconCertificate, IconExternalLink, IconMaximize } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { PhotoLightbox, PhotoLightboxItem } from "@/components/ui/photo-lightbox";
import { Marquee } from "@/components/ui/marquee";
import { playTapSound } from "@/lib/sound";

export default function Achievements() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoLightboxItem | null>(null);

  const handleOpenPhoto = (item: PhotoLightboxItem) => {
    playTapSound("chime");
    setSelectedPhoto(item);
  };

  return (
    <div className="flex flex-col space-y-12">
      {/* Section Heading */}
      <SectionHeading icon={<IconAward className={headingIconClass} />}>
        Certificates & Achievements
      </SectionHeading>

      {/* Key Achievements — 1 Row 4 Columns Continuous Marquee Scroll (Left to Right) */}
      <div className="space-y-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconAward className="h-5 w-5 text-amber-500" />
            Key Achievements & Recognition
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Continuous 4-Column Scroll • Hover to pause & view
          </span>
        </div>

        <Marquee pauseOnHover repeat={4} reverse={true} className="[--duration:35s] py-3">
          {data.achievements.map((item) => (
            <div
              key={item.title}
              className="w-80 sm:w-96 shrink-0 group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-background/70 backdrop-blur-md transition-all duration-500 hover:border-amber-500/80 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.03]"
            >
              {/* Photo Preview Container */}
              {item.image && (
                <div
                  className="relative w-full h-56 sm:h-64 overflow-hidden border-b border-border/40 bg-zinc-950/90 cursor-pointer"
                  onClick={() =>
                    handleOpenPhoto({
                      src: item.image!,
                      alt: item.title,
                      title: item.title,
                      subtitle: item.category,
                      description: item.description,
                      metrics: item.metrics,
                      link: item.link,
                    })
                  }
                >
                  {/* Soft Blurred Background Image */}
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover blur-xl scale-110 opacity-45 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Uncropped Foreground Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 z-10"
                    sizes="384px"
                  />

                  {/* Gradient Overlay & Zoom Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 z-20" />

                  <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 text-amber-400 text-xs font-medium backdrop-blur-md border border-amber-500/40">
                      <IconMaximize className="h-3.5 w-3.5" />
                      <span>Full Photo</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-sm text-black">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-zinc-200 tabular-nums">
                      {item.date}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-bold tracking-tight text-foreground group-hover:text-amber-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                  {item.metrics ? (
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      ✨ {item.metrics}
                    </span>
                  ) : <span />}

                  <div className="flex items-center gap-3">
                    {item.image && (
                      <button
                        onClick={() =>
                          handleOpenPhoto({
                            src: item.image!,
                            alt: item.title,
                            title: item.title,
                            subtitle: item.category,
                            description: item.description,
                            metrics: item.metrics,
                            link: item.link,
                          })
                        }
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-amber-400 transition-colors"
                      >
                        <IconMaximize className="h-3.5 w-3.5" />
                        <span>Enlarge</span>
                      </button>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors"
                      >
                        <span>Details</span>
                        <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Certifications — Continuous Infinite Marquee Scroll (Left to Right) */}
      <div className="space-y-6 pt-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconCertificate className="h-5 w-5 text-indigo-500" />
            Certifications & Specializations
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Continuous scroll • Hover or touch to pause
          </span>
        </div>

        <Marquee pauseOnHover repeat={4} reverse={false} className="[--duration:28s] py-3">
          {data.certificates.map((cert) => (
            <CertFlipCard key={cert.title} cert={cert} handleOpenPhoto={handleOpenPhoto} />
          ))}
        </Marquee>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}

function CertFlipCard({
  cert,
  handleOpenPhoto,
}: {
  cert: (typeof data.certificates)[number];
  handleOpenPhoto: (item: PhotoLightboxItem) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-72 sm:w-80 h-[340px] shrink-0 group perspective-1000 select-none cursor-pointer"
      onClick={() => {
        playTapSound("pop");
        setIsFlipped((prev) => !prev);
      }}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-indigo-500/30 bg-background/80 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-xl hover:border-indigo-500/80 hover:shadow-indigo-500/20 transition-all duration-300">
          <div className="relative w-full h-48 overflow-hidden bg-zinc-950/90 border-b border-border/40">
            <Image
              src={cert.image}
              alt=""
              fill
              className="object-cover blur-xl scale-110 opacity-45 pointer-events-none"
              aria-hidden="true"
            />
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 z-10"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 z-20" />
            <div className="absolute top-3 right-3 z-30">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 text-indigo-400 text-xs font-semibold backdrop-blur-md border border-indigo-500/40">
                <span>3D Flip Card ↻</span>
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between text-white">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-600/90 text-white">
                {cert.issuer}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-black/80 text-zinc-200 tabular-nums">
                {cert.date}
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
            <h4 className="text-base font-bold tracking-tight text-foreground group-hover:text-indigo-400 transition-colors line-clamp-2">
              {cert.title}
            </h4>
            <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-indigo-400 font-semibold">
              <span className="flex items-center gap-1">
                <span>Click / Tap to flip</span> ↻
              </span>
              <span className="text-muted-foreground font-normal">Interactive</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-indigo-500/60 bg-zinc-950/95 backdrop-blur-2xl p-5 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">
                {cert.issuer} • {cert.date}
              </span>
              <span className="text-xs text-zinc-400 font-mono">↺ Flip Back</span>
            </div>

            <h4 className="text-base font-bold text-white tracking-tight">
              {cert.title}
            </h4>

            <div className="space-y-1.5 pt-1">
              <p className="text-xs font-semibold text-zinc-300">Skills & Competencies:</p>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-[11px] px-2 py-0.5 bg-indigo-950/60 text-indigo-300 border border-indigo-500/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-500/20 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() =>
                handleOpenPhoto({
                  src: cert.image,
                  alt: `${cert.title} Certificate`,
                  title: cert.title,
                  subtitle: cert.issuer,
                  description: `Issued by ${cert.issuer} (${cert.date}). Skills: ${cert.skills.join(", ")}.`,
                  link: cert.credentialUrl,
                })
              }
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-indigo-300 border border-indigo-500/30 transition-colors"
            >
              <IconMaximize className="h-3.5 w-3.5" />
              <span>Full Photo</span>
            </button>

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors"
              >
                <span>Verify Credential</span>
                <IconExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
