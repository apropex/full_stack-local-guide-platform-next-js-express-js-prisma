//

import PublicNavbar from "@/components/shared/navbar/public-navbar/PublicNavbar";
import { iChildren } from "@/interfaces";

export default function PublicLayout({ children }: iChildren) {
  return (
    <div className="">
      <PublicNavbar />
      <div>{children}</div>
    </div>
  );
}
