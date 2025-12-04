import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface OtpEmailProps {
  otp: string;
  appName?: string;
  validMinutes?: number;
}

export default function OtpEmail({
  otp,
  appName = "LASV Guides",
  validMinutes = 2,
}: OtpEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your secure one-time password (OTP) is {otp}</Preview>

      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto max-w-lg rounded-2xl bg-white px-8 py-12 shadow-lg">
            {/* Logo / Brand */}
            <Section className="text-center">
              <Heading className="text-2xl font-bold text-gray-900">
                {appName}
              </Heading>
            </Section>

            <Heading
              as="h2"
              className="mt-10 text-center text-2xl font-semibold text-gray-900"
            >
              Verify Your Identity
            </Heading>

            <Text className="mt-6 text-base leading-relaxed text-gray-600">
              We received a request to verify your account with a one-time
              password. Please use the code below to proceed.
            </Text>

            {/* OTP Box */}
            <Section className="my-10 text-center">
              <div className="inline-flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-purple-50 px-10 py-8 shadow-inner">
                <Text className="font-mono text-4xl font-bold tracking-widest text-indigo-700 lg:text-5xl">
                  {otp}
                </Text>
              </div>
            </Section>

            <Text className="text-base text-gray-600">
              This code is valid for the next{" "}
              <span className="font-semibold text-indigo-600">
                {validMinutes} minutes
              </span>
              . For your security, do not share this code with anyone.
            </Text>

            <Text className="mt-6 text-base text-gray-600">
              If you didn&apos;t request this verification, you can safely
              ignore this email. Someone may have entered your email address by
              mistake.
            </Text>

            <Hr className="my-10 border-gray-200" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-sm text-gray-500">
                © {new Date().getFullYear()} {appName}. All rights reserved.
              </Text>
              <Text className="mt-2 text-xs text-gray-400">
                Secure authentication powered by {appName}
              </Text>
            </Section>
          </Container>

          {/* Optional: Extra spacing for email clients */}
          <Section className="h-12" />
        </Body>
      </Tailwind>
    </Html>
  );
}
