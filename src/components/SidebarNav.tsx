"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import Image from 'next/image';

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30 flex items-center justify-center relative overflow-hidden flex-shrink-0">
        <Image src="/icon.png" alt="Logo" fill className="object-cover opacity-90" />
      </div>
      <h1 className="font-extrabold text-[22px] bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight leading-tight">
        Unsolved<br/>Physics.
      </h1>
    </div>
  );
}

export function SidebarLinks() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  
  return (
    <div className="flex flex-col gap-2 mt-auto">
      <Link 
        href="/about" 
        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/about' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
      >
        {lang === "de" ? "Über" : "About"}
      </Link>
      <Link 
        href="/" 
        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
      >
        {lang === "de" ? "Kurse" : "Courses"}
      </Link>
      <Link 
        href="/jobs" 
        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/jobs' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
      >
        {lang === "de" ? "Jobs" : "Jobs"}
      </Link>
      <Link 
        href="/impressum" 
        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/impressum' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
      >
        {lang === "de" ? "Impressum" : "Legal"}
      </Link>
    </div>
  );
}
