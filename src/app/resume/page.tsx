"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconDownload,
  IconPrinter,
  IconExternalLink,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconMapPin,
  IconAward,
  IconBook,
  IconCode,
  IconCpu,
  IconSparkles,
  IconArrowLeft,
  IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import { playTapSound } from "@/lib/sound";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<"interactive" | "document">("interactive");
  const [copied, setCopied] = useState(false);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  const handleCopyEmail = () => {
    playTapSound("chime");
    navigator.clipboard.writeText("hinguvivek05@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    playTapSound("pop");
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Vivek_Hingu_Resume.pdf";
    link.click();
  };

  const handlePrint = () => {
    playTapSound("pop");
    window.print();
  };

  const skillsData = [
    {
      category: "Programming Languages",
      skills: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
      color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400",
    },
    {
      category: "Frameworks & Libraries",
      skills: ["Scikit-learn", "TensorFlow", "PyTorch", "NumPy", "Pandas", "Matplotlib", "FastAPI", "Flask", "React", "Next.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "LangChain"],
      color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400",
    },
    {
      category: "Generative AI & LLMs",
      skills: ["OpenAI API", "Gemini API", "Grok API", "RAG", "LLM", "Prompt Engineering", "Embeddings", "Vector Databases"],
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-500 dark:text-amber-400",
    },
    {
      category: "Databases & Tools",
      skills: ["SQLite", "ChromaDB", "Git", "GitHub", "VS Code", "Jupyter Notebook"],
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    },
    {
      category: "Core AI Concepts",
      skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Classification", "Regression", "Feature Engineering", "Model Evaluation"],
      color: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400",
    },
  ];

  const projects = [
    {
      title: "AI Startup Success Predictor",
      tech: ["Python", "FastAPI", "React", "Scikit-learn", "SQLite", "Tailwind CSS"],
      points: [
        "Developed an AI-powered platform that predicts startup success using Machine Learning classification models.",
        "Implemented authentication, analytics dashboard, CSV-based bulk prediction, and business intelligence features.",
        "Built REST APIs using FastAPI and integrated an interactive React dashboard for real-time insights.",
        "Evaluated multiple ML models, including Random Forest and Extra Trees, to improve prediction accuracy.",
      ],
      link: "https://github.com/thatvivekhingu/Ai_Startup_Success_Predictor",
    },
    {
      title: "BharatBhasha AI",
      tech: ["Grok API", "HTML", "CSS", "JavaScript", "Node.js", "Express.js", "NLP"],
      points: [
        "Developed an AI-powered multilingual communication platform supporting text and voice interactions across multiple Indian languages.",
        "Integrated Grok API to generate context-aware multilingual responses using NLP, improving communication accessibility.",
        "Built a scalable backend using Node.js and Express.js to support real-time AI-powered conversations.",
      ],
      link: "https://github.com/thatvivekhingu/Bharat-Bhasha-Ai-2.0",
    },
    {
      title: "Reverse Recipe Engine with Local Flavor",
      tech: ["Python", "Flask", "Gemini API", "HTML", "CSS", "JavaScript", "Unsplash API"],
      points: [
        "Developed an AI-powered application that generates regional recipes from user-provided ingredients.",
        "Integrated Gemini API with prompt engineering to deliver personalized recipe recommendations and cooking instructions.",
        "Leveraged the Unsplash API to enhance recipe visualization and improve overall user experience.",
        "Achieved Top 10 Finalist recognition at AIT Hackathon 2K25 among competing teams.",
      ],
      link: "https://github.com/thatvivekhingu/Recipe-Recommender-system-",
    },
  ];

  const achievements = [
    { title: "2nd Place", desc: "Flinders University AI Competition, Ahmedabad — AUD 300 Cash Prize" },
    { title: "Top 10 Finalist", desc: "AIT Hackathon 2K25 (Reverse Recipe Engine)" },
    { title: "1st Prize", desc: "Robo Soccer Competition — Autonomous Robotic Solution" },
    { title: "Google Cloud Arcade Champion 2025", desc: "Cloud Computing & Generative AI Challenges" },
  ];

  const certs = [
    { title: "Machine Learning Certification (Elite)", issuer: "NPTEL", date: "2026" },
    { title: "Build a Retrieval-Augmented Generation (RAG) Chatbot", issuer: "LetsUpgrade", date: "2025" },
    { title: "Data Analysis with Python Professional Certification", issuer: "freeCodeCamp", date: "2025" },
    { title: "Python for Data Science, AI & Development", issuer: "IBM SkillsBuild", date: "2025" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6">
      {/* Top Floating Control Bar */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-xl">
        <Link
          href="/"
          onClick={() => playTapSound("pop")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/40 text-xs font-semibold">
          <button
            onClick={() => {
              playTapSound("pop");
              setActiveTab("interactive");
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "interactive"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ✨ Interactive View
          </button>
          <button
            onClick={() => {
              playTapSound("pop");
              setActiveTab("document");
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "document"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📄 Paper Document
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-background/60 hover:bg-muted text-xs font-semibold transition-colors"
            title="Print Resume"
          >
            <IconPrinter className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <IconDownload className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {activeTab === "interactive" ? (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-background to-indigo-950/20 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase">
                    <IconCpu className="h-3.5 w-3.5" />
                    AI / ML Engineer & Full-Stack Developer
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    VIVEK HINGU
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    AI/ML Engineering student with expertise in Python, Machine Learning, FastAPI, React, and Generative AI. Experienced in building end-to-end AI applications powered by LLMs, RAG, and NLP, with a strong focus on scalable backend systems and practical real-world solutions.
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0 text-xs font-medium">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-background/60 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {copied ? <IconCheck className="h-4 w-4 text-emerald-400" /> : <IconMail className="h-4 w-4 text-cyan-400" />}
                    <span>{copied ? "Copied Email!" : "hinguvivek05@gmail.com"}</span>
                  </button>

                  <a
                    href="https://linkedin.com/in/vivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-background/60 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <IconBrandLinkedin className="h-4 w-4 text-blue-400" />
                    <span>LinkedIn / vivekhingu</span>
                  </a>

                  <a
                    href="https://github.com/thatvivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-background/60 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <IconBrandGithub className="h-4 w-4 text-purple-400" />
                    <span>GitHub / thatvivekhingu</span>
                  </a>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-background/40 text-muted-foreground">
                    <IconMapPin className="h-4 w-4 text-amber-500" />
                    <span>Ahmedabad, Gujarat, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Highlight Card */}
            <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <IconBook className="h-5 w-5 text-cyan-400" />
                    <h2 className="text-lg font-bold text-foreground">SAL College of Engineering, Ahmedabad</h2>
                  </div>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    Bachelor of Engineering – Information Technology
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Relevant Coursework: Machine Learning, AI, Data Science, DBMS, Computer Networks, Operating Systems
                  </p>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end gap-1 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    CGPA: 8.61 / 10
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">2023 – 2027</span>
                </div>
              </div>
            </div>

            {/* Interactive Technical Skills Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <IconCode className="h-5 w-5 text-indigo-400" />
                  Technical Skills & Competencies
                </h2>
                {activeSkillFilter && (
                  <button
                    onClick={() => setActiveSkillFilter(null)}
                    className="text-xs font-medium text-cyan-400 hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData.map((group) => (
                  <div
                    key={group.category}
                    className={`p-5 rounded-2xl border bg-gradient-to-br backdrop-blur-xl space-y-3 transition-all ${group.color}`}
                  >
                    <h3 className="text-xs font-extrabold tracking-wider uppercase opacity-90">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => {
                            playTapSound("pop");
                            setActiveSkillFilter(activeSkillFilter === skill ? null : skill);
                          }}
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                            activeSkillFilter === skill
                              ? "bg-foreground text-background font-bold scale-105"
                              : "bg-background/80 hover:bg-background text-foreground border border-border/40"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <IconSparkles className="h-5 w-5 text-amber-500" />
                Key Featured Projects
              </h2>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.title}
                    className="group rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-lg hover:border-cyan-500/50 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                        {proj.title}
                      </h3>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
                      >
                        <span>GitHub Repository</span>
                        <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted/80 text-muted-foreground border border-border/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground list-disc list-inside leading-relaxed pt-1">
                      {proj.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Certifications Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Achievements */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 backdrop-blur-xl p-6 space-y-4 shadow-lg">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <IconAward className="h-5 w-5 text-amber-500" />
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((ach) => (
                    <div key={ach.title} className="p-3 rounded-xl border border-amber-500/20 bg-background/60 space-y-0.5">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">{ach.title}</p>
                      <p className="text-xs text-muted-foreground">{ach.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/10 backdrop-blur-xl p-6 space-y-4 shadow-lg">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <IconBook className="h-5 w-5 text-indigo-400" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certs.map((c) => (
                    <div key={c.title} className="p-3 rounded-xl border border-indigo-500/20 bg-background/60 flex items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-foreground">{c.title}</p>
                        <p className="text-[11px] text-indigo-400 font-semibold">{c.issuer}</p>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground shrink-0">{c.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Document Sheet View Mode */
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground">
              <span>Original Document View (High Quality PDF Render)</span>
              <button
                onClick={handleDownload}
                className="text-cyan-400 hover:underline font-semibold flex items-center gap-1"
              >
                <IconDownload className="h-3.5 w-3.5" />
                <span>Save Original PDF</span>
              </button>
            </div>

            <div className="relative w-full rounded-2xl border border-border/60 bg-white p-2 sm:p-6 shadow-2xl overflow-hidden flex justify-center">
              <Image
                src="/resume.png"
                alt="Vivek Hingu Resume Document"
                width={850}
                height={1100}
                className="w-full max-w-3xl h-auto object-contain rounded shadow-lg border border-zinc-200"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
