"use client";
import { SidebarNav } from "@/components/SidebarNav";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";

const FlagDE = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-3.5 rounded-[2px] shadow-sm object-cover overflow-hidden">
    <rect width="5" height="3" fill="#000"/>
    <rect width="5" height="2" y="1" fill="#D00"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);

const FlagEN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className="w-5 h-3.5 rounded-[2px] shadow-sm object-cover overflow-hidden">
    <rect width="50" height="30" fill="#012169"/>
    <path d="M0,0 L50,30 M50,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L50,30 M50,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
    <path d="M25,0 L25,30 M0,15 L50,15" stroke="#fff" strokeWidth="10"/>
    <path d="M25,0 L25,30 M0,15 L50,15" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

export default function AboutPage() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/50 font-sans selection:bg-indigo-200 text-slate-900 relative">
      {/* Global Language Switcher top right */}
      <button 
        onClick={() => setLang(lang === "de" ? "en" : "de")}
        className="absolute top-8 right-8 z-50 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm hover:bg-white hover:scale-105 transition-all group"
      >
        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider">
          {lang === "de" ? "English" : "Deutsch"}
        </span>
        {lang === "de" ? <FlagEN /> : <FlagDE />}
      </button>

      <div className="w-72 border-r border-white/60 bg-white/60 backdrop-blur-2xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-20 flex-shrink-0">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30 flex items-center justify-center relative overflow-hidden">
              <Image src="/icon.png" alt="Logo" fill className="object-cover opacity-90" />
            </div>
            <h1 className="font-black text-xl tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700">
              Unsolved<br/>Physics
            </h1>
          </div>
        </div>
        <SidebarNav />
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-200/40 via-purple-100/20 to-transparent rounded-full blur-3xl opacity-50 -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/40 via-indigo-50/20 to-transparent rounded-full blur-3xl opacity-50 -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-12 py-16">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-8">
              {lang === "de" ? "Über das Projekt" : "About the Project"}
            </h2>

            <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl mb-8 p-8 md:p-12">
              <CardContent className="p-0 prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-medium">
                {lang === "de" ? (
                  <div className="space-y-6">
                    <p>
                      Aufgaben der besten Universitäten der Welt wurden angepasst und so aufbereitet, dass sie Studierenden auf der ganzen Welt zur Verfügung stehen. Unser Ziel ist ein einheitliches Qualitätsniveau mit unbeschränkten Möglichkeiten zu üben, um das eigene physikalische Verständnis global zu verbessern und Menschen technische Bildung auf eine skalierbare Art und Weise zukommen zu lassen.
                    </p>
                    <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <strong>Hinweis:</strong> Diese Webseite befindet sich noch im Aufbau. Aufgaben sowie erklärende Bilder werden fortlaufend ergänzt. Der Rechtsstandort des Projekts ist Litauen. Eine Kommerzialisierung der hier angebotenen Inhalte ist nicht beabsichtigt.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p>
                      Tasks from the best universities in the world have been adapted and prepared so that they are available to students all over the world. Our goal is a uniform level of quality with unlimited opportunities to practice, in order to globally improve physical understanding and provide technical education to people in a scalable way.
                    </p>
                    <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <strong>Note:</strong> This website is currently under construction. Tasks and explanatory images are continuously being added. The legal location of the project is Lithuania. Commercialization of the content provided here is not intended.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
