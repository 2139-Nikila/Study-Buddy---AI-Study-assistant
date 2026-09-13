import Link from "next/link";

const stats = [
  {
    label: "Notes",
    value: "24",
    detail: "Across 6 subjects",
    icon: "📖",
    tone: "purple",
  },
  {
    label: "Quizzes Completed",
    value: "12",
    detail: "3 this week",
    icon: "🎯",
    tone: "pink",
  },
  {
    label: "Average Score",
    value: "86%",
    detail: "↑ 4% from last week",
    icon: "📊",
    tone: "blue",
  },
  {
    label: "Study Streak",
    value: "7 Days",
    detail: "Keep it up!",
    icon: "🔥",
    tone: "orange",
  },
];

const recentNotes = [
  {
    subject: "Operating Systems",
    title: "Process scheduling and deadlocks",
    preview:
      "Compared FCFS, SJF, and Round Robin. Also reviewed deadlock prevention vs avoidance.",
    updated: "Updated today",
    icon: "📗",
    tone: "green",
  },
  {
    subject: "Computer Networks",
    title: "OSI model and TCP/IP layers",
    preview:
      "Mapped each OSI layer to real protocols like HTTP, TCP, IP, and Ethernet.",
    updated: "Updated yesterday",
    icon: "🌐",
    tone: "blue",
  },
  {
    subject: "Database Management",
    title: "Normalization and ER diagrams",
    preview:
      "Worked through 1NF to 3NF examples and sketched an ER diagram for a library system.",
    updated: "Updated 2 days ago",
    icon: "📜",
    tone: "gold",
  },
];

