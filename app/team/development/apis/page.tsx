import { redirect } from "next/navigation";

import { hasTeamPermission } from "../../../../lib/team-permissions";

import APIsClient from "./apis-client";

export default async function APIsPage() {
  const allowed = await hasTeamPermission("manage_project");

  if (!allowed) {
    redirect("/team");
  }

  return <APIsClient />;
}
