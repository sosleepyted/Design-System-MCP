import { render, screen } from "@testing-library/react";
import { LocaleProvider } from "../../foundation/locale";
import { Field } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";

function wrap(ui: React.ReactNode) {
  return render(<LocaleProvider>{ui}</LocaleProvider>);
}

test("Field labels its control and links them by id", () => {
  wrap(
    <Field label={{ de: "E-Mail", en: "Email" }}>
      <Input placeholder="you@ucm.jobs" />
    </Field>,
  );
  const input = screen.getByLabelText("E-Mail");
  expect(input.tagName).toBe("INPUT");
});

test("Field error marks the control invalid and is announced via aria-describedby", () => {
  wrap(
    <Field
      label={{ de: "E-Mail", en: "Email" }}
      error={{ de: "Pflichtfeld", en: "Required" }}
      required
    >
      <Input />
    </Field>,
  );
  const input = screen.getByLabelText(/E-Mail/);
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAttribute("aria-required", "true");
  const describedBy = input.getAttribute("aria-describedby");
  expect(describedBy).toBeTruthy();
  expect(document.getElementById(describedBy!)).toHaveTextContent("Pflichtfeld");
});

test("Input shows the yellow attention ring when attention is set", () => {
  wrap(<Input attention />);
  expect(screen.getByRole("textbox")).toHaveClass("border-[#FCC224]/60");
});

test("Select renders a placeholder and bilingual options", () => {
  wrap(
    <Select
      placeholder={{ de: "Bitte wählen", en: "Choose" }}
      options={[{ label: { de: "Eins", en: "One" }, value: "1" }]}
    />,
  );
  expect(screen.getByRole("option", { name: "Bitte wählen" })).toBeDisabled();
  expect(screen.getByRole("option", { name: "Eins" })).toBeInTheDocument();
});

test("Checkbox renders an inline German label by default", () => {
  wrap(<Checkbox label={{ de: "Einverstanden", en: "I agree" }} />);
  expect(screen.getByRole("checkbox", { name: "Einverstanden" })).toBeInTheDocument();
});
