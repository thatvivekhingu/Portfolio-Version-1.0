"use client";

import React from "react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { IconCpu, IconBrain, IconDatabase, IconServer, IconSparkles, IconRobot } from "@tabler/icons-react";

export default function SkillsStack() {
  const domains = [
    {
      title: "Agentic AI & Orchestration Frameworks",
      icon: <IconRobot className="h-6 w-6 text-indigo-400" />,
      description: "Building autonomous AI agents, multi-agent workflows with LangGraph, LangChain pipelines, and RAG architectures.",
      proficiency: 96,
      color: "from-indigo-500 to-purple-500",
      skills: ["Agentic AI", "LangGraph", "LangChain", "RAG", "LLMs", "Prompt Engineering", "Vector DBs"],
    },
    {
      title: "Machine Learning & Computer Vision",
      icon: <IconBrain className="h-6 w-6 text-amber-400" />,
      description: "Hands-on expertise building ML classification, regression models from scratch, NLP tokenization, and CV object detection.",
      proficiency: 93,
      color: "from-amber-500 to-orange-500",
      skills: ["Scikit-learn", "NLP", "Computer Vision (CV)", "Classification", "Regression", "KNN", "Decision Trees", "Naive Bayes"],
    },
    {
      title: "Data Science & Analytics",
      icon: <IconDatabase className="h-6 w-6 text-cyan-400" />,
      description: "Exploratory data analysis, data cleaning pipelines, numerical computing, and vector search algorithms.",
      proficiency: 90,
      color: "from-cyan-500 to-blue-500",
      skills: ["NumPy", "Pandas", "EDA", "Data Cleaning", "Data Preprocessing", "Cosine Similarity"],
    },
    {
      title: "Full-Stack AI Web Architecture",
      icon: <IconServer className="h-6 w-6 text-emerald-400" />,
      description: "Building production REST backends, reactive UI platforms, and Docker containerized web applications.",
      proficiency: 88,
      color: "from-emerald-500 to-teal-500",
      skills: ["Python", "Flask", "Node.js", "Express.js", "React", "Docker", "Git", "REST APIs"],
    },
  ];

  return (
    <div className="flex flex-col space-y-8" id="skills">
      <SectionHeading icon={<IconCpu className={headingIconClass} />}>
        AI & ML Engineering Stack
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {domains.map((domain, index) => (
          <BlurFade key={domain.title} delay={0.05 * index} inView>
            <div className="group relative flex flex-col justify-between h-full p-6 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-secondary/80 border border-border/40">
                      {domain.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {domain.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground flex items-center gap-1">
                    <IconSparkles className="h-3.5 w-3.5 text-amber-400" />
                    {domain.proficiency}%
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {domain.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-secondary/60 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${domain.color} transition-all duration-500`}
                    style={{ width: `${domain.proficiency}%` }}
                  />
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {domain.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-[11px] px-2 py-0.5 font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
