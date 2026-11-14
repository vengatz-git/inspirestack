import { auth } from "@/auth";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/layout/container";
import { ContentDefaultsProvider } from "@/features/settings/components/content-defaults-provider";

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
    <ContentDefaultsProvider
      defaultPinVisibility={session.user.defaultPinVisibility}
      defaultBoardVisibility={session.user.defaultBoardVisibility}
    >
      <Navbar />

      <Container className="py-6">
        {children}
      </Container>
    </ContentDefaultsProvider>
  );
}