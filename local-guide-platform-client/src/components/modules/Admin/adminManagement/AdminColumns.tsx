import { iTableColumns } from "@/components/shared/ManagementTable";
import UserInfoCell from "@/components/shared/UserInfoCell";
import UserStatusCell from "@/components/shared/UserStatusCell";
import { iAdmin } from "@/interfaces/user.interfaces";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";

export const adminColumns: iTableColumns<iAdmin>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <UserInfoCell
        name={admin.user?.name}
        email={admin.user?.email}
        avatar={admin.user?.avatar?.url ?? admin.user?.socialImageUrl}
      />
    ),
  },
  {
    header: "DOB",
    accessor: ({ dob }) => formatDate(dob),
  },
  {
    header: "NID",
    accessor: ({ nid }) => nid,
  },
  {
    header: "Joined",
    accessor: ({ createdAt }) => formatDate(createdAt),
  },
  {
    header: "Verified",
    accessor: ({ isVerifiedAdmin }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-sm rounded-xs",
          {
            "bg-green-600": isVerifiedAdmin,
          },
        )}
      >
        {String(isVerifiedAdmin)}
      </span>
    ),
  },
  {
    header: "Verifier",
    accessor: (admin) => (
      <UserInfoCell
        name={admin.verifier?.user?.name ?? ""}
        email={admin.verifier?.user?.email ?? ""}
        // avatar={admin.user?.avatar?.url ?? admin.user?.socialImageUrl}
      />
    ),
  },
  {
    header: "Status",
    accessor: (admin) => <UserStatusCell status={admin.user?.status} />,
  },
];
