import { BrandButton, GlowButton } from "@ucm/ui";

export function BrandButtonDemo() {
  return (
    <>
      <BrandButton>Personal anfragen</BrandButton>
      <BrandButton variant="dark">Jetzt bewerben</BrandButton>
      <BrandButton variant="outline">Mehr erfahren</BrandButton>
    </>
  );
}

export function GlowButtonDemo() {
  return <GlowButton href="#">Jetzt starten</GlowButton>;
}
