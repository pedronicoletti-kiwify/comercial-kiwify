import { Settings } from "lucide-react";

export default function SetupPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "#f5f3ff" }}
        >
          <Settings size={20} style={{ color: "#7c3aed" }} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
            Setup
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Configurações e onboarding de novos clientes
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-8 text-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Páginas específicas em construção. Defina os módulos para continuar.
        </p>
      </div>
    </div>
  );
}
