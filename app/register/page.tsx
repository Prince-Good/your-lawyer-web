"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell, { inputClass, buttonClass } from "@/components/AuthShell";
import { dashboardFor } from "@/lib/roles";

const roles = [
  { value: "CLIENT", label: "I need a lawyer", hint: "Post a case and compare quotes" },
  { value: "LAWYER", label: "I am a lawyer", hint: "Find cases and send your fee" },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"CLIENT" | "LAWYER">("CLIENT");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
          role,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          res.status === 409
            ? "That email is already registered. Sign in instead."
            : "Check your details: name of 2+ characters, a valid email, password of 8+ characters."
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
    <AuthShell title="Create your account" subtitle="Choose how you will use YOUR LAWYER.">
      <form onSubmit={onSubmit} className="space-y-5">
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">Account type</legend>
          {roles.map((r) => (
            <label
              key={r.value}
              className={`cursor-pointer rounded-md border p-3 ${
                role === r.value
                  ? "border-[#C9A227] bg-white ring-2 ring-[#C9A227]/40"
                  : "border-slate-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r.value}
                checked={role === r.value}
                onChange={() => setRole(r.value)}
                className="sr-only"
              />
              <span className="block font-medium text-[#0B1F3A]">{r.label}</span>
              <span className="block text-sm text-slate-600">{r.hint}</span>
            </label>
          ))}
        </fieldset>

        <label className="block text-sm font-medium text-slate-700">
          Full name
          <input name="name" autoComplete="name" required minLength={2} className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input name="email" type="email" autoComplete="email" required className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Password
          <input name="password" type="password" autoComplete="new-password" required minLength={8} className={inputClass} />
          <span className="mt-1 block text-xs text-slate-500">At least 8 characters.</span>
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-[#0B1F3A] underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}