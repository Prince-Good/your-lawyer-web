export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="font-serif text-5xl font-semibold">
          YOUR <span className="text-gold-400">LAWYER</span>
        </h1>
        <p className="mt-6 text-lg text-navy-100">
          Find a verified lawyer, book a consultation and manage your legal matter in one secure place.
        </p>
        <button className="mt-8 rounded-xl bg-gold-400 px-6 py-3 font-semibold text-navy-900 hover:bg-gold-500">
          Find a lawyer
        </button>
      </div>
    </main>
  );
}