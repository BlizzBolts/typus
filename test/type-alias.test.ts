import { expect, it, suite } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";
import { Doc } from "../src/core/doc";
import { transformModuleGraph2Doc } from "../src/utils/transform";

suite("type alias", () => {
  // it("should parse type alias string", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/string.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias number", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/number.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias boolean", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/boolean.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias any", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/any.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias unknown", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/unknown.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias undefined", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/undefined.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias null", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/null.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  it("should parse type alias a function", () => {
    const parser = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/type-alias/function.ts"))
      .parse();

    const docCache = transformModuleGraph2Doc(parser.getModuleGraph());
    expect(Doc.serialize(docCache)).toMatchSnapshot();
  });

  // it("should parse type alias array of string", () => {
  //   const parser = Parser.of()
  //     .setup(
  //       path.resolve(__dirname, "./manifest/type-alias/array-of-string.ts")
  //     )
  //     .parse();
  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias interface", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/interface.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias class", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/class.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });

  // it("should parse type alias abstract class", () => {
  //   const parser = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/type-alias/abstract-class.ts"))
  //     .parse();

  //   const docCache = transformRootModuleGraph2Doc(parser.rootModuleGraph);
  //   expect(Doc.serialize(docCache)).toMatchSnapshot();
  // });
});
