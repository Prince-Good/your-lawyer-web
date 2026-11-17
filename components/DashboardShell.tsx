"use client";
import { useRouter } from "next/navigation";

export default function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <header className="flex items-center justify-between bg-[#0B1F3A] px-6 py-4 text-white">
        <span className="font-semibold tracking-wide">YOUR LAWYER</span>
        <button onClick={logout} className="text-sm underline decoration-[#C9A227] underline-offset-4">
          Sign out
        </button>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-semibold text-[#0B1F3A]">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}