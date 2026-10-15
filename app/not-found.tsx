import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center pt-32">
      <p className="text-eyebrow text-violet-soft">404</p>
      <h1 className="text-heading mt-4 font-semibold text-fg">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-muted">The link may be out of date, or the page may have moved.</p>
      <ButtonLink href="/" className="mt-8">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to the home page
      </ButtonLink>
    </Container>
  );
}
