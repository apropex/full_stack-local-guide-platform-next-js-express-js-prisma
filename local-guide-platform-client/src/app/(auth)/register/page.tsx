//

import RegisterForm from "@/components/modules/auth/RegisterForm";

interface iProps {
  searchParams?: Promise<{ dest?: string }>;
}

export default async function RegisterPage({ searchParams }: iProps) {
  const dest = (await searchParams)?.dest;

  return (
    <>
      <RegisterForm dest={dest} />
    </>
  );
}
