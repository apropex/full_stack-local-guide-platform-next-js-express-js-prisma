//

import { ProfileSettings } from "@/components/modules/settings/ProfileSettings";
import { iUser } from "@/interfaces/user.interfaces";
import { getMe } from "@/services/user.services";

export default async function ProfileSettingsPage() {
  const result = await getMe();

  if (!result.data) return <div>User not found</div>;

  return (
    <div className="mt-8 container mx-auto">
      <ProfileSettings initialData={result.data as iUser} />
    </div>
  );
}
