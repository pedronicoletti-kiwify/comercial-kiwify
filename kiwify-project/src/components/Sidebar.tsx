"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Users,
  Settings,
  Star,
  Store,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile, UserRole } from "@/types";
import { ROLE_ACCESS, ROLE_LABELS } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  role: UserRole;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Gestão Comercial",
    href: "/gestao-comercial",
    icon: <BarChart3 size={18} />,
    role: "gestao_comercial",
  },
  {
    label: "SRC",
    href: "/src",
    icon: <Users size={18} />,
    role: "src",
  },
  {
    label: "Setup",
    href: "/setup",
    icon: <Settings size={18} />,
    role: "setup",
  },
  {
    label: "Success Ops",
    href: "/success-ops",
    icon: <Star size={18} />,
    role: "success_ops",
  },
  {
    label: "Small Business",
    href: "/small-business",
    icon: <Store size={18} />,
    role: "small_business",
  },
];

interface SidebarProps {
  profile: UserProfile;
}

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const allowedPanels = ROLE_ACCESS[profile.role];

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const visibleItems = NAV_ITEMS.filter((item) =>
    allowedPanels.includes(item.role)
  );

  return (
    <aside
      className="w-60 min-h-screen flex flex-col shrink-0"
      style={{
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center px-6"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span
          className="font-display text-2xl tracking-tight"
          style={{ color: "var(--kiwi-600)" }}
        >
          kiwify
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            color: pathname === "/dashboard" ? "var(--kiwi-700)" : "var(--text-muted)",
            background: pathname === "/dashboard" ? "var(--kiwi-50)" : "transparent",
          }}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        {/* Separator */}
        <div className="pt-3 pb-1 px-3">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#a8a29e" }}>
            Painéis
          </span>
        </div>

        {visibleItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group"
              style={{
                color: isActive ? "var(--kiwi-700)" : "var(--text-muted)",
                background: isActive ? "var(--kiwi-50)" : "transparent",
              }}
            >
              <span
                style={{ color: isActive ? "var(--kiwi-600)" : "var(--text-muted)" }}
              >
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight size={14} style={{ color: "var(--kiwi-500)" }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg mb-1">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: "var(--kiwi-600)" }}
          >
            {profile.full_name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
              {profile.full_name}
            </p>
            <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
              {ROLE_LABELS[profile.role]}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#fef2f2";
            (e.currentTarget as HTMLElement).style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  );
}
