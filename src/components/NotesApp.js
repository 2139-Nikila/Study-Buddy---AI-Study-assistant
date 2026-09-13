"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "../lib/supabase";

const supabase = createSupabaseClient();

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Unable to load notes. Please check your Supabase connection.");
      setIsLoading(false);
      return;
    }

    setNotes(data || []);
    setIsLoading(false);
  }

  function openNewNoteForm() {
    setSubject("");
    setTitle("");
    setContent("");
    setError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    if (!isSaving) {
      setIsFormOpen(false);
    }
  }

  async function saveNote(event) {
    event.preventDefault();

    const trimmedSubject = subject.trim();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedSubject || !trimmedTitle || !trimmedContent) {
      setError("Please fill in Subject, Title, and Content.");
      return;
    }

    setIsSaving(true);
    setError("");

    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          subject: trimmedSubject,
          title: trimmedTitle,
          content: trimmedContent,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      setError("Unable to save note. Please check your Supabase setup.");
      setIsSaving(false);
      return;
    }

    setNotes((currentNotes) => [data, ...currentNotes]);

    setSubject("");
    setTitle("");
    setContent("");
    setIsFormOpen(false);
    setIsSaving(false);
  }

  async function deleteNote(noteId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      console.error(error);
      setError("Unable to delete note.");
      return;
    }

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId)
    );

    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
    }
  }

  function formatDate(dateString) {
    if (!dateString) {
      return "Recently";
    }

    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="relative mb-8 overflow-hidden rounded-[26px] border border-[#d8c4aa] bg-gradient-to-br from-[#403050] via-[#302541] to-[#211b30] p-6 shadow-[0_14px_35px_rgba(77,54,91,0.08)] sm:p-8">
        <div className="absolute -right-10 -top-16 text-[150px] opacity-10">
          🏰
        </div>

        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-[#d7bd91] bg-white/60 px-3 py-1 text-xs font-semibold text-[#795d43]">
              📜 Your magical notebook
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#302342] sm:text-4xl">
              My Notes
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#746579] sm:text-base">
              Capture your lessons, preserve your ideas, and return to your
              knowledge whenever you need it.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewNoteForm}
            className="magic-button inline-flex shrink-0 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
          >
            ✨ New Note
          </button>
        </div>
      </section>

      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="parchment-card p-10 text-center text-[#887a8e]">
          <div className="mb-3 text-3xl">📖</div>
          <p className="text-sm font-medium">Opening your notebook...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="parchment-card p-12 text-center">
          <div className="mb-4 text-5xl">📜</div>

          <h2 className="text-xl font-bold text-[#382848]">
            Your notebook is waiting
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#887a8e]">
            Create your first note and begin building your personal collection
            of magical study knowledge.
          </p>

          <button
            type="button"
            onClick={openNewNoteForm}
            className="magic-button mt-6 rounded-xl px-5 py-3 text-sm font-semibold"
          >
            Create your first note →
          </button>
        </div>
      ) : (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#302342]">
                Your Collection
              </h2>
              <p className="mt-1 text-sm text-[#887a8e]">
                {notes.length} note{notes.length === 1 ? "" : "s"} saved in
                your study room.
              </p>
            </div>

            <span className="rounded-full bg-[#e9dfef] px-3 py-1 text-xs font-semibold text-[#725493]">
              ✦ Saved notes
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {notes.map((note, index) => (
              <article
                key={note.id}
                className={`parchment-card group relative flex flex-col overflow-hidden p-5 transition duration-200 hover:-translate-y-1 ${
                  index % 2 === 0 ? "rotate-[0.2deg]" : "rotate-[-0.2deg]"
                }`}
              >
                <div className="absolute right-5 top-0 h-1 w-20 rounded-b-full bg-[#c9a66d]/60" />

                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="rounded-full border border-[#d5c5e2] bg-[#eee5f5] px-3 py-1 text-xs font-semibold text-[#725493]">
                    {note.subject}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    className="rounded-lg px-2 py-1 text-xs font-semibold text-[#a59aa9] transition hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>

                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eadff1] text-2xl">
                    📖
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-bold leading-6 text-[#382848]">
                      {note.title}
                    </h2>
                    <p className="mt-1 text-xs text-[#a195a8]">
                      A page from your study journey
                    </p>
                  </div>
                </div>

                <p className="flex-1 whitespace-pre-wrap text-sm leading-6 text-[#75697e]">
                  {getPreview(note.content)}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e8dccd] pt-4">
                  <p className="text-xs text-[#a195a8]">
                    {formatDate(note.updated_at || note.created_at)}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedNote(note)}
                    className="rounded-lg bg-[#eee5f5] px-3 py-2 text-sm font-semibold text-[#725493] transition hover:bg-[#e2d4ec]"
                  >
                    Open note →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {isFormOpen ? (
        <Modal title="Create a New Note" onClose={closeForm}>
          <form onSubmit={saveNote} className="space-y-5">
            <div className="rounded-xl border border-[#dfcda8] bg-[#fff5dc] px-4 py-3 text-sm leading-6 text-[#8a704a]">
              ✨ Write down something worth remembering.
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#5b4d66]">
                Subject
              </span>

              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Operating Systems"
                className="w-full rounded-xl border border-[#d9cbe2] bg-[#fffdf8] px-4 py-3 text-sm text-[#382848] outline-none transition placeholder:text-[#b2a6b8] focus:border-[#9274b4] focus:ring-2 focus:ring-[#dcd0e8]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#5b4d66]">
                Note Title
              </span>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Process scheduling"
                className="w-full rounded-xl border border-[#d9cbe2] bg-[#fffdf8] px-4 py-3 text-sm text-[#382848] outline-none transition placeholder:text-[#b2a6b8] focus:border-[#9274b4] focus:ring-2 focus:ring-[#dcd0e8]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#5b4d66]">
                Content
              </span>

              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write your note here..."
                rows={8}
                className="w-full resize-y rounded-xl border border-[#d9cbe2] bg-[#fffdf8] px-4 py-3 text-sm leading-6 text-[#382848] outline-none transition placeholder:text-[#b2a6b8] focus:border-[#9274b4] focus:ring-2 focus:ring-[#dcd0e8]"
              />
            </label>

            <div className="flex justify-end gap-3 border-t border-[#eadfce] pt-4">
              <button
                type="button"
                onClick={closeForm}
                disabled={isSaving}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#7e7189] transition hover:bg-[#f1e9f4] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="magic-button rounded-xl px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save Note ✦"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {selectedNote ? (
        <Modal
          title={selectedNote.title}
          onClose={() => setSelectedNote(null)}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eadff1] text-2xl">
              📜
            </div>

            <div>
              <p className="text-sm font-semibold text-[#725493]">
                {selectedNote.subject}
              </p>
              <p className="mt-1 text-xs text-[#a195a8]">
                Your saved study note
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-[#fffaf0] p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#5b4d66]">
              {selectedNote.content}
            </p>
          </div>

          <p className="mt-5 text-xs text-[#a195a8]">
            Last edited:{" "}
            {formatDate(selectedNote.updated_at || selectedNote.created_at)}
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => deleteNote(selectedNote.id)}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Delete
            </button>

            <button
              type="button"
              onClick={() => setSelectedNote(null)}
              className="magic-button rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              Close ✦
            </button>
          </div>
        </Modal>
      ) : null}
    </main>
  );
}

function getPreview(content) {
  if (!content) {
    return "No preview available.";
  }

  if (content.length <= 120) {
    return content;
  }

  return `${content.slice(0, 120).trim()}...`;
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#21172d]/55 p-4 backdrop-blur-sm sm:items-center">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[24px] border border-[#d8c4aa] bg-gradient-to-br from-[#fffdf7] to-[#f5eadc] p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#eadfce] pb-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#a18b6e]">
              ✦ Parchment page
            </p>

            <h2 className="text-2xl font-bold text-[#382848]">{title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm font-semibold text-[#8d7d98] transition hover:bg-[#eee5f5] hover:text-[#5d4776]"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
<style jsx global>{`
  @keyframes paperDrop {
    from {
      opacity: 0;
      transform: translateY(18px) rotate(-1deg);
    }

    to {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
  }

  .parchment-card {
    animation: paperDrop 0.45s ease-out both;
  }

  .magic-button {
    background: linear-gradient(135deg, #9b7bc4, #c69acb);
    color: white;
    box-shadow: 0 8px 18px rgba(126, 91, 157, 0.22);
    transition: all 0.2s ease;
  }

  .magic-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(126, 91, 157, 0.3);
  }

  .magic-button:active {
    transform: translateY(0);
  }
`}</style>