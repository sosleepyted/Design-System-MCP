import { cx } from "./cx";

test("joins truthy class strings with a space", () => {
  expect(cx("a", "b", "c")).toBe("a b c");
});

test("drops falsey values", () => {
  expect(cx("a", false, undefined, "b", null as unknown as string)).toBe("a b");
});

test("returns an empty string when nothing is passed", () => {
  expect(cx()).toBe("");
});
