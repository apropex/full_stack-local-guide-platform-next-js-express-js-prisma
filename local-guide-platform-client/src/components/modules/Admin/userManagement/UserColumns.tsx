import { iTableColumns } from "@/components/shared/ManagementTable";
import UserInfoCell from "@/components/shared/UserInfoCell";
import UserStatusCell from "@/components/shared/UserStatusCell";
import { Role } from "@/constants";
import { iUser } from "@/interfaces/user.interfaces";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";

export const userColumns: iTableColumns<iUser>[] = [
  {
    header: "Tourist",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        avatar={user.avatar?.url ?? user?.socialImageUrl}
      />
    ),
  },
  {
    header: "Phone",
    accessor: ({ phone }) => phone,
  },
  {
    header: "Gender",
    accessor: ({ gender }) => <span className="capitalize">{gender}</span>,
  },
  {
    header: "Language",
    accessor: ({ language }) => language,
  },
  {
    header: "Role",
    accessor: ({ role }) => (
      <span
        className={cn(
          "uppercase bg-green-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-purple-600": role === Role.GUIDE,
            "bg-amber-600": role === Role.TOURIST,
          },
        )}
      >
        {role}
      </span>
    ),
  },
  {
    header: "Verified",
    accessor: ({ isVerified }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": isVerified,
          },
        )}
      >
        {String(isVerified)}
      </span>
    ),
  },
  {
    header: "Deleted",
    accessor: ({ isDeleted }) => (
      <span
        className={cn(
          "uppercase bg-destructive text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": !isDeleted,
          },
        )}
      >
        {String(isDeleted)}
      </span>
    ),
  },
  {
    header: "Joined",
    accessor: ({ createdAt }) => formatDate(createdAt),
  },
  {
    header: "Status",
    accessor: ({ status }) => <UserStatusCell status={status} />,
  },
];
