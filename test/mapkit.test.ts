import { it, expect, suite } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";
import { Doc } from "../src/core/doc";
import { transformModuleGraph2Doc } from "../src/utils/transform";

suite("parse mapkit", () => {
  it("should parse mapkit", () => {
    const parser = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/mapkit.ts"))
      .parse();
    const docCache = transformModuleGraph2Doc(parser.getModuleGraph());
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
});
