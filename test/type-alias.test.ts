import { expect, it, suite } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";
import { Doc } from "../src/core/doc";

suite("type alias", () => {
  it("should parse type alias string", () => {
    const parser = Parser.of().setup(
      path.resolve(__dirname, "./manifest/type-alias/string.ts")
    );
    const docCache = parser.parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias number", () => {});
  it("should parse type alias boolean", () => {});
  it("should parse type alias any", () => {});
  it("should parse type alias unknown", () => {});
  it("should parse type alias undefined", () => {});
  it("should parse type alias null", () => {});
  it("should parse type alias a function", () => {});
  it("should parse type alias array of string", () => {});
});
