import { render, screen, fireEvent } from "@testing-library/react";
import { GlowButton } from "./GlowButton";

test("renders children and a default arrow glyph", () => {
  const { container } = render(<GlowButton>Los</GlowButton>);
  expect(screen.getByRole("button", { name: /los/i })).toBeInTheDocument();
  expect(container.querySelectorAll("svg").length).toBe(1);
});

test("hideArrow removes the glyph", () => {
  const { container } = render(<GlowButton hideArrow>Los</GlowButton>);
  expect(container.querySelector("svg")).toBeNull();
});

test("mouse move sets the --x and --y custom properties", () => {
  render(<GlowButton>Los</GlowButton>);
  const el = screen.getByRole("button");
  fireEvent.mouseMove(el, { clientX: 10, clientY: 20 });
  expect(el.style.getPropertyValue("--x")).not.toBe("");
  expect(el.style.getPropertyValue("--y")).not.toBe("");
});

test("renders an <a> when href is passed", () => {
  render(<GlowButton href="/start">Los</GlowButton>);
  expect(screen.getByRole("link", { name: /los/i }).tagName).toBe("A");
});
