import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserFromJwt } from "@/lib/jwt/jwt";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/getInitials";
import { CreditCard, LogOutIcon, Settings, UserCircle } from "lucide-react";
import Link from "next/link";
import Logout from "../alerts/logout-alert";
import CustomButton from "../buttons/CustomButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function NavUser() {
  const decoded = await getUserFromJwt();

  const avatar = decoded?.avatar || "/avatar.png";

  if (!decoded) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-md cursor-pointer">
          <AvatarImage src={avatar} alt={decoded.name} />
          <AvatarFallback>{getInitials(decoded.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-56 max-h-80 md:max-h-96 overflow-y-auto mt-4",
          " [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:my-6 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/40 dark:[&::-webkit-scrollbar-thumb]:bg-gray-300/40 [&::-webkit-scrollbar-thumb]:rounded-full",
        )}
        align="end"
      >
        <DropdownMenuLabel className="flex items-start gap-3">
          <Avatar className="rounded-md cursor-pointer">
            <AvatarImage src={avatar} alt={decoded.name} />
            <AvatarFallback>{getInitials(decoded.name)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {decoded.name}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {decoded.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/my-profile"}>
              <UserCircle className="size-5" />{" "}
              <span className="inline-block mt-1">Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={"#"}>
              <CreditCard className="size-5" />
              <span className="inline-block mt-1">Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/settings"}>
              <Settings className="size-5" />
              <span className="inline-block mt-1">Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-sm" variant="destructive" asChild>
          <Logout>
            <CustomButton
              icon={LogOutIcon}
              iconClass="size-5"
              className="w-full justify-start pl-2 bg-background text-foreground hover:bg-destructive/20"
            >
              Log out
            </CustomButton>
          </Logout>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