const studyProgress = [
  { subject: "Operating Systems", percent: 80 },
  { subject: "Computer Networks", percent: 65 },
  { subject: "DBMS", percent: 92 },
  { subject: "Theory of Computation", percent: 55 },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative mb-5 min-h-[220px] overflow-hidden rounded-[22px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] px-6 py-7 shadow-[0_12px_30px_rgba(0,0,0,0.25)] sm:px-8">
        <div className="absolute -right-4 -top-12 text-[145px] opacity-10">
          🏰
        </div>

        <div className="absolute bottom-[-25px] right-8 text-[110px] opacity-20">
          🦉
        </div>

        <div className="absolute right-16 top-5 rotate-6 rounded-md border border-[#8c754d] bg-[#51432c] px-5 py-4 font-serif text-center text-sm italic text-[#e7d6b5] shadow-md">
          Knowledge is
          <br />
          a kind of magic
          <br />
          <span className="text-xs">— J.K. Rowling</span>
        </div>

        <div className="relative z-10 max-w-xl">
          <p className="mb-3 inline-flex rounded-full border border-[#8c754d] bg-[#51432c]/80 px-3 py-1 text-xs font-semibold text-[#e7d6b5]">
            ✨ Your little study sanctuary
          </p>

          <h1 className="text-3xl font-bold text-[#fffaf0] sm:text-4xl">
            Welcome back, Niki!
          </h1>

          <p className="mt-2 text-sm text-[#c7b9d2] sm:text-base">
            Same curiosity. Brighter tomorrows.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/tutor"
              className="magic-button rounded-lg px-4 py-2.5 text-sm font-semibold"
            >
              Ask AI Tutor →
            </Link>

            <Link
              href="/quizzes"
              className="rounded-lg border border-[#8c719d] bg-[#49365c] px-4 py-2.5 text-sm font-semibold text-[#f0e5fa] transition hover:bg-[#5d4772]"
            >
              Practice a Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-1 hover:border-[#a78ac7]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-[#b9acc9]">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight text-[#fffaf0]">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
                  stat.tone === "purple"
                    ? "bg-[#49365c]"
                    : stat.tone === "pink"
                      ? "bg-[#514052]"
                      : stat.tone === "blue"
                        ? "bg-[#304c50]"
                        : "bg-[#51432c]"
                }`}
              >
                {stat.icon}
              </div>
            </div>

            <p className="mt-3 text-xs text-[#9f91b0]">{stat.detail}</p>
          </article>
        ))}
      </section>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        {/* Continue Learning */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#fffaf0]">
                Continue Learning
              </h2>

              <p className="mt-1 text-sm text-[#b9acc9]">
                Pick up where you left off.
              </p>
            </div>

            <Link
              href="/notes"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-[#c49ae8] transition hover:bg-[#49365c]"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {recentNotes.map((note) => (
              <article
                key={note.title}
                className="rounded-2xl border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-0.5 hover:border-[#a78ac7]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${
                      note.tone === "green"
                        ? "bg-[#304c50]"
                        : note.tone === "blue"
                          ? "bg-[#304c50]"
                          : "bg-[#51432c]"
                    }`}
                  >
                    {note.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-[#49365c] px-2.5 py-1 text-[10px] font-semibold text-[#d8baf0]">
                        {note.subject}
                      </span>

                      <span className="text-[10px] text-[#9f91b0]">
                        {note.updated}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#eee4f5] sm:text-base">
                      {note.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#b9acc9]">
                      {note.preview}
                    </p>

                    <Link
                      href="/notes"
                      className="mt-2 inline-flex text-xs font-semibold text-[#c49ae8]"
                    >
                      Open note →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <section className="rounded-[24px] border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-5 shadow-[0_12px_35px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg font-bold text-[#fffaf0]">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-[#b9acc9]">
              What would you like to do?
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
              <QuickAction
                href="/notes"
                icon="📝"
                label="Create a Note"
                tone="green"
              />

              <QuickAction
                href="/quizzes"
                icon="🎯"
                label="Take a Quiz"
                tone="purple"
              />

              <QuickAction
                href="/tutor"
                icon="🧙"
                label="Ask AI Tutor"
                tone="blue"
              />

              <QuickAction
                href="/progress"
                icon="📊"
                label="View Progress"
                tone="orange"
              />
            </div>
          </section>

          {/* AI Tutor Card */}
          <section className="relative overflow-hidden rounded-[20px] border border-[#66517d] bg-gradient-to-br from-[#4b385f] to-[#292038] p-5 text-white shadow-lg">
            <div className="absolute -bottom-8 -right-3 text-8xl opacity-15">
              🦉
            </div>

            <div className="relative z-10">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl">
                🪄
              </div>

              <p className="text-xs font-medium text-[#d8c7e8]">
                Your AI learning companion
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#fffaf0]">
                Stuck on a topic?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#d8cfe2]">
                Ask questions and get beginner-friendly explanations whenever
                you need help.
              </p>

              <Link
                href="/tutor"
                className="mt-4 inline-flex rounded-lg bg-[#eadcf3] px-4 py-2.5 text-xs font-semibold text-[#4b385f] transition hover:bg-white"
              >
                Start learning with AI →
              </Link>
            </div>
          </section>

          {/* Progress */}
          <section className="rounded-[24px] border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-5 shadow-[0_12px_35px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#fffaf0]">
                  Study Progress
                </h2>

                <p className="mt-1 text-sm text-[#b9acc9]">
                  Your current learning journey.
                </p>
              </div>

              <Link
                href="/progress"
                className="text-xs font-semibold text-[#c49ae8]"
              >
                Details →
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {studyProgress.map((item) => (
                <div key={item.subject}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-[#e2d4ec]">
                      {item.subject}
                    </span>

                    <span className="font-semibold text-[#b9acc9]">
                      {item.percent}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#493b55]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#b19ad0] to-[#765796]"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Study Tip */}
          <section className="rounded-[20px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>

              <div>
                <h2 className="font-bold text-[#fffaf0]">
                  Study Tip of the Day
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#c7b9d2]">
                  Try explaining a difficult concept in your own words. If you
                  can teach it simply, you probably understand it well.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function QuickAction({ href, icon, label, tone }) {
  const toneClasses = {
    green: "bg-[#304c50] hover:bg-[#3b6267]",
    purple: "bg-[#49365c] hover:bg-[#5d4772]",
    blue: "bg-[#304c50] hover:bg-[#3b6267]",
    orange: "bg-[#51432c] hover:bg-[#685637]",
  };

  return (
    <Link
      href={href}
      className={`flex min-h-[92px] flex-col items-center justify-center rounded-xl px-3 py-4 text-center transition ${toneClasses[tone]}`}
    >
      <span className="text-2xl">{icon}</span>

      <span className="mt-2 text-xs font-semibold text-[#f0e5fa]">
        {label}
      </span>
    </Link>
  );
}