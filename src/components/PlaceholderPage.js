export default function PlaceholderPage({ title, description }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
        {description}
      </p>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
        This page is a placeholder. The dashboard UI is ready first, and this
        section can be built next.
      </div>
    </main>
  );
}
