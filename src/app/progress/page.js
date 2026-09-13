"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "../../lib/supabase";

const supabase = createSupabaseClient();

export default function ProgressPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setResults(data || []);
    }

    setLoading(false);
  }

  const totalQuizzes = results.length;

  const totalQuestions = results.reduce(
    (sum, result) => sum + Number(result.total_questions || 0),
    0
  );

  const totalCorrect = results.reduce(
    (sum, result) => sum + Number(result.score || 0),
    0
  );

  const averageScore =
    totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

  const subjectStats = {};

  results.forEach((result) => {
    if (!subjectStats[result.subject]) {
      subjectStats[result.subject] = {
        correct: 0,
        questions: 0,
      };
    }

    subjectStats[result.subject].correct += Number(result.score || 0);
    subjectStats[result.subject].questions += Number(
      result.total_questions || 0
    );
  });

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getPerformanceMessage() {
    if (totalQuizzes === 0) {
      return "Your learning journey begins with one small step.";
    }

    if (averageScore >= 80) {
      return "Excellent progress! Your hard work is showing.";
    }

    if (averageScore >= 60) {
      return "Good progress! Keep practising to reach the next level.";
    }

    return "Every attempt makes you stronger. Keep learning!";
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="rounded-2xl border border-[#66517d] bg-[#302541] px-8 py-6 text-center shadow-xl">
          <div className="text-3xl">📜</div>

          <p className="mt-3 font-medium text-[#fffaf0]">
            Opening your progress scroll...
          </p>

          <p className="mt-1 text-sm text-[#b9acc9]">
            Gathering your study achievements
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative mx-auto max-w-7xl space-y-7 px-4 py-6 pb-10 sm:px-6 lg:px-8 lg:py-8">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute right-0 top-8 text-8xl opacity-10">
        🏰
      </div>

      <div className="pointer-events-none absolute bottom-20 left-0 rotate-[-12deg] text-6xl opacity-10">
        📜
      </div>

      {/* Header */}
      <section className="relative overflow-hidden rounded-[28px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] px-6 py-8 shadow-[0_15px_45px_rgba(0,0,0,0.25)] sm:px-8">
        <div className="absolute -right-6 -top-10 text-[130px] opacity-10">
          ✨
        </div>

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8c754d] bg-[#51432c] px-4 py-2 text-sm font-semibold text-[#e7d6b5]">
            <span>📜</span>
            Your magical progress scroll
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#fffaf0] sm:text-4xl">
            Your Progress
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#c7b9d2] sm:text-base">
            Every quiz is a step forward. Look back at what you have learned
            and discover where your next study adventure begins.
          </p>

          <p className="mt-4 text-sm font-medium text-[#d6b9ee]">
            ✨ {getPerformanceMessage()}
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Quizzes Completed"
          value={totalQuizzes}
          description="Your study attempts"
          icon="🧠"
          iconBackground="bg-[#49365c]"
        />

        <StatCard
          label="Average Score"
          value={`${averageScore}%`}
          description="Overall performance"
          icon="🎯"
          iconBackground="bg-[#514052]"
        />

        <StatCard
          label="Questions Attempted"
          value={totalQuestions}
          description="Across all quizzes"
          icon="📚"
          iconBackground="bg-[#304c50]"
        />

        <StatCard
          label="Correct Answers"
          value={totalCorrect}
          description="Knowledge gained"
          icon="🌟"
          iconBackground="bg-[#3d5540]"
        />
      </section>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Subject Performance */}
        <section className="relative overflow-hidden rounded-[24px] border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-6 shadow-[0_12px_35px_rgba(0,0,0,0.2)]">
          <div className="absolute -right-5 -top-6 rotate-12 text-7xl opacity-10">
            🪄
          </div>

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#49365c] text-xl">
                📖
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#fffaf0]">
                  Performance by Subject
                </h2>

                <p className="mt-1 text-sm text-[#b9acc9]">
                  Your strengths across different subjects
                </p>
              </div>
            </div>

            {Object.keys(subjectStats).length === 0 ? (
              <EmptyState
                icon="📚"
                title="No subject data yet"
                description="Complete a quiz to see your performance here."
              />
            ) : (
              <div className="mt-7 space-y-6">
                {Object.entries(subjectStats).map(
                  ([subject, stats], index) => {
                    const percentage =
                      stats.questions > 0
                        ? Math.round(
                            (stats.correct / stats.questions) * 100
                          )
                        : 0;

                    const progressColors = [
                      "from-[#9b7ac1] to-[#76539b]",
                      "from-[#c99ab6] to-[#a86e91]",
                      "from-[#8eb8b1] to-[#568b82]",
                      "from-[#d5b17b] to-[#a9824d]",
                    ];

                    return (
                      <div key={subject}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-[#e2d4ec]">
                            {subject}
                          </span>

                          <span className="rounded-full bg-[#49365c] px-3 py-1 text-xs font-bold text-[#d8baf0]">
                            {percentage}%
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-[#493b55]">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${
                              progressColors[index % progressColors.length]
                            }`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <p className="mt-2 text-xs text-[#9f91b0]">
                          {stats.correct} correct out of {stats.questions}{" "}
                          questions
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </section>

        {/* Learning Summary */}
        <section className="relative overflow-hidden rounded-[24px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#514052] p-6 shadow-[0_12px_35px_rgba(0,0,0,0.2)]">
          <div className="absolute -bottom-8 -right-5 rotate-[-12deg] text-8xl opacity-10">
            🏰
          </div>

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#514052] text-xl">
                ✨
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#fffaf0]">
                  Your Learning Summary
                </h2>

                <p className="mt-1 text-sm text-[#c7b9d2]">
                  A little reflection on your journey
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <SummaryCard
                title="Questions answered"
                value={totalQuestions}
                description="Every question adds to your knowledge."
              />

              <SummaryCard
                title="Accuracy"
                value={`${averageScore}%`}
                description="Keep revising the topics you find difficult."
              />

              <SummaryCard
                title="Next study step"
                value={
                  totalQuizzes === 0
                    ? "Take your first quiz"
                    : averageScore >= 80
                      ? "Challenge yourself with a new topic"
                      : "Revise and try another quiz"
                }
                description="Small steps create big results."
              />
            </div>
          </div>
        </section>
      </div>

      {/* Recent Results */}
      <section className="relative overflow-hidden rounded-[24px] border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-6 shadow-[0_12px_35px_rgba(0,0,0,0.2)]">
        <div className="absolute -right-5 -top-7 rotate-12 text-7xl opacity-10">
          📜
        </div>

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#fffaf0]">
                Recent Quiz Results
              </h2>

              <p className="mt-1 text-sm text-[#b9acc9]">
                A record of your latest study adventures
              </p>
            </div>

            <span className="rounded-full bg-[#49365c] px-4 py-2 text-xs font-bold text-[#d8baf0]">
              ✦ {results.length} saved
            </span>
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon="🪶"
              title="No quiz results yet"
              description="Your completed quizzes will appear here."
            />
          ) : (
            <div className="mt-6 space-y-3">
              {results.slice(0, 10).map((result) => {
                const percentage =
                  result.total_questions > 0
                    ? Math.round(
                        (result.score / result.total_questions) * 100
                      )
                    : 0;

                const scoreColor =
                  percentage >= 80
                    ? "text-[#9bd5ae]"
                    : percentage >= 60
                      ? "text-[#e7c27f]"
                      : "text-[#f0a1ae]";

                return (
                  <div
                    key={result.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[#66517d] bg-[#211b30]/80 p-4 transition hover:border-[#a78ac7] hover:bg-[#302541] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#49365c] text-xl">
                        📘
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#fffaf0]">
                          {result.topic}
                        </p>

                        <p className="mt-1 text-xs text-[#9f91b0]">
                          {result.subject} • {formatDate(result.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-right">
                        <p className="font-bold text-[#eee4f5]">
                          {result.score}/{result.total_questions}
                        </p>

                        <p className={`text-xs font-bold ${scoreColor}`}>
                          {percentage}%
                        </p>
                      </div>

                      <div className="text-xl">
                        {percentage >= 80
                          ? "🌟"
                          : percentage >= 60
                            ? "✨"
                            : "🌱"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  description,
  icon,
  iconBackground,
}) {
  return (
    <div className="rounded-2xl border border-[#66517d] bg-gradient-to-br from-[#302541] to-[#211b30] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:border-[#a78ac7]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-[#b9acc9]">{label}</p>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${iconBackground}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-4xl font-bold text-[#fffaf0]">{value}</p>

      <p className="mt-2 text-sm text-[#9f91b0]">{description}</p>
    </div>
  );
}

function SummaryCard({ title, value, description }) {
  return (
    <div className="rounded-2xl border border-[#8c719d]/40 bg-[#211b30]/45 p-4">
      <p className="text-sm font-semibold text-[#d8c7e8]">{title}</p>

      <p className="mt-1 text-2xl font-bold text-[#fffaf0]">{value}</p>

      <p className="mt-1 text-xs text-[#b9acc9]">{description}</p>
    </div>
  );
}

function EmptyState({ icon, title, description }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-[#66517d] bg-[#211b30]/60 p-8 text-center">
      <div className="text-4xl">{icon}</div>

      <p className="mt-3 font-semibold text-[#e8d9f5]">{title}</p>

      <p className="mt-1 text-sm text-[#9f91b0]">{description}</p>
    </div>
  );
}