import MyPaymentsTable from "@/components/modules/tourist/payments/MyPaymentsTable";
import PaginationComponent from "@/components/PaginationComponent";
import PaymentFilters from "@/components/shared/filters/PaymentFilters";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iPayment } from "@/interfaces/tour.interfaces";
import { myPayments } from "@/services/payment.services";
import { queryFormatter } from "@/utils/queryFormatter";
import { Suspense } from "react";

interface MyBookingsProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentHistory({
  searchParams,
}: MyBookingsProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const { data, meta } = (await myPayments(query)) as iResponse<iPayment[]>;

  const totalPages = meta?.total_pages || 1;
  const currentPage = meta?.present_page || 1;
  const totalAmount = meta?.options?.totalAmount || 0;
  const pendingAmount = meta?.options?.pendingAmount || 0;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Payment History"
        description="My payment information and details"
      />

      <div className="grid lg:grid-cols-12 gap-4 mt-10">
        <PaymentFilters className="my-10 lg:my-0 static lg:col-span-3" />

        <div className="flex flex-col lg:col-span-9 border rounded-2xl py-4">
          <div className="flex-1">
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
              <MyPaymentsTable payments={data || []} />
            </Suspense>

            <div className="border-t p-3 flex flex-wrap justify-end gap-4 whitespace-nowrap text-muted-foreground text-sm">
              {pendingAmount && (
                <p>
                  Total pending amount:{" "}
                  <span className="text-foreground font-medium">
                    {pendingAmount}
                  </span>
                </p>
              )}
              {totalAmount && (
                <p>
                  Total amount you paid:{" "}
                  <span className="text-foreground font-medium">
                    {totalAmount}
                  </span>
                </p>
              )}
            </div>
          </div>

          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
