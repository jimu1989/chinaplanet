import { redirect } from "next/navigation";

import { hasTeamPermission } from "../../../../lib/team-permissions";

import SystemHealthClient from "./system-health-client";

export default async function SystemHealthPage() {
  const allowed = await hasTeamPermission("manage_project");

  if (!allowed) {
    redirect("/team");
  }

  return <SystemHealthClient />;
}
