import { it, expect, suite, beforeEach, afterEach } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";
import { Doc } from "../src/core/doc";

let parser: Parser = new Parser();

suite("individual parse", () => {
  it("should parse interface", () => {
    parser.setup(path.resolve(__dirname, "./manifest/interface.ts"));
    const docCache = parser.parse();
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
