import { LandingAuth } from "@/features/landing/components/landing-auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <LandingAuth standalone />
    </main>
  );
}