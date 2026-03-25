"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md px-4">
      {/* Logo */}
      <div className="text-center mb-8">
        <span
          className="font-display text-3xl tracking-tight"
          style={{ color: "var(--kiwi-600)" }}
        >
          kiwify
        </span>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl p-8 shadow-sm"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          Bem-vindo de volta
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Entre na sua conta para continuar
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{
                background: "#fafaf9",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--kiwi-500)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{
                background: "#fafaf9",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--kiwi-500)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ background: "var(--kiwi-600)" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "var(--kiwi-700)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "var(--kiwi-600)")
            }
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
        kiwify © {new Date().getFullYear()}
      </p>
    </div>
  );
}
