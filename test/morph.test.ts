import { it, expect, suite } from "vitest";
import { Project, ts, SourceFile, Node, InterfaceDeclaration } from "ts-morph";
import { defaultCompilerOptions } from "../src/core/parser";
import path from "path";
import { serializeSymbol } from "../src/utils/doc";
const sample = path.resolve(__dirname, "./manifest/interface.ts");

suite("ts test", () => {
  it("raw parse", () => {
    const project = new Project({
      compilerOptions: defaultCompilerOptions,
    });

    project.addSourceFilesAtPaths(sample);

    const validSourceFiles = project.getSourceFiles().filter((o) => {
      return !o.isDeclarationFile();
    });

    const typeChecker = project.getTypeChecker();

    const root: any = {
      children: [],
    };

    const makeDoc = (node: Node) => {
      return {
        name: node.getSymbol()?.getName(),
      };
    };

    const traverse = (node: Node, parent: any) => {
      const type = typeChecker.getTypeAtLocation(node);
      if (type.isInterface()) {
        parent.children.push(parseInterface(node));
      }
    };

    const parseInterface = (node: Node) => {
      return makeDoc(node);
    };

    validSourceFiles.forEach((o: SourceFile) => {
      o.forEachChild((p: Node) => {
        traverse(p, root);
      });
    });

    expect(root).toBeTruthy();
  });
});
