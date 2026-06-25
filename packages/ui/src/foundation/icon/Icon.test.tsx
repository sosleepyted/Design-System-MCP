import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";
import { ICON_PATHS } from "./icons";

test("renders an svg with the path data for the named icon", () => {
  const { container } = render(<Icon name="arrow_forward" />);
  const path = container.querySelector("svg path");
  expect(path?.getAttribute("d")).toBe(ICON_PATHS.arrow_forward);
});

test("defaults to size 20 and uses currentColor", () => {
  const { container } = render(<Icon name="check" />);
  const svg = container.querySelector("svg");
  expect(svg).toHaveAttribute("width", "20");
  expect(svg).toHaveAttribute("height", "20");
  expect(svg).toHaveAttribute("fill", "currentColor");
});

test("applies a custom size", () => {
  const { container } = render(<Icon name="close" size={32} />);
  const svg = container.querySelector("svg");
  expect(svg).toHaveAttribute("width", "32");
  expect(svg).toHaveAttribute("height", "32");
});

test("is decorative (aria-hidden, no role) by default", () => {
  const { container } = render(<Icon name="menu" />);
  const svg = container.querySelector("svg");
  expect(svg).toHaveAttribute("aria-hidden", "true");
  expect(svg).not.toHaveAttribute("role");
});

test("is a labelled image when title is provided", () => {
  render(<Icon name="lock" title="Locked" />);
  const svg = screen.getByRole("img", { name: "Locked" });
  expect(svg).not.toHaveAttribute("aria-hidden");
});
