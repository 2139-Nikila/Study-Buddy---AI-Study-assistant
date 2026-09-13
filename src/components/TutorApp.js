"use client";

import { useState } from "react";

export default function TutorApp() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("General");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askTutor() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          subject,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(err.message || "Unable to connect to AI Tutor.");
    } finally {
      setLoading(false);
    }
  }

  function useExample(text, selectedSubject) {
    setQuestion(text);
    setSubject(selectedSubject);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <section className="relative mb-8 overflow-hidden rounded-[26px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] p-6 shadow-[0_14px_35px_rgba(0,0,0,0.25)] sm:p-8">
        <div className="absolute -right-5 -top-10 text-[125px] opacity-10">
          🏰
        </div>

        <div className="relative z-10">
          <p className="mb-3 inline-flex rounded-full border border-[#8f78aa] bg-[#ffffff0d] px-3 py-1 text-xs font-semibold text-[#e7d6b5]">
            ✨ Your magical learning companion
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#fffaf0] sm:text-4xl">
            AI Tutor
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#c7b9d2] sm:text-base">
            Ask anything and receive a clear, personalized explanation from
            your AI tutor.
          </p>
        </div>
      </section>

      {/* Question Card */}
      <section className="relative overflow-hidden rounded-[26px] border border-[#66517d] bg-gradient-to-br from-[#302541] via-[#2b213b] to-[#211b30] p-5 shadow-[0_14px_35px_rgba(0,0,0,0.22)] sm:p-7">
        <div className="absolute right-6 top-5 text-4xl opacity-15">📜</div>

        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#49365c] text-2xl shadow-sm">
              🤖
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#fffaf0]">
                Ask your question
              </h2>

              <p className="mt-1 text-sm text-[#b9acc9]">
                I’ll explain it in simple terms.
              </p>
            </div>
          </div>

          {/* Subject */}
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-semibold text-[#d8c7e8]"
          >
            Subject
          </label>

          <select
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="mb-5 w-full rounded-xl border border-[#66517d] bg-[#211b30] px-4 py-3 text-sm font-medium text-[#fffaf0] outline-none transition focus:border-[#a78ac7] focus:ring-2 focus:ring-[#8064aa]/30"
          >
            <option>General</option>
            <option>Data Structures</option>
            <option>Operating Systems</option>
            <option>Computer Networks</option>
            <option>Database Management Systems</option>
            <option>Programming</option>
            <option>Computer Science</option>
          </select>

          {/* Question */}
          <label
            htmlFor="question"
            className="mb-2 block text-sm font-semibold text-[#d8c7e8]"
          >
            Your question
          </label>

          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.ctrlKey) {
                event.preventDefault();
                askTutor();
              }
            }}
            placeholder="Example: Explain deadlock in operating systems..."
            rows={6}
            className="w-full resize-none rounded-2xl border border-[#66517d] bg-[#211b30] px-4 py-4 text-sm leading-6 text-[#fffaf0] outline-none transition placeholder:text-[#887a9a] focus:border-[#a78ac7] focus:ring-2 focus:ring-[#8064aa]/30"
          />

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#9f91b0]">
              Press Ctrl + Enter to ask
            </p>

            <button
              type="button"
              onClick={askTutor}
              disabled={loading || !question.trim()}
              className="magic-button rounded-xl px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Ask AI Tutor →"}
            </button>
          </div>
        </div>
      </section>

      {/* Example Questions */}
      {!answer && !loading && (
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#fffaf0]">Try asking</h2>

            <p className="mt-1 text-sm text-[#b9acc9]">
              Choose a question to get started.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ExampleCard
              icon="💻"
              title="Explain deadlock"
              subject="Operating Systems"
              onClick={() =>
                useExample(
                  "Explain deadlock in operating systems with a simple example.",
                  "Operating Systems"
                )
              }
            />

            <ExampleCard
              icon="📚"
              title="Stack vs Queue"
              subject="Data Structures"
              onClick={() =>
                useExample(
                  "Explain the difference between a stack and a queue with real-life examples.",
                  "Data Structures"
                )
              }
            />

            <ExampleCard
              icon="🌐"
              title="Explain OSI model"
              subject="Computer Networks"
              onClick={() =>
                useExample(
                  "Explain the OSI model and its seven layers in simple terms.",
                  "Computer Networks"
                )
              }
            />
          </div>
        </section>
      )}

      {/* Loading */}
      {loading && (
        <section className="mt-8 rounded-2xl border border-[#66517d] bg-[#302541] p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#49365c] text-xl">
              ✨
            </div>

            <div>
              <p className="font-semibold text-[#fffaf0]">
                AI Tutor is thinking...
              </p>

              <p className="mt-1 text-sm text-[#b9acc9]">
                Preparing a simple explanation for you.
              </p>
            </div>

            <div className="ml-auto flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#9274b4]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#bda4d0] [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#e7d6b5] [animation-delay:300ms]" />
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <section className="mt-8 rounded-2xl border border-red-400/30 bg-red-950/40 p-5">
          <p className="font-semibold text-red-200">Something went wrong</p>
          <p className="mt-1 text-sm leading-6 text-red-300">{error}</p>
        </section>
      )}

      {/* Answer */}
      {answer && (
        <section className="relative mt-8 overflow-hidden rounded-[26px] border border-[#66517d] bg-gradient-to-br from-[#403050] to-[#211b30] p-5 shadow-[0_14px_35px_rgba(0,0,0,0.25)] sm:p-7">
          <div className="absolute right-6 top-5 text-4xl opacity-15">✨</div>

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#49365c] text-2xl">
                🤖
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#fffaf0]">
                  AI Tutor
                </h2>

                <p className="mt-1 text-sm text-[#b9acc9]">{subject}</p>
              </div>

              <span className="ml-auto rounded-full border border-[#8c754d] bg-[#51432c] px-3 py-1 text-xs font-semibold text-[#e7d6b5]">
                ✦ Explained
              </span>
            </div>

            <div className="rounded-2xl border border-[#66517d] bg-[#211b30] p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-[#e8deef]">
                {answer}
              </p>
            </div>

            <div className="mt-6 flex justify-end border-t border-[#66517d] pt-5">
              <button
                type="button"
                onClick={() => {
                  setQuestion("");
                  setAnswer("");
                  setError("");
                }}
                className="rounded-xl bg-[#49365c] px-4 py-2.5 text-sm font-semibold text-[#e2d4ec] transition hover:bg-[#594477]"
              >
                Ask another question →
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function ExampleCard({ icon, title, subject, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-5 text-left shadow-lg transition hover:-translate-y-1 hover:border-[#a78ac7] hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#49365c] text-xl">
        {icon}
      </span>

      <p className="mt-4 text-base font-bold text-[#fffaf0]">{title}</p>

      <p className="mt-1 text-sm text-[#b9acc9]">{subject}</p>

      <p className="mt-4 text-xs font-semibold text-[#c8a9e6]">
        Ask this question →
      </p>
    </button>
  );
}