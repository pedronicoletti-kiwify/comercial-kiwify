import { BarChart3 } from "lucide-react";

export default function GestaoComercialPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "var(--kiwi-50)" }}
        >
          <BarChart3 size={20} style={{ color: "var(--kiwi-600)" }} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
            Gestão Comercial
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Visão geral, metas e performance do time
          </p>
        </div>
      </div>

      {/* Placeholder content */}
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
