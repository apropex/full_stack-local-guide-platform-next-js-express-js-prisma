import { iTableColumns } from "@/components/shared/ManagementTable";
import UserInfoCell from "@/components/shared/UserInfoCell";
import UserStatusCell from "@/components/shared/UserStatusCell";
import { iGuide } from "@/interfaces/user.interfaces";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";

export const guideColumns: iTableColumns<iGuide>[] = [
  {
    header: "Guide",
    accessor: (guide) => (
      <UserInfoCell
        name={guide.user?.name}
        email={guide.user?.email}
        avatar={guide.user?.avatar?.url ?? guide.user?.socialImageUrl}
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
    accessor: ({ isVerifiedGuide }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-sm rounded-xs",
          {
            "bg-green-600": isVerifiedGuide,
          },
        )}
      >
        {String(isVerifiedGuide)}
      </span>
    ),
  },
  {
    header: "Verifier",
    accessor: (guide) => (
      <UserInfoCell
        name={guide.verifier?.user?.name ?? ""}
        email={guide.verifier?.user?.email ?? ""}
      />
    ),
  },
  {
    header: "Status",
    accessor: (guide) => <UserStatusCell status={guide.user?.status} />,
  },
];
