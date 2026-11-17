"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell, { inputClass, buttonClass } from "@/components/AuthShell";
import { dashboardFor } from "@/lib/roles";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          res.status === 401
            ? "Email or password is incorrect."
            : "Enter a valid email and password."
        );
        return;
      }
      router.push(dashboardFor(data.role));
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Sign in" subtitle="Welcome back. Pick up where you left off.">
      <form onSubmit={onSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input name="email" type="email" autoComplete="email" required className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Password
          <input name="password" type="password" autoComplete="current-password" required className={inputClass} />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        New here?{" "}
        <Link href="/register" className="font-medium text-[#0B1F3A] underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}