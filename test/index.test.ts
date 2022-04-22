import { test, assert } from "vitest"
import { foo } from "../dist"

test("simple", () => {
  assert.equal(foo, "foo")
})
