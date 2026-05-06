"use client";
import { SidebarNav } from "@/components/SidebarNav";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageContext";

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
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans selection:bg-indigo-200 text-slate-900 relative">
      <button 
        onClick={() => setLang(lang === "de" ? "en" : "de")}
        className="absolute top-8 right-8 z-50 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm hover:bg-white hover:scale-105 transition-all group"
      >
        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider">
          {lang === "de" ? "English" : "Deutsch"}
        </span>
        {lang === "de" ? <FlagEN /> : <FlagDE />}
      </button>

      <div className="w-72 border-r border-slate-200 bg-white flex flex-col z-20 flex-shrink-0">
        <div className="p-8 pb-4">
          <SidebarNav />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 bg-white">
        <div className="p-12 max-w-4xl mx-auto w-full pb-40">
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow-none font-bold px-3 py-1 text-xs rounded-full">
                {lang === "de" ? "PROJEKT INFO" : "PROJECT INFO"}
              </Badge>
            </div>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight">
                {lang === "de" ? "Kommentare des Urhebers" : "Author's Comments"}
              </h1>
            </div>
            <Separator className="mt-8 mb-10 bg-slate-200/60 h-[2px] w-24 rounded-full" />
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none mb-16 dark:prose-invert prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
            {lang === "de" ? (
              <div className="space-y-6">
                <p>
                  Aufgaben der besten Universitäten der Welt wurden aufwendig adaptiert und didaktisch aufbereitet, um sie Studierenden auf der ganzen Welt frei zugänglich zu machen. Unser zentrales Ziel ist es, ein erstklassiges, einheitliches Qualitätsniveau zu etablieren. Durch die unbeschränkten Übungsmöglichkeiten möchten wir nicht nur das individuelle physikalische Verständnis fördern, sondern vor allem Menschen weltweit auf eine skalierbare, faire Art und Weise eine exzellente technische Bildung zukommen lassen.
                </p>
                <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 text-base shadow-sm">
                  <h4 className="text-slate-800 font-bold mb-2 mt-0">Hinweis</h4>
                  Diese Plattform befindet sich derzeit im Aufbau. Sowohl der Aufgabenpool als auch die erklärenden Abbildungen werden kontinuierlich erweitert und verbessert.<br/><br/>
                  <strong>Rechtsstandort:</strong> Das Projekt hat seinen Rechtsstandort in Litauen.<br/>
                  <strong>Non-Profit:</strong> Eine Kommerzialisierung der hier angebotenen Aufgaben und Bildungsinhalte ist ausdrücklich <u>nicht</u> beabsichtigt.
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p>
                  Tasks from the world's best universities have been extensively adapted and didactically prepared to make them freely accessible to students worldwide. Our central goal is to establish a first-class, uniform level of quality. Through unlimited practice opportunities, we aim not only to promote individual physical understanding but above all to provide people globally with excellent technical education in a scalable, fair manner.
                </p>
                <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 text-base shadow-sm">
                  <h4 className="text-slate-800 font-bold mb-2 mt-0">Notice</h4>
                  This platform is currently under construction. Both the task pool and the explanatory illustrations are continuously being expanded and improved.<br/><br/>
                  <strong>Legal Location:</strong> The project has its legal location in Lithuania.<br/>
                  <strong>Non-Profit:</strong> A commercialization of the educational content provided here is explicitly <u>not</u> intended.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
