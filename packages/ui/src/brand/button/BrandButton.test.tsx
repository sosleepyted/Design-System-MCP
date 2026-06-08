import { render, screen } from "@testing-library/react";
import { BrandButton } from "./BrandButton";

test("primary brand button is yellow and renders a <button>", () => {
  render(<BrandButton>Anfragen</BrandButton>);
  const el = screen.getByRole("button", { name: /anfragen/i });
  expect(el).toHaveClass("bg-[#FCC224]");
});

test("renders an <a> when href is passed", () => {
  render(<BrandButton href="/x">Mehr</BrandButton>);
  expect(screen.getByRole("link", { name: /mehr/i }).tagName).toBe("A");
});

test("outline variant uses the navy alpha border", () => {
  render(<BrandButton variant="outline">Mehr</BrandButton>);
  expect(screen.getByRole("button")).toHaveClass("border-[#001E2B]/15");
});

test("dark variant renders a navy background", () => {
  render(<BrandButton variant="dark">Bewerben</BrandButton>);
  expect(screen.getByRole("button")).toHaveClass("bg-[#001E2B]");
});
