//

import PublicFooter from "@/components/shared/footer/PublicFooter";
import PublicNavbar from "@/components/shared/navbar/public-navbar/PublicNavbar";
import { iChildren } from "@/interfaces";

export default function PublicLayout({ children }: iChildren) {
  return (
    <div className="custom_scrollbar min-h-screen flex flex-col">
      <PublicNavbar />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}
