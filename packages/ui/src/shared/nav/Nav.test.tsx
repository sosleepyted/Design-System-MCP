import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider } from "../../foundation/locale";
import { Nav, type NavLink } from "./Nav";

const links: NavLink[] = [
  { label: { de: "Komponenten", en: "Components" }, href: "/components" },
];

function renderNav(props: Partial<React.ComponentProps<typeof Nav>> = {}) {
  return render(
    <LocaleProvider>
      <Nav links={links} {...props} />
    </LocaleProvider>,
  );
}

test("renders a navigation landmark with an accessible name", () => {
  renderNav();
  expect(
    screen.getByRole("navigation", { name: /hauptnavigation/i }),
  ).toBeInTheDocument();
});

test("renders the wordmark and German link labels by default", () => {
  renderNav();
  expect(screen.getByText("UCM")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Komponenten" })).toHaveAttribute(
    "href",
    "/components",
  );
});

test("mobile menu starts closed and toggles open", async () => {
  const user = userEvent.setup();
  renderNav();
  const toggle = screen.getByRole("button", { name: /menü öffnen/i });
  expect(toggle).toHaveAttribute("aria-expanded", "false");

  await user.click(toggle);
  const closeToggle = screen.getByRole("button", { name: /menü schließen/i });
  expect(closeToggle).toHaveAttribute("aria-expanded", "true");
  // Link now appears in both the desktop row and the open mobile panel.
  expect(screen.getAllByRole("link", { name: "Komponenten" }).length).toBe(2);
});

test("uses the yellow CTA in brand mode and navy in product mode", () => {
  const cta = { label: { de: "Anfragen", en: "Request" }, href: "/x" };
  const { unmount } = renderNav({ mode: "brand", cta });
  expect(screen.getAllByRole("link", { name: "Anfragen" })[0]).toHaveClass(
    "bg-[#FCC224]",
  );
  unmount();

  renderNav({ mode: "product", cta });
  expect(screen.getAllByRole("link", { name: "Anfragen" })[0]).toHaveClass(
    "bg-[#001E2B]",
  );
});
