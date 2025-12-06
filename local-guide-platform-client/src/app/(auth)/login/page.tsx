//

import LoginForm from "@/components/modules/auth/LoginForm";

interface iProps {
  searchParams?: Promise<{ dest?: string }>;
}

export default async function LoginPage({ searchParams }: iProps) {
  const dest = (await searchParams)?.dest;

  return (
    <>
      <LoginForm dest={dest} />
    </>
  );
}
