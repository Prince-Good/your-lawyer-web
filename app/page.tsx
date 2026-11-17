import Link from "next/link";

const quotes = [
  { name: "Adaeze Okafor", detail: "12 years, property law", fee: "₦180,000" },
  { name: "Tunde Bakare", detail: "8 years, property law", fee: "₦150,000" },
  { name: "Ngozi Eze", detail: "15 years, property law", fee: "₦240,000" },
];

const steps = [
  { title: "Describe your case", text: "Tell us what happened and what you need. It takes a few minutes." },
  { title: "Compare quotes", text: "Verified lawyers read your case and send their own fee." },
  { title: "Choose and pay", text: "Pick the lawyer you want and pay through the platform." },
  { title: "Manage your matter", text: "Message your lawyer and keep your documents in one place." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-800">
      <section className="bg-[#0B1F3A] text-white">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <span className="font-semibold tracking-wide">YOUR LAWYER</span>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/login" className="underline decoration-[#C9A227] underline-offset-4">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-[#C9A227] px-4 py-2 font-medium text-[#0B1F3A] hover:bg-[#B8921F]"
            >
              Create account
            </Link>
          </nav>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 lg:grid-cols-2 lg:items-center lg:pt-20">
          <div>
            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Describe your case once. Verified lawyers reply with their fee.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Find a verified lawyer, book a consultation and manage your legal matter in one secure place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-md bg-[#0B7A55] px-6 py-3 text-center font-medium text-white hover:bg-[#096346]"
              >
                Post your case
              </Link>
              <Link
                href="/register"
                className="rounded-md border border-white/40 px-6 py-3 text-center font-medium hover:bg-white/10"
              >
                I am a lawyer
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 text-slate-800 shadow-lg sm:p-6">
            <p className="text-sm text-slate-500">Example case</p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-[#0B1F3A]">
              Landlord refuses to return my deposit
            </h2>
            <p className="mt-1 text-sm text-slate-600">3 quotes received</p>
            <ul className="mt-4 divide-y divide-slate-200 border-t border-slate-200">
              {quotes.map((q) => (
                <li key={q.name} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium">{q.name}</p>
                    <p className="text-sm text-slate-500">{q.detail}</p>
                  </div>
                  <p className="whitespace-nowrap font-semibold text-[#0B7A55]">{q.fee}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl font-semibold text-[#0B1F3A]">How it works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-[#C9A227] pt-4">
              <p className="text-sm text-slate-500">Step {i + 1}</p>
              <h3 className="mt-1 font-semibold text-[#0B1F3A]">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#0B1F3A]">Are you a lawyer?</h2>
            <p className="mt-1 text-slate-600">Set your own fees and reach clients with cases that match your practice.</p>
          </div>
          <Link
            href="/register"
            className="rounded-md bg-[#0B1F3A] px-6 py-3 text-center font-medium text-white hover:bg-[#13315a]"
          >
            Join as a lawyer
          </Link>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-8 text-sm text-slate-500">
        © 2026 YOUR LAWYER. Built for Nigeria.
      </footer>
    </div>
  );
}