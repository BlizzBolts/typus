import { expect, it, suite } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";
import { Doc } from "../src/core/doc";

suite("type alias", () => {
  it("should parse type alias string", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/string.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias number", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/number.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias boolean", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/boolean.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias any", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/any.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias unknown", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/unknown.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias undefined", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/undefined.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias null", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/null.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias a function", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/function.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias array of string", () => {
    const docCache = Parser.of()
      .setup(
        path.resolve(__dirname, "./manifest/type-alias/array-of-string.ts")
      )
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias interface", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/interface.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias class", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/class.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
  it("should parse type alias abstract class", () => {
    const docCache = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/abstract-class.ts"))
      .parse();
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });
});
