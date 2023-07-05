import { suite, it, expect } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";

suite("interface", () => {
  it("should parse type complex interface", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/complex-interface.ts"))
      .parse()
      .serialize();
    expect(docCache).toMatchSnapshot();
  });
});
