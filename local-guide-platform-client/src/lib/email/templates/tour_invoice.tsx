import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface InvoiceEmailProps {
  // Customer
  customerName: string;
  customerEmail: string;

  // Booking & Tour
  bookingId: string;
  tourTitle: string;
  tourDate: string; // e.g., "December 15, 2025"
  tourTime?: string; // e.g., "9:00 AM"
  duration: string; // e.g., "4 hours" or "2 days"
  location: string;

  // Payment
  invoiceId: string;
  invoiceDate: string; // e.g., "December 4, 2025"
  paymentId: string;
  transactionId: string;
  paymentMethod: string; // e.g., "Credit Card", "GCash", "PayMaya"
  subtotal: string;
  tax?: string;
  discount?: string;
  totalAmount: string;

  // Optional
  guideName?: string;
  groupSize?: number;
  appName?: string;
  logoUrl?: string;
}

export const InvoiceEmail = ({
  customerName,
  customerEmail,
  bookingId,
  tourTitle,
  tourDate,
  tourTime,
  duration,
  location,
  invoiceId,
  invoiceDate,
  paymentId,
  transactionId,
  paymentMethod,
  subtotal,
  tax = "0.00",
  discount = "0.00",
  totalAmount,
  guideName,
  groupSize,
  appName = "PH Tour",
  logoUrl = "https://yourdomain.com/logo.png", // Replace with your actual logo
}: InvoiceEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Invoice #{invoiceId} – Your {tourTitle} booking is confirmed!
      </Preview>

      <Tailwind>
        <Body className="bg-gray-50 font-sans antialiased">
          <Container className="mx-auto my-12 max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-100">
            {/* Header */}
            <Section className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-t-2xl px-10 py-8 text-white">
              <Row>
                <Column>
                  {logoUrl ? (
                    <Img
                      src={logoUrl}
                      alt={appName}
                      width="160"
                      className="mb-4"
                    />
                  ) : (
                    <Heading className="text-3xl font-bold text-white">
                      {appName}
                    </Heading>
                  )}
                  <Text className="text-indigo-100 text-lg mt-2">
                    Official Invoice
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="text-4xl font-extrabold opacity-90">
                    INVOICE
                  </Text>
                  <Text className="text-indigo-100 mt-2">#{invoiceId}</Text>
                </Column>
              </Row>
            </Section>

            <Section className="px-10 py-8">
              {/* Invoice Info */}
              <Row className="mb-8">
                <Column>
                  <Text className="text-sm text-gray-500">Invoice Date</Text>
                  <Text className="font-semibold text-gray-900">
                    {invoiceDate}
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="text-sm text-gray-500">Payment Status</Text>
                  <Text className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-800">
                    PAID
                  </Text>
                </Column>
              </Row>

              {/* Customer & Tour Details */}
              <Row className="mb-10">
                <Column className="w-1/2">
                  <Text className="font-bold text-gray-900 mb-3">Bill To</Text>
                  <Text className="text-gray-700">{customerName}</Text>
                  <Text className="text-gray-600">{customerEmail}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="font-bold text-gray-900 mb-3">
                    Tour Details
                  </Text>
                  <Text className="text-gray-700 font-medium">{tourTitle}</Text>
                  <Text className="text-gray-600">
                    {tourDate} {tourTime && `• ${tourTime}`}
                  </Text>
                  <Text className="text-gray-600">
                    {duration} • {location}
                  </Text>
                  {guideName && (
                    <Text className="text-gray-600 mt-1">
                      Guide: {guideName}
                    </Text>
                  )}
                  {groupSize && (
                    <Text className="text-gray-600">
                      Group Size: {groupSize} guests
                    </Text>
                  )}
                </Column>
              </Row>

              {/* Pricing Table */}
              <Section className="rounded-xl border border-gray-200 bg-gray-50/50">
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  className="text-sm"
                >
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th
                        align="left"
                        className="py-4 px-6 font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        align="right"
                        className="py-4 px-6 font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 px-6 text-gray-700">
                        Tour Ticket ({tourTitle})
                      </td>
                      <td
                        align="right"
                        className="py-4 px-6 font-medium text-gray-900"
                      >
                        ₱{subtotal}
                      </td>
                    </tr>
                    {discount !== "0.00" && (
                      <tr>
                        <td className="py-4 px-6 text-green-700">
                          Discount Applied
                        </td>
                        <td align="right" className="py-4 px-6 text-green-700">
                          -₱{discount}
                        </td>
                      </tr>
                    )}
                    {tax !== "0.00" && (
                      <tr>
                        <td className="py-4 px-6 text-gray-700">Tax</td>
                        <td align="right" className="py-4 px-6 text-gray-700">
                          ₱{tax}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-gray-400">
                      <td className="py-5 px-6 text-lg font-bold text-gray-900">
                        Total Paid
                      </td>
                      <td
                        align="right"
                        className="py-5 px-6 text-2xl font-extrabold text-indigo-600"
                      >
                        ₱{totalAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              {/* Payment Method */}
              <Section className="mt-8 text-center text-sm text-gray-600">
                <Text>
                  Paid via{" "}
                  <span className="font-semibold text-gray-900">
                    {paymentMethod}
                  </span>
                </Text>
                <Text>
                  Payment ID:{" "}
                  <span className="font-mono text-gray-800">{paymentId}</span>
                </Text>
                <Text>
                  Transaction ID:{" "}
                  <span className="font-mono text-gray-800">
                    {transactionId}
                  </span>
                </Text>
              </Section>

              <Hr className="my-10 border-gray-200" />

              {/* Thank You + CTA */}
              <Section className="text-center">
                <Heading as="h3" className="text-2xl font-bold text-gray-900">
                  Thank you for booking with {appName}!
                </Heading>
                <Text className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
                  Your adventure is confirmed. Get ready for an unforgettable
                  experience in the Philippines.
                </Text>

                <Button
                  href={`https://ph-tour.com/dashboard/bookings/${bookingId}`}
                  className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-700 transition shadow-lg"
                >
                  View Booking Details
                </Button>
              </Section>

              <Hr className="my-10 border-gray-200" />

              {/* Footer */}
              <Section className="text-center text-sm text-gray-500">
                <Text>
                  © {new Date().getFullYear()} PH Tour. All rights reserved.
                </Text>
                <Text className="mt-2">
                  Questions? Contact us at{" "}
                  <a
                    href="mailto:support@ph-tour.com"
                    className="text-indigo-600 hover:underline"
                  >
                    support@ph-tour.com
                  </a>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InvoiceEmail;
