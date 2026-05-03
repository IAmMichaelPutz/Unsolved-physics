export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/50 pt-32 px-8 pb-20">
      <div className="max-w-4xl mx-auto">
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
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              Urheberrechtserklärung
            </h2>
            <div className="text-slate-600 space-y-6 text-base leading-relaxed pl-13">
              <p>Die auf dieser Website bereitgestellten Dokumente deutscher Universitäten werden ausschließlich zu Bildungszwecken und ohne kommerzielle Absichten veröffentlicht. Die Nutzung erfolgt unter Berufung auf folgende rechtliche Grundlagen:</p>
              
              <ol className="list-decimal list-outside ml-6 space-y-4 marker:text-indigo-600 marker:font-bold">
                  <li>Die Veröffentlichung erfolgt unter den Bestimmungen des § 60a UrhG (Unterricht und Lehre) sowie der entsprechenden litauischen Gesetzgebung zum Urheberrecht im Bildungsbereich.</li>
                  <li>Die Materialien werden:
                      <ul className="list-disc list-outside ml-6 mt-2 space-y-2 marker:text-slate-400">
                          <li>ausschließlich zu Lehr- und Forschungszwecken bereitgestellt</li>
                          <li>nicht kommerziell genutzt</li>
                          <li>nur in dem für den Bildungszweck erforderlichen Umfang verwendet</li>
                          <li>mit vollständiger Quellenangabe und Urheberrechtshinweis versehen</li>
                      </ul>
                  </li>
                  <li>Die Veröffentlichung erfolgt unter Beachtung der europäischen Urheberrechtsrichtlinie und des Grundsatzes der grenzüberschreitenden Bildungsfreiheit im europäischen Bildungsraum.</li>
                  <li>Bei allen Dokumenten werden die Urheber- und Quellenangaben deutlich kenntlich gemacht. Die Rechteinhaber werden namentlich genannt.</li>
                  <li>Sollten Rechteinhaber mit der Veröffentlichung nicht einverstanden sein, werden die entsprechenden Dokumente nach Kontaktaufnahme umgehend entfernt.</li>
              </ol>
              
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 mt-6">
                <p className="text-indigo-900 font-medium">Die Bereitstellung dieser Materialien dient ausschließlich der akademischen Bildung und Forschung. Eine kommerzielle Nutzung ist ausdrücklich untersagt.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/40 rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              Kontakt
            </h2>
            <p className="text-lg text-slate-600 font-medium pl-13">
              E-Mail: <a href="mailto:info@unsolved-physics.fun" className="text-indigo-600 hover:text-indigo-500 hover:underline transition-all">info@unsolved-physics.fun</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
