import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BarChart3, Users, Settings, Star, Store } from "lucide-react";
import type { UserProfile, UserRole } from "@/types";
import { ROLE_ACCESS, ROLE_LABELS } from "@/types";
import Link from "next/link";

const PANEL_CONFIG = [
  {
    role: "gestao_comercial" as UserRole,
    label: "Gestão Comercial",
    href: "/gestao-comercial",
    icon: BarChart3,
    description: "Visão geral, metas e performance do time comercial.",
    color: "var(--kiwi-600)",
    bg: "var(--kiwi-50)",
  },
  {
    role: "src" as UserRole,
    label: "SRC",
    href: "/src",
    icon: Users,
    description: "Gestão de leads, funil e acompanhamento de SRC.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    role: "setup" as UserRole,
    label: "Setup",
    href: "/setup",
    icon: Settings,
    description: "Configurações e onboarding de novos clientes.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    role: "success_ops" as UserRole,
    label: "Success Ops",
    href: "/success-ops",
    icon: Star,
    description: "Acompanhamento de contas e desempenho individual.",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    role: "small_business" as UserRole,
    label: "Small Business",
    href: "/small-business",
    icon: Store,
    description: "Gestão e suporte ao segmento de pequenos negócios.",
    color: "#db2777",
    bg: "#fdf2f8",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  const typedProfile = profile as UserProfile;
  const allowedPanels = ROLE_ACCESS[typedProfile.role];
  const visiblePanels = PANEL_CONFIG.filter((p) =>
    allowedPanels.includes(p.role)
  );

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
          {greeting},{" "}
          <span style={{ color: "var(--kiwi-600)" }}>
            {typedProfile.full_name?.split(" ")[0]}
          </span>{" "}
          👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {ROLE_LABELS[typedProfile.role]} · Acesso a {visiblePanels.length}{" "}
          {visiblePanels.length === 1 ? "painel" : "painéis"}
        </p>
      </div>

      {/* Panel cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visiblePanels.map((panel) => {
          const Icon = panel.icon;
          return (
            <Link
              key={panel.role}
              href={panel.href}
              className="group rounded-xl p-6 transition-all hover:shadow-md"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: panel.bg }}
                >
                  <Icon size={20} style={{ color: panel.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {panel.label}
                  </h2>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {panel.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
