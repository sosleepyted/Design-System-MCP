import { render, screen } from "@testing-library/react";
import { LocaleProvider } from "../../foundation/locale";
import { Footer, type FooterGroup } from "./Footer";

const groups: FooterGroup[] = [
  {
    title: { de: "Produkt", en: "Product" },
    links: [{ label: { de: "Komponenten", en: "Components" }, href: "/c" }],
  },
];

function renderFooter(props: Partial<React.ComponentProps<typeof Footer>> = {}) {
  return render(
    <LocaleProvider>
      <Footer groups={groups} {...props} />
    </LocaleProvider>,
  );
}

test("renders a contentinfo landmark", () => {
  renderFooter();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

test("renders the wordmark, German group title and links by default", () => {
  renderFooter();
  expect(screen.getByText("UCM")).toBeInTheDocument();
  expect(screen.getByText("Produkt")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Komponenten" })).toHaveAttribute(
    "href",
    "/c",
  );
});

test("renders the legal line when provided", () => {
  renderFooter({ legal: { de: "© 2026 UCM", en: "© 2026 UCM" } });
  expect(screen.getByText("© 2026 UCM")).toBeInTheDocument();
});

test("uses the dark surface in brand mode and the light surface in product mode", () => {
  const { unmount } = renderFooter({ mode: "brand" });
  expect(screen.getByRole("contentinfo")).toHaveClass("bg-[#001E2B]");
  unmount();

  renderFooter({ mode: "product" });
  expect(screen.getByRole("contentinfo")).toHaveClass("bg-white");
});
