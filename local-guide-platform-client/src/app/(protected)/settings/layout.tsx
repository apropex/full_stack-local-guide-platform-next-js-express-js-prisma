import SettingsNav from "@/components/modules/settings/SettingsNav";
import { iChildren } from "@/interfaces";

export default function SettingsLayout({ children }: iChildren) {
  return (
    <div className="mt-24">
      <SettingsNav />
      <div>{children}</div>
    </div>
  );
}
