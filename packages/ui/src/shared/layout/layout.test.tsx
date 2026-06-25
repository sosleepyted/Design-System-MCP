import { render, screen } from "@testing-library/react";
import { Container } from "./Container";
import { Section } from "./Section";
import { Stack } from "./Stack";
import { Grid } from "./Grid";
import { Divider } from "./Divider";

test("Container applies the product width by default and the brand width on request", () => {
  const { rerender, container } = render(<Container>child</Container>);
  expect(container.firstChild).toHaveClass("max-w-[680px]");
  rerender(<Container mode="brand">child</Container>);
  expect(container.firstChild).toHaveClass("max-w-[1440px]");
});

test("Section renders a <section> and accepts an aria-label", () => {
  render(<Section aria-label="Intro">content</Section>);
  const section = screen.getByRole("region", { name: "Intro" });
  expect(section.tagName).toBe("SECTION");
});

test("Stack stacks vertically with the chosen gap", () => {
  const { container } = render(<Stack gap="lg">items</Stack>);
  expect(container.firstChild).toHaveClass("flex", "flex-col", "gap-8");
});

test("Grid maps cols to responsive column classes", () => {
  const { container } = render(<Grid cols={4}>cells</Grid>);
  expect(container.firstChild).toHaveClass("grid", "lg:grid-cols-4");
});

test("Divider renders a separator on the navy alpha border", () => {
  render(<Divider />);
  const hr = screen.getByRole("separator");
  expect(hr.tagName).toBe("HR");
  expect(hr).toHaveClass("border-[#001E2B]/8");
});
