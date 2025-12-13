import SettingsNav from "@/components/modules/settings/SettingsNav";
import { iChildren } from "@/interfaces";

export default function SettingsLayout({ children }: iChildren) {
  return (
    <div className="mt-24 px-4">
      <SettingsNav />
      <div className="mt-12 p-5 md:p-10 container mx-auto border bg-card/50 rounded-3xl">
        {children}
      </div>
    </div>
  );
}
