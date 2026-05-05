"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SidebarNav() {
  const pathname = usePathname();
  
  return (
    <div className="mb-8">
      <h1 className="font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight leading-tight mb-6">
        Unsolved<br/>Physics.
      </h1>
      <div className="flex flex-col gap-2">
        <Link 
          href="/" 
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
        >
          Kurse
        </Link>
        <Link 
          href="/jobs" 
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/jobs' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
        >
          Jobs
        </Link>
        <Link 
          href="/impressum" 
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/impressum' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
        >
          Impressum
        </Link>
      </div>
    </div>
  );
}
