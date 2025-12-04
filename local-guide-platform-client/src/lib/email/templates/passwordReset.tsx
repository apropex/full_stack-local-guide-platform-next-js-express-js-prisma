import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Tailwind, Text } from "@react-email/components";

interface ForgotPasswordOtpEmailProps {
  otp: string;
  appName?: string;
  validMinutes?: number;
  userName?: string; // Optional: personalize with user's name
}

export default function ForgotPasswordOtpEmail({
  otp,
  userName = "there",
  appName = "Local Guide",
  validMinutes = 2,
}: ForgotPasswordOtpEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your password reset code is {otp}</Preview>

      <Tailwind>
        <Body className="bg-gray-50 font-sans antialiased">
          <Container className="mx-auto my-10 max-w-lg rounded-2xl bg-white px-8 py-12 shadow-xl">
            {/* Brand Header */}
            <Section className="text-center">
              <Heading className="text-3xl font-bold text-gray-900">{appName}</Heading>
              <Text className="mt-2 text-sm text-gray-500">Password Reset Request</Text>
            </Section>

            {/* Main Content */}
            <Section className="mt-10">
              <Heading as="h2" className="text-center text-2xl font-semibold text-gray-900">
                Reset Your Password
              </Heading>

              <Text className="mt-6 text-base leading-relaxed text-gray-600">
                Hi{userName !== "there" ? ` ${userName}` : ""},
              </Text>

              <Text className="text-base leading-relaxed text-gray-600">
                We received a request to reset the password for your {appName} account. Use the one-time code below to
                set a new password.
              </Text>

              {/* OTP Highlight Box */}
              <Section className="my-10 text-center">
                <div className="inline-block rounded-2xl bg-linear-to-br from-red-50 via-pink-50 to-rose-50 px-12 py-10 shadow-lg ring-1 ring-red-100">
                  <Text className="font-mono text-5xl font-extrabold tracking-widest text-red-700 drop-shadow-sm md:text-6xl">
                    {otp}
                  </Text>
                </div>
              </Section>

              <Text className="text-center text-base font-medium text-gray-700">
                This code expires in <span className="font-bold text-red-600">{validMinutes} minutes</span>
              </Text>

              <Text className="mt-8 text-base text-gray-600">
                If you didn&apos;t request a password reset, please ignore this email or{" "}
                <a href="#" className="font-medium text-indigo-600 hover:underline">
                  contact support
                </a>{" "}
                immediately — someone may be trying to access your account.
              </Text>

              <Hr className="my-10 border-gray-200" />

              {/* Security Tip */}
              <Section className="rounded-xl bg-amber-50 px-6 py-5">
                <Text className="m-0 text-sm font-medium text-amber-900">Security Tip</Text>
                <Text className="mt-2 text-sm text-amber-800">
                  Never share this code with anyone — {appName} staff will never ask for it.
                </Text>
              </Section>

              {/* Footer */}
              <Section className="mt-10 text-center">
                <Text className="text-sm text-gray-500">
                  © {new Date().getFullYear()} {appName}. All rights reserved.
                </Text>
                <Text className="mt-2 text-xs text-gray-400">
                  Secure & private • Sent from {appName} Authentication System
                </Text>
              </Section>
            </Section>
          </Container>

          {/* Bottom spacing for email clients */}
          <Section className="h-12" />
        </Body>
      </Tailwind>
    </Html>
  );
}
