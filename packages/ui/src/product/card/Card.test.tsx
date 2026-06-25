import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

test("renders children inside the card surface", () => {
  render(<Card>Inhalt</Card>);
  expect(screen.getByText("Inhalt")).toBeInTheDocument();
});

test("applies the documented border, white surface and card shadow", () => {
  const { container } = render(<Card>x</Card>);
  const card = container.firstChild as HTMLElement;
  expect(card).toHaveClass("border-[#001E2B]/10", "bg-white");
  expect(card.className).toContain("shadow-[0_12px_28px_-22px_rgba(23,43,54,0.4)]");
});

test("merges a passthrough className and forwards aria attributes", () => {
  render(
    <Card className="mt-4" role="group" aria-label="Karte">
      x
    </Card>,
  );
  const card = screen.getByRole("group", { name: "Karte" });
  expect(card).toHaveClass("mt-4");
});
