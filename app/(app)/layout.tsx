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
    return (
      <Container className="py-6">
        {children}
      </Container>
    );
  }

  if (!session.user.isOnboarded) {
    return children;
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