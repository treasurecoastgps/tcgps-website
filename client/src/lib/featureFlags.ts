// Central feature-flag switches for staged rollout.
// Flip VITE_PORTAL_ENABLED=true in the environment once the investor portal
// backend (Phase 1-5 of PLATFORM_ARCHITECTURE.md) is live. Until then, all
// /app, /ops, /login, and /register routes render the "Coming Soon" page
// instead of the demo-data portal, per the launch plan in
// investor-platform-project-document.html (Section 06).
export const PORTAL_ENABLED: boolean =
  String(import.meta.env.VITE_PORTAL_ENABLED).toLowerCase() === "true";
