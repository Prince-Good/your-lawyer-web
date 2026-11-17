import Link from "next/link";

export const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[#0B7A55] focus:ring-2 focus:ring-[#C9A227]/50";

export const buttonClass =
  "w-full rounded-md bg-[#0B7A55] px-4 py-2.5 font-medium text-white hover:bg-[#096346] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen bg-[#F4F6F8] lg:grid-cols-[2fr_3fr]">
      <aside className="hidden flex-col justify-between bg-[#0B1F3A] p-12 text-white lg:flex">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          YOUR LAWYER
        </Link>
        <div className="max-w-sm">
          <div className="mb-6 h-1 w-12 bg-[#C9A227]" />
          <p className="font-serif text-3xl leading-snug">
            Describe your case once. Verified lawyers reply with their fee.
          </p>
        </div>
        <p className="text-sm text-white/70">
          Lawyers set their own fees. You accept the quote you prefer.
        </p>
      </aside>

      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 block font-semibold text-[#0B1F3A] lg:hidden">
            YOUR LAWYER
          </Link>
          <h1 className="text-2xl font-semibold text-[#0B1F3A]">{title}</h1>
          <p className="mt-1 text-slate-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}