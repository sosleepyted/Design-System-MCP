import { Card, Grid, Button } from "@ucm/ui";

export function CardDemo() {
  return (
    <Grid cols={2} gap="md" className="w-full">
      <Card>
        <h3 className="text-[15px] font-semibold text-[#001E2B]">Karte</h3>
        <p className="mt-1 text-[14px] leading-[1.6] text-[#001E2B]/70">
          Ein zurückhaltender Produkt-Container mit der dokumentierten
          Schattierung und dem Rahmen.
        </p>
        <div className="mt-4">
          <Button size="default">Öffnen</Button>
        </div>
      </Card>
      <Card>
        <h3 className="text-[15px] font-semibold text-[#001E2B]">Card</h3>
        <p className="mt-1 text-[14px] leading-[1.6] text-[#001E2B]/70">
          A restrained product container with the documented shadow and border.
        </p>
        <div className="mt-4">
          <Button variant="outline">Open</Button>
        </div>
      </Card>
    </Grid>
  );
}
