import { it, expect, suite } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";
import { Doc } from "../src/core/doc";
import { transformModuleGraph2Doc } from "../src/utils/transform";

suite("individual parse", () => {
  it("should parse interface", () => {
    const parser = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/interface.ts"))
      .parse();

    const docCache = transformModuleGraph2Doc(parser.getModuleGraph());
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });

  it("should parse interface with external deps", () => {});

  it("should parse class", () => {});

  it("should parse class with external deps", () => {});

  it("should parse variables", () => {});

  it("should parse type", () => {});

  it("should parse function", () => {});

  it("should parse function with external deps", () => {});
});
