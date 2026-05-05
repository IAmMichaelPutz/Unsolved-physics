import { SidebarNav } from "@/components/SidebarNav";
export default function ImpressumPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/50 font-sans selection:bg-indigo-200 text-slate-900">
      <div className="w-72 border-r border-white/60 bg-white/60 backdrop-blur-2xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-20 flex-shrink-0">
        <div className="p-8 pb-4">
          <SidebarNav />
        </div>
        <div className="px-8 pb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 mt-4">Impressum</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Rechtliche Informationen und Kontakt.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-12 py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-12">
            Impressum & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Rechtliches</span>
          </h1>
          
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/40 rounded-3xl p-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                Standort
              </h2>
              <p className="text-lg text-slate-600 font-medium pl-13">Kauno g. 33, 03228 Vilnius</p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/40 rounded-3xl p-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                Kontakt
              </h2>
              <p className="text-lg text-slate-600 font-medium pl-13">
                E-Mail: <a href="mailto:mp@michael-putz.com" className="text-indigo-600 hover:text-indigo-500 transition-colors">mp@michael-putz.com</a>
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/40 rounded-3xl p-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </span>
                Haftungsausschluss
              </h2>
              <div className="pl-13 space-y-4 text-slate-600">
                <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
                <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
