import { it, expect, suite } from "vitest"
import { parse } from "../src"
import path from "path"

const rawTsSampleFilePath = path.resolve(__dirname, "./sample/raw-ts.ts")

suite("simple", () => {
  it("parse", () => {
    const docCache = parse(rawTsSampleFilePath)

    expect(docCache).toBeTruthy()
  })
})
