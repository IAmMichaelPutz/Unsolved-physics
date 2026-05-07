"use client";

import { useState, useEffect, useRef } from "react";
import coursesData from "@/data/courses.json";
import tasksData from "@/data/tasks.json";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/SidebarNav";
import { useLanguage } from "@/components/LanguageContext";

// Typen
type Task = typeof tasksData.tasks[0] & { 
  title_en?: string; 
  content_en?: string; 
  solution_en?: string; 
  classification?: string;
};

const translateCategory = (cat: string, lang: string) => {
  const map: Record<string, string> = {
    "basic-courses": "Basic Courses",
    "advanced-courses": "Advanced Courses",
    "math-methods": "Math Methods",
  };
  if (lang === "de") return cat.toUpperCase().replace('-', ' ');
  return map[cat] || cat;
};

const translateClass = (cls: string, lang: string) => {
  if (lang === "de") return cls;
  const map: Record<string, string> = {
    'Atome im Magnetfeld & H-Atom': 'Atoms in Magnetic Field & H-Atom',
    'Fein- & Hyperfeinstruktur': 'Fine & Hyperfine Structure',
    'Quantenmechanische Potentiale': 'Quantum Mechanical Potentials',
    'Molekülphysik': 'Molecular Physics',
    'Allgemeine Atomphysik': 'General Atomic Physics',
    'Kernphysik & Zerfälle': 'Nuclear Physics & Decays',
    'Grundlagen & Vermischtes': 'Basics & Miscellaneous',
    'Elektrostatik in Materie': 'Electrostatics in Matter',
    'Magnetostatik & Induktion': 'Magnetostatics & Induction',
    'Elektrostatik': 'Electrostatics',
    'Relativistische Elektrodynamik': 'Relativistic Electrodynamics',
    'Elektromagnetische Wellen': 'Electromagnetic Waves',
    'Starrer Körper': 'Rigid Body',
    'Zentralfeld & Streuung': 'Central Field & Scattering',
    'Schwingungen & Oszillatoren': 'Vibrations & Oscillators',
    'Erhaltungssätze': 'Conservation Laws',
    'Kinematik & Dynamik': 'Kinematics & Dynamics',
    'Lagrange-Formalismus': 'Lagrangian Formalism',
    'Hamilton-Mechanik': 'Hamiltonian Mechanics',
    'Wellenoptik': 'Wave Optics',
    'Geometrische Optik': 'Geometrical Optics',
    'Vermischtes': 'Miscellaneous',
    'Photonik & Strahlung': 'Photonics & Radiation',
    'Wasserstoff & Atome': 'Hydrogen & Atoms',
    'Grundlagen & Postulate': 'Basics & Postulates',
    'Spin & Feinstruktur': 'Spin & Fine Structure',
    '1D Potentiale': '1D Potentials',
    'Streutheorie': 'Scattering Theory',
    'Harmonischer Oszillator': 'Harmonic Oscillator',
    'ANA1': 'Calculus 1'
  };
  return map[cls] || cls;
};

const FlagDE = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-3.5 rounded-[2px] shadow-sm object-cover overflow-hidden">
    <rect width="5" height="3" fill="#000"/>
    <rect width="5" height="2" y="1" fill="#D00"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);

const FlagEN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-[2px] shadow-sm object-cover overflow-hidden">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

// Warteschlange für MathJax-Aufrufe, um Kollisionen bei schnellem Klicken zu verhindern
let mathJaxPromise = Promise.resolve();

