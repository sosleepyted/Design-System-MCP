import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider, useLocale } from "./LocaleContext";
import type { Label } from "./types";

const GREETING: Label = { de: "Hallo", en: "Hello" };

function Probe() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div>
      <span data-testid="text">{t(GREETING)}</span>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale("en")}>switch</button>
    </div>
  );
}

beforeEach(() => window.localStorage.clear());

test("defaults to German", () => {
  render(<LocaleProvider><Probe /></LocaleProvider>);
  expect(screen.getByTestId("text")).toHaveTextContent("Hallo");
  expect(screen.getByTestId("locale")).toHaveTextContent("de");
});

test("setLocale switches the rendered label and persists it", async () => {
  render(<LocaleProvider><Probe /></LocaleProvider>);
  await userEvent.click(screen.getByRole("button", { name: "switch" }));
  expect(screen.getByTestId("text")).toHaveTextContent("Hello");
  expect(window.localStorage.getItem("ucm-locale")).toBe("en");
});

test("useLocale throws outside a provider", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Probe />)).toThrow(/LocaleProvider/);
  spy.mockRestore();
});

test("hydrates locale from localStorage on mount", async () => {
  window.localStorage.setItem("ucm-locale", "en");
  render(<LocaleProvider><Probe /></LocaleProvider>);
  expect(await screen.findByTestId("locale")).toHaveTextContent("en");
  expect(screen.getByTestId("text")).toHaveTextContent("Hello");
});
