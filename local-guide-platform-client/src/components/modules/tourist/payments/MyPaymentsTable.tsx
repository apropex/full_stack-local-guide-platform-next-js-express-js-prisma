"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import ManagementTable from "@/components/shared/ManagementTable";
import { PaymentStatus } from "@/constants";
import { iPayment } from "@/interfaces/tour.interfaces";
import { repayment } from "@/services/payment.services";
import { urid } from "@/utils";
import { myPaymentsColumns } from "./MyPaymentsColumns";

interface iProps {
  payments: iPayment[];
}

export default function MyPaymentsTable({ payments }: iProps) {
  const handleRepayment = async (payment: iPayment) => {
    if (payment.status === PaymentStatus.SUCCESS) {
      _alert.warn("You already successfully paid the payment.");
      return;
    }

    if (!payment.booking?.id) {
      _alert.error("Booking ID not found");
      return;
    }

    const id = _alert.loading("We are trying to make this payment", {
      id: urid(),
    });

    const result = await repayment(payment.booking.id);
    const paymentURL = result.meta?.options?.paymentURL;

    _alert.dismiss(id);
    if (result.success && paymentURL) {
      _alert.success("You paid the payment successfully!");
      window.location.href = paymentURL;
    } else {
      _alert.error("Failed to make payment", result.message);
    }
  };

  return (
    <ManagementTable
      data={payments}
      columns={myPaymentsColumns}
      rowKey={({ id }) => id}
      randomFn={(payment) => handleRepayment(payment)}
      randomFnTitle="Make Payment"
      emptyMessage="No bookings found"
      isRefresh={false}
    />
  );
}
