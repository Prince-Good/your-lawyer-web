export function dashboardFor(role: string): string {
  switch (role) {
    case "ADMIN": return "/admin";
    case "LAWYER": return "/lawyer";
    default: return "/client";
  }
}