export default function Home() {
  const [activeTopic, setActiveTopic] = useState("electrodynamics");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { lang, setLang } = useLanguage();
  const [isMathLoaded, setIsMathLoaded] = useState(false);
  const [activeClassification, setActiveClassification] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskCopied, setTaskCopied] = useState(false);
  const [solutionCopied, setSolutionCopied] = useState(false);
  const mathContainerRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (html: string, setCopied: (v: boolean) => void) => {
    if (!html) return;
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const tasksForTopic = tasksData.tasks.filter((t) => t.topicId === activeTopic);
  const availableClassifications = Array.from(new Set(tasksForTopic.map(t => (t as Task).classification).filter(Boolean))) as string[];

  const filteredTasks = tasksForTopic.filter((t) => {
    const task = t as Task;
    // 1. Classification Filter
    if (activeClassification && task.classification !== activeClassification) return false;
    
    // 2. Text Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleDe = (task.title || "").toLowerCase();
      const titleEn = (task.title_en || "").toLowerCase();
      if (!titleDe.includes(query) && !titleEn.includes(query)) return false;
    }
    
    return true;
  });

  const runMathJax = (): Promise<void> => {
    if (typeof window === "undefined") return Promise.resolve();

    if (window.MathJax) {
      const targetElements = mathContainerRef.current ? [mathContainerRef.current] : undefined;
      
      const doTypeset = () => {
        if (window.MathJax.typesetClear) {
          window.MathJax.typesetClear(targetElements);
        }
        if (window.MathJax.typesetPromise) {
          return window.MathJax.typesetPromise(targetElements);
        }
        return Promise.resolve();
      };

      if (window.MathJax.typesetPromise) {
        mathJaxPromise = mathJaxPromise.then(doTypeset).catch(console.error);
        return mathJaxPromise;
      }
    }
    
    // MathJax is still loading or not fully initialized, wait and retry
    return new Promise((resolve) => {
      setTimeout(() => {
        runMathJax().then(resolve);
      }, 300);
    });
  };

  // Elegantes Neuladen und Rendern von MathJax ohne Flackern
  useEffect(() => {
    if (!activeTask) return;
    
    // eslint-disable-next-line
    setIsMathLoaded(false); // Versteckt den Content mit sanfter CSS-Transition
    const timer = setTimeout(() => {
      runMathJax().then(() => {
        setIsMathLoaded(true); // Weiches Einblenden der perfekten Formeln
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeTask, lang]);

  // Wenn der Lösungsweg aufgeklappt wird, müssen wir MathJax für den neuen DOM-Inhalt neu triggern
  const handleAccordionChange = (val: string) => {
    if (val === "solution") {
      setTimeout(() => {
        runMathJax();
      }, 100);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/50 font-sans selection:bg-indigo-200 text-slate-900">
      {/* Sidebar - Courses (Glassmorphism) */}
      <div className={`w-full lg:w-72 border-r border-white/60 bg-white/60 backdrop-blur-2xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-col z-20 flex-shrink-0 ${activeTopic ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-8 pb-4">
          <SidebarNav />
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8">
            {coursesData.categories.map((category) => (
              <div key={category.id}>
                <h2 className="mb-4 px-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {lang === "de" ? category.title.de : category.title.en}
                </h2>
                <div className="space-y-1.5">
                  {category.topics.map((topic) => {
                    const hasTasks = tasksData.tasks.some(t => t.topicId === topic.id);
                    const isDisabled = !hasTasks || ('isActive' in topic && topic.isActive === false);
                    
                    return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        if (isDisabled) return;
                        setActiveTopic(topic.id);
                        setActiveClassification(null);
                        setSearchQuery("");
                        setActiveTask(null);
                      }}
                      disabled={isDisabled}
                      className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-300 ease-out group ${
                        activeTopic === topic.id
                          ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20"
                          : isDisabled ? "text-slate-400 bg-transparent" : "hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 font-medium bg-transparent"
                      } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      <span className="truncate pr-2">{lang === "de" ? topic.name.de : topic.name.en}</span>
                      {isDisabled && (
                        <span className="text-[9px] uppercase bg-slate-200/80 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                          {lang === "de" ? "Bald" : "Soon"}
                        </span>
                      )}
                    </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Tasks List */}
      <div className={`w-full lg:w-[400px] border-r border-white/50 flex-col bg-slate-50/40 backdrop-blur-md flex-shrink-0 relative z-10 ${(!activeTopic || activeTask) ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-8 border-b border-white/60 bg-white/40 sticky top-0 z-10">
          <button 
            onClick={() => setActiveTopic("")}
            className="lg:hidden flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-4 font-semibold text-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {lang === "de" ? "Zurück zu Kursen" : "Back to Courses"}
          </button>
          <h2 className="font-extrabold text-2xl text-slate-800 mb-1">{lang === "de" ? "Aufgaben" : "Exercises"}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
            <p className="text-sm font-medium text-slate-500">
              {filteredTasks.length} {lang === "de" ? (filteredTasks.length === 1 ? 'Aufgabe' : 'Aufgaben') : (filteredTasks.length === 1 ? 'Exercise' : 'Exercises')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder={lang === "de" ? "Suchen..." : "Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200/80 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-slate-400"
            />
          </div>
          
          {/* Classification Filter (Subfolders & Types) */}
          {availableClassifications.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200/50">
              <button
                onClick={() => setActiveClassification(null)}
                className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors ${activeClassification === null ? 'bg-slate-800 text-white shadow-sm' : 'bg-white/80 text-slate-500 hover:bg-slate-200 border border-slate-200'}`}
              >
                {lang === "de" ? "Alle" : "All"}
              </button>
              {availableClassifications.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveClassification(c)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors ${activeClassification === c ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20' : 'bg-indigo-50/80 text-indigo-600 hover:bg-indigo-100 border border-indigo-100'}`}
                >
                  {translateClass(c, lang)}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                  <span className="text-2xl opacity-50">🔍</span>
                </div>
                <p className="text-sm font-medium text-slate-500">{lang === "de" ? "Aktuell keine Inhalte verfügbar." : "No content available yet."}</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <Card 
                  key={task.id} 
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-400 ease-out border-slate-200/50 bg-white/70 hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 ${activeTask?.id === task.id ? '!bg-white border-indigo-400 ring-1 ring-indigo-400/50 shadow-lg shadow-indigo-500/15' : ''}`}
                  onClick={() => setActiveTask(task as Task)}
                >
                  <CardHeader className="p-5">
                    <CardTitle className="text-[15px] font-semibold leading-relaxed text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {lang === "en" && task.title_en ? task.title_en : task.title}
                    </CardTitle>
                    <CardDescription className="flex gap-2 items-center mt-3 flex-wrap">
                      <Badge variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-[10px] font-semibold text-slate-500 rounded-md px-2 py-0.5">
                        {translateCategory(task.category, lang)}
                      </Badge>
                      {(task as Task).classification && (
                        <Badge variant="outline" className="border-indigo-200 text-indigo-600 bg-indigo-50/50 text-[10px] font-semibold rounded-md px-2 py-0.5">
                          {translateClass((task as Task).classification!, lang)}
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Task Detail View */}
      <div className={`w-full lg:flex-1 flex-col relative h-screen overflow-hidden bg-white/30 ${!activeTask ? 'hidden lg:flex' : 'flex'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        
        {/* Global Language Switcher top right */}
        <button 
          onClick={() => setLang(lang === "de" ? "en" : "de")}
          className="absolute top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-lg hover:-translate-y-0.5 text-sm font-bold text-slate-600 transition-all duration-300 border border-slate-200/60 shadow-sm"
          title={lang === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
        >
          {lang === "de" ? <FlagDE /> : <FlagEN />}
          <span>{lang.toUpperCase()}</span>
        </button>

        {activeTask ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
            <div className="p-6 md:p-12 max-w-4xl mx-auto w-full pb-40">
              <div className="mb-10">
                <button 
                  onClick={() => setActiveTask(null)}
                  className="lg:hidden flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 font-semibold text-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  {lang === "de" ? "Zurück zur Aufgabenliste" : "Back to Exercises"}
                </button>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Badge className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow-none font-bold px-3 py-1 text-xs rounded-full">
                    {translateCategory(activeTask.category, lang)}
                  </Badge>
                  {lang === "en" && !activeTask.content_en && (
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-600 font-semibold px-3 py-1 text-xs rounded-full shadow-none">
                      Missing Translation
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h1 className="text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight">
                    {lang === "en" && activeTask.title_en ? activeTask.title_en : activeTask.title}
                  </h1>
                  <button 
                    onClick={() => handleCopy(lang === "en" && activeTask.content_en ? activeTask.content_en : activeTask.content, setTaskCopied)}
                    className="flex items-center gap-2 px-3 py-2 mt-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 transition-all font-semibold text-sm shadow-sm"
                    title={lang === "de" ? "Aufgabe für KI kopieren" : "Copy task for AI"}
                  >
                    {taskCopied ? (
                      <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg> Kopiert!</>
                    ) : (
                      <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Kopieren</>
                    )}
                  </button>
                </div>
                <Separator className="mt-8 mb-10 bg-slate-200/60 h-[2px] w-24 rounded-full" />
              </div>
              
              {/* Task Content - With MathJax Fade-In Animation */}
              <div ref={mathContainerRef} className={`transition-all duration-700 ease-in-out transform ${isMathLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="prose prose-slate prose-lg max-w-none mb-16 dark:prose-invert prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                   <div dangerouslySetInnerHTML={{ __html: lang === "en" && activeTask.content_en ? activeTask.content_en : activeTask.content }} />
                </div>

                {/* Task Solution */}
                {(lang === "en" ? (activeTask.solution_en || activeTask.solution) : activeTask.solution) && (
                  <Accordion type="single" collapsible key={activeTask.id} onValueChange={handleAccordionChange} className="w-full mt-12">
                    <AccordionItem value="solution" className="border border-slate-200/60 rounded-2xl bg-white shadow-xl shadow-slate-200/40 overflow-hidden px-2 transition-all duration-300 hover:border-indigo-200">
                      <AccordionTrigger className="hover:no-underline px-6 py-6 group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-indigo-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                          </div>
                          <span className="font-extrabold text-xl text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {lang === "de" ? "Lösungsweg öffnen" : "Reveal Solution"}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-10 px-8 bg-slate-50/50 rounded-b-2xl border-t border-slate-100 relative">
                        <button 
                          onClick={() => handleCopy(lang === "en" && activeTask.solution_en ? activeTask.solution_en : activeTask.solution, setSolutionCopied)}
                          className="absolute top-4 right-8 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 transition-all font-semibold text-xs shadow-sm"
                          title={lang === "de" ? "Lösung für KI kopieren" : "Copy solution for AI"}
                        >
                          {solutionCopied ? (
                            <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg> Kopiert!</>
                          ) : (
                            <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Kopieren</>
                          )}
                        </button>
                        <div className="prose prose-slate prose-lg max-w-none dark:prose-invert mt-4">
                          <div dangerouslySetInnerHTML={{ __html: lang === "en" && activeTask.solution_en ? activeTask.solution_en : activeTask.solution }} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col gap-6 relative z-10">
            <div className="w-32 h-32 rounded-3xl rotate-3 bg-gradient-to-tr from-white to-indigo-50 flex items-center justify-center shadow-xl shadow-indigo-900/5 border border-white/60 relative animate-pulse-slow">
              <span className="text-5xl drop-shadow-md">✨</span>
            </div>
            <div className="text-center max-w-sm mt-4">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-3">{lang === "de" ? "Entdecke die Physik" : "Discover Physics"}</h3>
              <p className="text-base text-slate-500 font-medium leading-relaxed">
                {lang === "de" ? "Wähle eine Übung aus der linken Spalte, um sie im Detail zu analysieren und zu lösen." : "Select an exercise from the left column to analyze and solve it in detail."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Add global TypeScript definition for MathJax
declare global {
  interface Window {
    MathJax: { typesetClear?: (elements?: HTMLElement[]) => void; typesetPromise?: (elements?: HTMLElement[]) => Promise<void> };
  }
}
