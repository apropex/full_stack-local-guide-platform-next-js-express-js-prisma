import { UserIcon } from "lucide-react";
import Image from "next/image";

interface UserInfoCellProps {
  name: string;
  email: string;
  avatar?: string;
}

export default function UserInfoCell({ name, email, avatar }: UserInfoCellProps) {
  return (
    <div className="flex text-center justify-start gap-1 w-auto">
      {avatar ? (
        <Image
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC..."
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className="size-9 object-cover rounded-xs"
        />
      ) : (
        <UserIcon className="size-5" />
      )}

      <div className="text-left">
        <p>{name}</p>
        <p className="text-foreground/70">{email}</p>
      </div>
    </div>
  );
}
