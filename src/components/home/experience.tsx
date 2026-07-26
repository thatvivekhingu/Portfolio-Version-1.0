"use client";

import { TracingBeam } from "../ui/tracing-beam"
import Image from "next/image";
import { data } from "@/data/data"
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconSchool } from "@tabler/icons-react"
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

export default function Experience() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconSchool className={headingIconClass} />}>
        Education & Background
      </SectionHeading>
      <TracingBeam>
        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <BlurFade key={`${item.company}-${item.role}-${index}`} delay={0.10 + index * .05} direction="right" inView>
              <ExperienceItem
                image={item.image}
                company={item.company}
                role={item.role}
                date={item.date}
                description={item.description}
                location={item.location}
                skills={item.skills}
                href={item.href}
              />
            </BlurFade>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}

interface ExperienceItemProps {
  image: string;
  company: string;
  role: string;
  date: string;
  description?: string;
  location: string;
  skills: string[];
  href?: string;
}

export const ExperienceItem = ({
  image,
  company,
  role,
  date,
  description = "",
  location,
  skills,
  href,
}: ExperienceItemProps) => {
  const logo = (
    <Image
      src={image}
      width={100}
      height={100}
      alt={`${company} logo`}
      priority
      className="h-8 w-8 rounded-sm sm:h-10 sm:w-10 sm:rounded-md mt-1"
    />
  );

  return (
    <div className="group/glow relative overflow-hidden p-4 border rounded-xl sm:rounded-lg bg-background transition-all duration-400">
      <SpotlightGlow />
      <div className="flex flex-row space-x-2">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${company} website`}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            {logo}
          </a>
        ) : (
          logo
        )}
        <div className="flex flex-col mb-2">
          <p className="font-bold tracking-tight leading-normal text-balance text-sm sm:text-base text-primary">
            {role}
            <span className="mx-1"> • </span>
            {company}
          </p>
          <p className=" text-balance leading-none tracking-tight text-xs md:text-sm font-normal text-muted-foreground ">
            {date}
            <span className="mx-0.5"> • </span>
            {location}
          </p>
        </div>
      </div>
      {description && (
        <p className="text-left mt-2 text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-4 flex flex-row flex-wrap gap-y-2 gap-x-2">
        {skills.map((skill, index) => (
          <BlurFade key={`${skill}-${index}`} delay={0.05 + index * 0.05} direction="up" inView>
            <div className="flex items-center justify-center bg-secondary transition-colors px-2 py-1 rounded-sm">
              <p className="leading-none tracking-tight text-xs md:text-sm font-semibold transition-colors text-zinc-700 dark:text-slate-200 ">
                {skill}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};