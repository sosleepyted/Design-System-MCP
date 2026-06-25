import { Container, Grid, Stack, Divider } from "@ucm/ui";

const cell =
  "rounded-[12px] border border-[#001E2B]/10 bg-white p-4 text-[13px] text-[#001E2B]/70";

export function ContainerDemo() {
  return (
    <div className="w-full bg-[#001E2B]/[0.03] py-4">
      <Container mode="product">
        <div className={cell}>Product container (680 to 960px)</div>
      </Container>
    </div>
  );
}

export function GridDemo() {
  return (
    <Grid cols={3} gap="md" className="w-full">
      <div className={cell}>1</div>
      <div className={cell}>2</div>
      <div className={cell}>3</div>
      <div className={cell}>4</div>
      <div className={cell}>5</div>
      <div className={cell}>6</div>
    </Grid>
  );
}

export function StackDemo() {
  return (
    <Stack gap="md" className="w-full">
      <div className={cell}>First</div>
      <Divider />
      <div className={cell}>Second, separated by a Divider</div>
    </Stack>
  );
}
