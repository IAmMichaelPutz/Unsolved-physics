"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TopNav() {
  const pathname = usePathname();
  
  return (
    <div className="fixed top-0 left-0 w-full z-[100] group">
      {/* Invisible hover catcher */}
      <div className="absolute top-0 left-0 w-full h-10 bg-transparent cursor-pointer" />
      
      {/* The actual navbar */}
      <nav className="absolute top-0 left-0 w-full bg-white/60 backdrop-blur-2xl border-b border-white/60 shadow-lg shadow-slate-200/20 px-8 py-4 flex items-center justify-between transform -translate-y-[calc(100%-6px)] group-hover:translate-y-0 transition-all duration-400 ease-out">
        <Link href="/" className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 text-xl tracking-tight">
          Unsolved Physics Fun
        </Link>
        <div className="flex gap-8 items-center bg-slate-50/50 px-6 py-2 rounded-full border border-slate-200/50 shadow-inner">
          <Link 
            href="/" 
            className={`text-sm font-bold transition-colors ${pathname === '/' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            Kurse
          </Link>
          <Link 
            href="/jobs" 
            className={`text-sm font-bold transition-colors ${pathname === '/jobs' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            Jobs
          </Link>
          <Link 
            href="/impressum" 
            className={`text-sm font-bold transition-colors ${pathname === '/impressum' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            Impressum
          </Link>
        </div>
        
        {/* Platzhalter rechts für Symmetrie oder später Login */}
        <div className="w-48 flex justify-end">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
        </div>
      </nav>
    </div>
  );
}
