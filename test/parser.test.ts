import { it, expect, suite } from "vitest";
import path from "path";
import { Parser } from "../src/core/parser";

suite("core-parser", () => {
  // it("should be right cache", () => {
  //   const moduleGraphRoot = Parser.of()
  //     .setup(path.resolve(__dirname, "./manifest/parser.ts"))
  //     .parse();
  //   expect(moduleGraphRoot.toString()).toMatchSnapshot();
  // });

  it("should reuse module graph when types use same reference.", () => {
    const parser = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/reused-interface"))
      .parse();

    expect(parser.getModuleGraph().hitCacheTimes).equal(1);
  });

  it("shouldn't reuse any module graph when types are totally 1 diff", () => {
    const parser = Parser.of()
      .setup(path.resolve(__dirname, "./manifest/not-reused"))
      .parse();
    expect(parser.getModuleGraph().hitCacheTimes).equal(0);
  });
});
