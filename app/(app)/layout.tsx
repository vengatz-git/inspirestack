import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/layout/container";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({
  children,
}: AppLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <Navbar />

      <Container className="py-6">
        {children}
      </Container>
    </>
  );
}