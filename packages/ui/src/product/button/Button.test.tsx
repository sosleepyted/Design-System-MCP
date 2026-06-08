import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

test("renders a <button> by default with the primary variant class", () => {
  render(<Button>Senden</Button>);
  const el = screen.getByRole("button", { name: /senden/i });
  expect(el.tagName).toBe("BUTTON");
  expect(el).toHaveClass("bg-[#001E2B]");
});

test("renders an <a> with href when href is passed", () => {
  render(<Button href="/next">Weiter</Button>);
  const el = screen.getByRole("link", { name: /weiter/i });
  expect(el.tagName).toBe("A");
  expect(el).toHaveAttribute("href", "/next");
});

test("applies the lg size class", () => {
  render(<Button size="lg">Go</Button>);
  expect(screen.getByRole("button")).toHaveClass("h-11");
});

test("primary shows a forward arrow by default and hides it with hideArrow", () => {
  const { rerender, container } = render(<Button>Go</Button>);
  expect(container.querySelector("svg")).not.toBeNull();
  rerender(<Button hideArrow>Go</Button>);
  expect(container.querySelector("svg")).toBeNull();
});

test("ghost variant does not render an arrow", () => {
  const { container } = render(<Button variant="ghost">Go</Button>);
  expect(container.querySelector("svg")).toBeNull();
});

test("disabled button does not fire onClick", async () => {
  const onClick = vi.fn();
  render(<Button disabled onClick={onClick}>Go</Button>);
  await userEvent.click(screen.getByRole("button"));
  expect(onClick).not.toHaveBeenCalled();
});
