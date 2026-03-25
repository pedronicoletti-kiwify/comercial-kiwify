export type UserRole =
  | "gestao_comercial"
  | "src"
  | "setup"
  | "success_ops"
  | "small_business";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

// Which panels each role can access
export const ROLE_ACCESS: Record<UserRole, UserRole[]> = {
  gestao_comercial: [
    "gestao_comercial",
    "src",
    "setup",
    "success_ops",
    "small_business",
  ],
  src:            ["src"],
  setup:          ["setup"],
  success_ops:    ["success_ops"],
  small_business: ["small_business"],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  gestao_comercial: "Gestão Comercial",
  src:              "SRC",
  setup:            "Setup",
  success_ops:      "Success Ops",
  small_business:   "Small Business",
};

export const ROLE_ROUTES: Record<UserRole, string> = {
  gestao_comercial: "/gestao-comercial",
  src:              "/src",
  setup:            "/setup",
  success_ops:      "/success-ops",
  small_business:   "/small-business",
};
