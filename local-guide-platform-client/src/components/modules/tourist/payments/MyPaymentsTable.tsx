"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { iPayment } from "@/interfaces/tour.interfaces";
import { myPaymentsColumns } from "./MyPaymentsColumns";

interface iProps {
  payments: iPayment[];
}

export default function MyPaymentsTable({ payments }: iProps) {
  // const router = useRouter();

  return (
    <ManagementTable
      data={payments}
      columns={myPaymentsColumns}
      rowKey={({ id }) => id}
      emptyMessage="No bookings found"
      isRefresh={false}
    />
  );
}
