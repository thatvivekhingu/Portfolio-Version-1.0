import React from "react";

interface SectionHeadingProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const headingIconClass = "h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground";

export function SectionHeading({ icon, children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex items-center justify-center mb-8 ${className}`}>
      <span className="mr-2 text-secondary-foreground">{icon}</span>
      <span className="text-xl sm:text-2xl font-bold text-secondary-foreground">{children}</span>
    </div>
  );
}