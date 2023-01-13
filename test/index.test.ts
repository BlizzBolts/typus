import { it, expect, suite } from "vitest";
import { parse } from "../src";
import path from "path";

const rawTsSampleFilePath = path.resolve(__dirname, "./manifest/raw-ts.ts");

suite("individual parse", () => {
  it("should parse interface", () => {
    const docCache = parse(rawTsSampleFilePath);
    expect(docCache).toMatchSnapshot();
  });

  it("should parse interface with external deps", () => {});

  it("should parse class", () => {});

  it("should parse class with external deps", () => {});

  it("should parse variables", () => {});

  it("should parse type", () => {});

  it("should parse function", () => {});

  it("should parse function with external deps", () => {});
});
