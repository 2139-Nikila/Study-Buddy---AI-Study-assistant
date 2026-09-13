"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: HomeIcon },
  { href: "/notes", label: "My Notes", icon: NotesIcon },
  { href: "/tutor", label: "AI Tutor", icon: TutorIcon },
  { href: "/quizzes", label: "Quizzes", icon: QuizIcon },
  { href: "/progress", label: "Progress", icon: ProgressIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#d8c9df] bg-[#302541]/95 px-4 py-3 text-white shadow-md backdrop-blur md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-sm font-semibold tracking-wide">
            Brain Buddy
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-xl border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[#20172d]/60 backdrop-blur-[2px] md:hidden"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-gradient-to-b from-[#211b30] via-[#302541] to-[#211b30] p-5 text-white shadow-2xl transition-transform duration-300 md:static md:z-0 md:min-h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Area */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <LogoMark />

            <div>
              <p className="text-sm font-semibold tracking-wide">
                Brain Buddy
              </p>
              <p className="text-xs text-[#c7b9d2]">
                A little magic every day
              </p>
            </div>
          </Link>

          <button
            type="button"
            className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Heading */}
        <div className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#bda9cb]">
          Your study room
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-[#d8c1ed]/40 bg-gradient-to-r from-[#9274b4]/55 to-[#b99bcf]/25 text-white shadow-lg shadow-black/10"
                    : "border-transparent text-[#d5c9df] hover:border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg transition ${
                    isActive
                      ? "bg-white/15 text-[#f4e7ff]"
                      : "bg-white/5 text-[#cdbbda] group-hover:bg-white/10"
                  }`}
                >
                  <Icon />
                </span>

                <span>{item.label}</span>

                {isActive ? (
                  <span className="ml-auto text-xs text-[#eadcf7]">✦</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Quote */}
        <div className="mb-5 mt-8 border-t border-white/10 pt-5">
          <p className="px-3 text-xs leading-5 text-[#bda9cb]">
            “Curious minds find the brightest paths.”
          </p>
        </div>

        {/* User Card */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f1d9a5]/50 bg-[#e7d6b5] font-serif text-lg text-[#49355c] shadow-inner">
              N
            </div>

            <div>
              <p className="text-sm font-semibold">Niki</p>
              <p className="text-xs text-[#c7b9d2]">
                Computer Science student
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs italic leading-5 text-[#c7b9d2]">
            “Small steps create big results.”
          </p>
        </div>
      </aside>
    </>
  );
}

function LogoMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8b77d]/50 bg-gradient-to-br from-[#f1dfb8] to-[#d9c39a] text-lg text-[#49355c] shadow-inner">
      ✦
    </span>
  );
}

function HomeIcon() {
  return <span aria-hidden="true">⌂</span>;
}

function NotesIcon() {
  return <span aria-hidden="true">▧</span>;
}

function TutorIcon() {
  return <span aria-hidden="true">✧</span>;
}

function QuizIcon() {
  return <span aria-hidden="true">◇</span>;
}

function ProgressIcon() {
  return <span aria-hidden="true">▥</span>;
}

function MenuIcon() {
  return <span aria-hidden="true">☰</span>;
}

function CloseIcon() {
  return <span aria-hidden="true">×</span>;
}