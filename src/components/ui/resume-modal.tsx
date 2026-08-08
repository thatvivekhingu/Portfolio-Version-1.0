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
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { playTapSound } from "@/lib/sound";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "document">("interactive");
  const [copied, setCopied] = useState(false);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  if (!isOpen) return null;

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
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-background/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-muted"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <IconCpu className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                  VIVEK HINGU — RESUME
                </h2>
                <p className="text-xs text-muted-foreground">AI/ML Engineer & Full-Stack Developer</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-background/60 hover:bg-muted text-xs font-semibold transition-colors"
              >
                <IconPrinter className="h-4 w-4" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all hover:scale-105 active:scale-95"
              >
                <IconDownload className="h-4 w-4" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={() => {
                  playTapSound("pop");
                  onClose();
                }}
                className="p-2 rounded-xl border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-muted/60 border border-border/40 text-xs font-semibold">
            <div className="flex gap-1">
              <button
                onClick={() => {
                  playTapSound("pop");
                  setActiveTab("interactive");
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "interactive"
                    ? "bg-background text-foreground shadow-sm font-bold"
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
                    ? "bg-background text-foreground shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                📄 Paper Document
              </button>
            </div>

            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-cyan-400 hover:underline text-xs"
            >
              <span>Open in Full Page</span>
              <IconExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Content Body */}
          {activeTab === "interactive" ? (
            <div className="space-y-6">
              {/* Summary & Contact */}
              <div className="p-4 sm:p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 space-y-3">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  AI/ML Engineering student with expertise in Python, Machine Learning, FastAPI, React, and Generative AI. Experienced in building end-to-end AI applications powered by LLMs, RAG, and NLP, with a strong focus on scalable backend systems and practical real-world solutions.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/40 bg-background/60 text-muted-foreground hover:text-foreground"
                  >
                    {copied ? <IconCheck className="h-3.5 w-3.5 text-emerald-400" /> : <IconMail className="h-3.5 w-3.5 text-cyan-400" />}
                    <span>{copied ? "Copied!" : "hinguvivek05@gmail.com"}</span>
                  </button>
                  <a
                    href="https://linkedin.com/in/vivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/40 bg-background/60 text-muted-foreground hover:text-foreground"
                  >
                    <IconBrandLinkedin className="h-3.5 w-3.5 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/thatvivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/40 bg-background/60 text-muted-foreground hover:text-foreground"
                  >
                    <IconBrandGithub className="h-3.5 w-3.5 text-purple-400" />
                    <span>GitHub</span>
                  </a>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/40 bg-background/40 text-muted-foreground">
                    <IconMapPin className="h-3.5 w-3.5 text-amber-500" />
                    <span>Ahmedabad, Gujarat</span>
                  </span>
                </div>
              </div>

              {/* Education */}
              <div className="p-4 rounded-xl border border-border/60 bg-background/60 flex flex-col sm:flex-row justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-foreground">SAL College of Engineering, Ahmedabad</h3>
                  <p className="text-xs font-semibold text-cyan-400">BE – Information Technology (2023 – 2027)</p>
                </div>
                <span className="self-start sm:self-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  CGPA: 8.61 / 10
                </span>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <IconCode className="h-4 w-4 text-indigo-400" />
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillsData.map((group) => (
                    <div key={group.category} className={`p-3.5 rounded-xl border bg-gradient-to-br space-y-2 ${group.color}`}>
                      <p className="text-[11px] font-bold uppercase tracking-wider">{group.category}</p>
                      <div className="flex flex-wrap gap-1">
                        {group.skills.map((s) => (
                          <span
                            key={s}
                            onClick={() => setActiveSkillFilter(activeSkillFilter === s ? null : s)}
                            className={`text-[11px] px-2 py-0.5 rounded font-medium cursor-pointer ${
                              activeSkillFilter === s
                                ? "bg-foreground text-background font-bold"
                                : "bg-background/80 text-foreground border border-border/30"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <IconSparkles className="h-4 w-4 text-amber-500" />
                  Featured Projects
                </h3>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.title} className="p-4 rounded-xl border border-border/60 bg-background/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-foreground">{proj.title}</h4>
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                          <span>GitHub</span>
                          <IconExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {proj.tech.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>
                        ))}
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                        {proj.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <IconAward className="h-4 w-4" /> Achievements
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {achievements.map((a) => (
                      <div key={a.title} className="p-2 rounded bg-background/50 border border-amber-500/20">
                        <p className="font-bold text-amber-400">{a.title}</p>
                        <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/10 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                    <IconBook className="h-4 w-4" /> Certifications
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {certs.map((c) => (
                      <div key={c.title} className="p-2 rounded bg-background/50 border border-indigo-500/20 flex justify-between gap-1">
                        <div>
                          <p className="font-bold text-foreground">{c.title}</p>
                          <p className="text-[10px] text-indigo-400">{c.issuer}</p>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">{c.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-full rounded-2xl border border-border/60 bg-white p-2 shadow-xl flex justify-center">
                <Image
                  src="/resume.png"
                  alt="Vivek Hingu Resume Document"
                  width={800}
                  height={1000}
                  className="w-full max-w-2xl h-auto object-contain rounded border border-zinc-200"
                  priority
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
