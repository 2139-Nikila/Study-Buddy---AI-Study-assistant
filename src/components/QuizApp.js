"use client";

import { useState } from "react";
import { createSupabaseClient } from "../lib/supabase";

const supabase = createSupabaseClient();

export default function QuizApp() {
  const [subject, setSubject] = useState("Operating Systems");
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savingResult, setSavingResult] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);

  async function generateQuiz() {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setQuiz(null);
    setResultSaved(false);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          topic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate quiz.");
      }

      setQuiz(data);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setScore(0);
      setAnswered(false);
    } catch (err) {
      setError(err.message || "Unable to generate quiz.");
    } finally {
      setLoading(false);
    }
  }

  async function saveQuizResult(finalScore) {
    setSavingResult(true);

    try {
      const { error: supabaseError } = await supabase
        .from("quiz_results")
        .insert([
          {
            subject,
            topic,
            score: finalScore,
            total_questions: quiz.questions.length,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      setResultSaved(true);
    } catch (err) {
      console.error("Error saving quiz result:", err);
      setError("Quiz completed, but the result could not be saved.");
    } finally {
      setSavingResult(false);
    }
  }

  function selectAnswer(index) {
    if (answered) return;

    const correctAnswer =
      quiz.questions[currentQuestion].correctAnswer;

    const isCorrect = index === correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    setSelectedAnswer(index);
    setAnswered(true);

    if (isCorrect) {
      setScore(newScore);
    }

    if (
      currentQuestion === quiz.questions.length - 1 &&
      !resultSaved
    ) {
      saveQuizResult(newScore);
    }
  }

  function nextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }

  function restartQuiz() {
    setQuiz(null);
    setTopic("");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setError("");
    setResultSaved(false);
  }

  const currentQuizQuestion =
    quiz?.questions?.[currentQuestion];

  // Results screen
  if (quiz && currentQuestion >= quiz.questions.length) {
    const percentage = Math.round(
      (score / quiz.questions.length) * 100
    );

    return (
      <>
        <style jsx global>{`
          @keyframes paperDrop {
            0% {
              opacity: 0;
              transform: translateY(-35px) rotate(-1deg);
            }

            100% {
              opacity: 1;
              transform: translateY(0) rotate(0);
            }
          }

          .paper-drop {
            animation: paperDrop 0.65s ease-out;
          }
        `}</style>

        <div className="min-h-screen space-y-6 px-1 text-[#fffaf0]">
          <div className="paper-drop">
            <div className="mb-3 inline-flex rounded-full border border-[#8c754d] bg-[#51432c] px-4 py-2 text-sm font-medium text-[#e7d6b5]">
              🏆 Your magical results
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#fffaf0]">
              Quiz Complete!
            </h1>

            <p className="mt-2 text-[#b9acc9]">
              Your learning journey continues, one question at a time.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] p-8 text-center shadow-[0_15px_45px_rgba(0,0,0,0.25)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#76539b] opacity-20" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#c99ab6] opacity-10" />

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#66517d] bg-[#49365c]">
              <span className="text-4xl">🏆</span>
            </div>

            <p className="relative mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#c5a7df]">
              {subject}
            </p>

            <h2 className="relative mt-2 text-5xl font-bold text-[#fffaf0]">
              {score}{" "}
              <span className="text-2xl text-[#b9acc9]">
                / {quiz.questions.length}
              </span>
            </h2>

            <div className="relative mx-auto mt-4 h-3 max-w-md overflow-hidden rounded-full bg-[#493b55]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#9b7ac1] to-[#c99ab6] transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="relative mt-4 text-lg font-semibold text-[#e5d5ef]">
              {score === quiz.questions.length
                ? "Perfect score! Excellent work. ✨"
                : score >= 3
                  ? "Good job! Keep practicing. 🌟"
                  : "Keep practicing. You will improve! 📚"}
            </p>

            {savingResult && (
              <p className="relative mt-4 text-sm text-[#b9acc9]">
                Saving your result...
              </p>
            )}

            {resultSaved && (
              <p className="relative mt-4 text-sm font-medium text-[#9bd5ae]">
                ✓ Result saved to your progress
              </p>
            )}

            <button
              onClick={restartQuiz}
              className="relative mt-7 rounded-2xl bg-[#76539b] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#76539b]/20 transition hover:-translate-y-0.5 hover:bg-[#8b68b2]"
            >
              Generate Another Quiz →
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        @keyframes paperDrop {
          0% {
            opacity: 0;
            transform: translateY(-35px) rotate(-1deg);
          }

          100% {
            opacity: 1;
            transform: translateY(0) rotate(0);
          }
        }

        .paper-drop {
          animation: paperDrop 0.65s ease-out;
        }
      `}</style>

      <div className="min-h-screen space-y-6 px-1 text-[#fffaf0]">
        {/* Header */}
        <div className="paper-drop">
          <div className="mb-3 inline-flex rounded-full border border-[#8c754d] bg-[#51432c] px-4 py-2 text-sm font-medium text-[#e7d6b5]">
            🪄 A little magic for your memory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#fffaf0]">
            AI Quizzes
          </h1>

          <p className="mt-2 text-base text-[#b9acc9]">
            Test your knowledge with a magical AI-generated quiz.
          </p>
        </div>

        {/* Generator */}
        {!quiz && (
          <div className="paper-drop relative overflow-hidden rounded-[28px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.25)] sm:p-8">
            <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#76539b] opacity-20" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#c99ab6] opacity-10" />

            <div className="relative mb-7 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#49365c] text-2xl">
                🧠
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#fffaf0]">
                  Generate a Quiz
                </h2>

                <p className="mt-1 text-sm text-[#b9acc9]">
                  Choose a subject and test your knowledge.
                </p>
              </div>
            </div>

            <div className="relative space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e2d4ec]">
                  Subject
                </label>

                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-2xl border border-[#66517d] bg-[#211b30] px-4 py-3.5 text-[#fffaf0] outline-none transition focus:border-[#a78ac7] focus:ring-4 focus:ring-[#76539b]/30"
                >
                  <option className="bg-[#211b30] text-[#fffaf0]">
                    Operating Systems
                  </option>

                  <option className="bg-[#211b30] text-[#fffaf0]">
                    Data Structures
                  </option>

                  <option className="bg-[#211b30] text-[#fffaf0]">
                    Computer Networks
                  </option>

                  <option className="bg-[#211b30] text-[#fffaf0]">
                    Database Management Systems
                  </option>

                  <option className="bg-[#211b30] text-[#fffaf0]">
                    Programming
                  </option>

                  <option className="bg-[#211b30] text-[#fffaf0]">
                    Computer Science
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e2d4ec]">
                  Topic
                </label>

                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      generateQuiz();
                    }
                  }}
                  placeholder="Example: Process Scheduling"
                  className="w-full rounded-2xl border border-[#66517d] bg-[#211b30] px-4 py-3.5 text-[#fffaf0] placeholder-[#8f819e] outline-none transition focus:border-[#a78ac7] focus:ring-4 focus:ring-[#76539b]/30"
                />
              </div>

              <button
                onClick={generateQuiz}
                disabled={loading || !topic.trim()}
                className="w-full rounded-2xl bg-[#76539b] px-6 py-4 font-semibold text-white shadow-lg shadow-[#76539b]/20 transition hover:-translate-y-0.5 hover:bg-[#8b68b2] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "✨ Preparing your quiz..."
                  : "Generate 5 Questions →"}
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-[#9d5968] bg-[#422733] p-5">
            <p className="font-semibold text-[#f0a1ae]">
              Something went wrong
            </p>

            <p className="mt-1 text-sm text-[#d995a3]">
              {error}
            </p>
          </div>
        )}

        {/* Quiz Paper */}
        {quiz &&
          currentQuestion < quiz.questions.length &&
          currentQuizQuestion && (
            <div className="paper-drop relative overflow-hidden rounded-[28px] border border-[#66517d] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:p-8">
              {/* Decorative corner */}
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-[80px] bg-[#49365c]" />

              <div className="relative">
                {/* Quiz top bar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c5a7df]">
                      {subject}
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#b9acc9]">
                      Question {currentQuestion + 1} of{" "}
                      {quiz.questions.length}
                    </p>
                  </div>

                  <div className="rounded-full bg-[#49365c] px-4 py-2 text-sm font-semibold text-[#d8baf0]">
                    Score: {score}
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-8 h-3 overflow-hidden rounded-full bg-[#493b55]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#9b7ac1] to-[#c99ab6] transition-all duration-500"
                    style={{
                      width: `${
                        ((currentQuestion + 1) /
                          quiz.questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                {/* Question */}
                <div className="rounded-2xl border border-[#66517d] bg-[#211b30] p-5 sm:p-6">
                  <div className="mb-4 text-2xl">📜</div>

                  <h2 className="text-xl font-bold leading-8 text-[#fffaf0] sm:text-2xl">
                    {currentQuizQuestion.question}
                  </h2>
                </div>

                {/* Options */}
                <div className="mt-6 space-y-3">
                  {currentQuizQuestion.options.map(
                    (option, index) => {
                      const correctAnswer =
                        currentQuizQuestion.correctAnswer;

                      const isCorrect = index === correctAnswer;
                      const isSelected = index === selectedAnswer;

                      let className =
                        "group flex w-full items-start rounded-2xl border p-4 text-left transition";

                      if (!answered) {
                        className +=
                          " border-[#66517d] bg-[#211b30] text-[#e8d9f5] hover:-translate-y-0.5 hover:border-[#a78ac7] hover:bg-[#49365c]";
                      }

                      if (answered && isCorrect) {
                        className +=
                          " border-[#568b67] bg-[#294335] text-[#b7e2c2]";
                      }

                      if (
                        answered &&
                        isSelected &&
                        !isCorrect
                      ) {
                        className +=
                          " border-[#9d5968] bg-[#422733] text-[#f0a1ae]";
                      }

                      if (
                        answered &&
                        !isCorrect &&
                        !isSelected
                      ) {
                        className +=
                          " border-[#493b55] bg-[#302541] text-[#8f819e]";
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => selectAnswer(index)}
                          disabled={answered}
                          className={className}
                        >
                          <span
                            className={`mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                              answered && isCorrect
                                ? "bg-[#568b67] text-white"
                                : answered &&
                                    isSelected &&
                                    !isCorrect
                                  ? "bg-[#9d5968] text-white"
                                  : "bg-[#49365c] text-[#d8baf0]"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>

                          <span className="pt-1 text-sm font-medium leading-6 sm:text-base">
                            {option}
                          </span>

                          {answered && isCorrect && (
                            <span className="ml-auto pl-3 text-lg text-[#9bd5ae]">
                              ✓
                            </span>
                          )}

                          {answered &&
                            isSelected &&
                            !isCorrect && (
                              <span className="ml-auto pl-3 text-lg text-[#f0a1ae]">
                                ✕
                              </span>
                            )}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Explanation */}
                {answered && (
                  <div className="mt-6 rounded-2xl border border-[#66517d] bg-[#49365c] p-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💡</span>

                      <p className="font-bold text-[#e8d9f5]">
                        Explanation
                      </p>
                    </div>

                    <p className="mt-2 leading-7 text-[#c7b9d2]">
                      {currentQuizQuestion.explanation}
                    </p>
                  </div>
                )}

                {/* Next button */}
                {answered && (
                  <button
                    onClick={() => {
                      if (
                        currentQuestion ===
                        quiz.questions.length - 1
                      ) {
                        setCurrentQuestion(
                          quiz.questions.length
                        );
                      } else {
                        nextQuestion();
                      }
                    }}
                    className="mt-6 w-full rounded-2xl bg-[#76539b] px-6 py-4 font-semibold text-white shadow-lg shadow-[#76539b]/20 transition hover:-translate-y-0.5 hover:bg-[#8b68b2]"
                  >
                    {currentQuestion ===
                    quiz.questions.length - 1
                      ? "View Results →"
                      : "Next Question →"}
                  </button>
                )}
              </div>
            </div>
          )}
      </div>
    </>
  );
}