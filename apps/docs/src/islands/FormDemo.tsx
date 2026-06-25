import {
  Field,
  Input,
  Select,
  Checkbox,
  Button,
  Stack,
  LocaleProvider,
} from "@ucm/ui";

export function FormDemo() {
  return (
    <LocaleProvider>
      <form
        className="w-full max-w-[420px]"
        onSubmit={(event) => event.preventDefault()}
      >
        <Stack gap="md">
          <Field
            label={{ de: "Name", en: "Name" }}
            hint={{ de: "Vor- und Nachname.", en: "First and last name." }}
            required
          >
            <Input placeholder="Alex Muster" />
          </Field>

          <Field
            label={{ de: "E-Mail", en: "Email" }}
            error={{ de: "Bitte eine gültige E-Mail angeben.", en: "Enter a valid email." }}
            required
          >
            <Input type="email" attention placeholder="you@ucm.jobs" />
          </Field>

          <Field label={{ de: "Pensum", en: "Workload" }}>
            <Select
              placeholder={{ de: "Bitte wählen", en: "Choose" }}
              options={[
                { label: { de: "Vollzeit", en: "Full time" }, value: "full" },
                { label: { de: "Teilzeit", en: "Part time" }, value: "part" },
              ]}
            />
          </Field>

          <Checkbox label={{ de: "Ich stimme den Bedingungen zu", en: "I agree to the terms" }} />

          <Button>Anfrage senden</Button>
        </Stack>
      </form>
    </LocaleProvider>
  );
}
