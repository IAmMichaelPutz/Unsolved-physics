"use client";
import { useState } from "react";
import jobsData from "@/data/jobs.json";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarNav } from "@/components/SidebarNav";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBereich, setActiveBereich] = useState<string | null>(null);

  // Extract unique "Bereich" categories
  type JobData = typeof jobsData[0];
  const bereiche = Array.from(new Set(jobsData.map((j: JobData) => j.Bereich).filter(Boolean))) as string[];

  // Filter jobs based on search query and active Bereich
  const filteredJobs = jobsData.filter((job: JobData) => {
    if (activeBereich && job.Bereich !== activeBereich) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const textToSearch = `${job.Name || ''} ${job.Beschreibung || ''} ${job.Tag1 || ''} ${job.Tag2 || ''} ${job.Tag3 || ''}`.toLowerCase();
      if (!textToSearch.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/50 font-sans selection:bg-indigo-200 text-slate-900">
      <div className="w-72 border-r border-white/60 bg-white/60 backdrop-blur-2xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-20 flex-shrink-0">
        <div className="p-8 pb-4">
          <SidebarNav />
        </div>
        <div className="px-8 pb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 mt-4">Jobs & Karriere</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Finde spannende Arbeitgeber und Karrieremöglichkeiten für Physiker in Forschung, Wirtschaft und Industrie.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-12 py-16 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
              Physik <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Jobs & Karriere</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
              Finde spannende Arbeitgeber und Karrieremöglichkeiten für Physiker in Forschung, Wirtschaft und Industrie.
            </p>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Firma, Technologie oder Stichwort suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200/80 rounded-2xl shadow-sm text-base font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setActiveBereich(null)}
                  className={`px-4 py-1.5 text-sm font-bold rounded-full transition-colors ${activeBereich === null ? 'bg-slate-800 text-white shadow-sm' : 'bg-white/80 text-slate-600 hover:bg-slate-200 border border-slate-200/80'}`}
                >
                  Alle Bereiche
                </button>
                {bereiche.map(b => (
                  <button
                    key={b}
                    onClick={() => setActiveBereich(b)}
                    className={`px-4 py-1.5 text-sm font-bold rounded-full transition-colors ${activeBereich === b ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20' : 'bg-indigo-50/80 text-indigo-600 hover:bg-indigo-100 border border-indigo-100'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job: JobData, idx: number) => (
                <Card key={idx} className="group hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 border-white/60 bg-white/70 backdrop-blur-xl flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden p-2">
                        <img src={`/images/jobs/` + job.Icon} alt={job.Name} className="object-contain w-full h-full" />
                      </div>
                      <Badge variant="outline" className="border-indigo-100 text-indigo-700 bg-indigo-50/80 font-bold px-3 py-1 shadow-sm">
                        {job.Bereich}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-extrabold text-slate-800 leading-tight">{job.Name}</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 text-indigo-600 font-semibold mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {job.Standort}, {job.Land}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-slate-600 mb-6 line-clamp-4 leading-relaxed flex-1">
                      {job.Beschreibung ? job.Beschreibung.trim() : "Keine Beschreibung verfügbar."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {[job.Tag1, job.Tag2, job.Tag3].filter(Boolean).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100/80 text-slate-600 hover:bg-slate-200">{tag}</Badge>
                      ))}
                    </div>
                    {job.Website && (
                      <a 
                        href={job.Website.trim()} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full block text-center bg-white border border-slate-200 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white text-slate-700 font-bold py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md mt-auto"
                      >
                        Zum Unternehmen
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                <h3 className="text-xl font-bold text-slate-700 mb-1">Keine Jobs gefunden</h3>
                <p>Versuche es mit einem anderen Suchbegriff oder Filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
