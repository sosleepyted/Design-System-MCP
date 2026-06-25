import { preventWidow } from "./preventWidow";

const NBSP = " ";

test("binds the last N words with non-breaking spaces", () => {
  expect(preventWidow("complete a task with one tap", 3)).toBe(
    `complete a task with${NBSP}one${NBSP}tap`,
  );
});

test("defaults to binding the last 3 words", () => {
  expect(preventWidow("complete a task with one tap")).toBe(
    `complete a task with${NBSP}one${NBSP}tap`,
  );
});

test("returns the text unchanged when it has count words or fewer", () => {
  expect(preventWidow("two words", 3)).toBe("two words");
  expect(preventWidow("exactly three words", 3)).toBe("exactly three words");
});

test("returns the text unchanged when count is below 2", () => {
  expect(preventWidow("bind nothing here please", 1)).toBe(
    "bind nothing here please",
  );
});

test("normalizes internal whitespace before binding", () => {
  expect(preventWidow("a   b  c d", 2)).toBe(`a b c${NBSP}d`);
});
