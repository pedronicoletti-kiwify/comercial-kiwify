import { Star } from "lucide-react";

export default function SuccessOpsPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "#fffbeb" }}
        >
          <Star size={20} style={{ color: "#d97706" }} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
            Success Ops
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Acompanhamento de contas e desempenho individual
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
