//

import { MyDetailsForm } from "@/components/modules/settings/MyDetailsForm";
import { getUserFromJwt } from "@/lib/jwt/jwt";

export default async function SettingsPage() {
  const user = await getUserFromJwt();

  if (!user) return <div>User not found</div>;

  return (
    <div className="mt-8">
      <MyDetailsForm user={user} />
    </div>
  );
}
