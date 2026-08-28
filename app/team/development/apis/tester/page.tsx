import { redirect } from "next/navigation";

import { hasTeamPermission } from "../../../../../lib/team-permissions";
import ApiTesterClient from "./api-tester-client";

export default async function ApiTesterPage() {
  const allowed = await hasTeamPermission("manage_project");

  if (!allowed) {
    redirect("/team");
  }

  return <ApiTesterClient />;
}
