import { Button } from "@ucm/ui";

export function ProductButtonDemo() {
  return (
    <>
      <Button>Anfrage senden</Button>
      <Button variant="outline">Abbrechen</Button>
      <Button variant="ghost">Mehr</Button>
      <Button variant="danger" hideArrow>
        Löschen
      </Button>
    </>
  );
}

export function ProductButtonSizes() {
  return (
    <>
      <Button size="default">Standard</Button>
      <Button size="lg">Groß</Button>
    </>
  );
}
