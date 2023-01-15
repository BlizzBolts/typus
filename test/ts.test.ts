import { it, expect, suite } from "vitest";
import path from "path";
import ts from "typescript";
import { serializeSymbol } from "../src/utils/doc";

const rawTsSampleFilePath = path.resolve(__dirname, "./manifest/raw-ts.ts");

function printRecursiveFrom(
  node: ts.Node,
  indentLevel: number,
  sourceFile: ts.SourceFile,
  output: string[]
) {
  const indentation = "-".repeat(indentLevel);
  const syntaxKind = ts.SyntaxKind[node.kind];
  const nodeText = node.getText(sourceFile);

  output.push(`${indentation}${syntaxKind}: ${nodeText}`);

  node.forEachChild((child) =>
    printRecursiveFrom(child, indentLevel + 1, sourceFile, output)
  );
}

function printNode(node: ts.Node) {
  const syntaxKind = ts.SyntaxKind[node.kind];
  const nodeText = node.getText();
}

suite("ts test", () => {
  it("raw parse", () => {
    const program = ts.createProgram([rawTsSampleFilePath], {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS,
    });

    let mapper = new Map();
    const typeChecker = program.getTypeChecker();
    program
      .getSourceFiles()
      .filter((o) => {
        return [rawTsSampleFilePath].includes(o.fileName);
      })
      .forEach((sourceFile) => {
        sourceFile.forEachChild((o) => {
          if (ts.isInterfaceDeclaration(o)) {
            const type = typeChecker.getTypeAtLocation(o.name);
            mapper.set(type, serializeSymbol(type.getSymbol()!, typeChecker));
          }

          if (ts.isFunctionDeclaration(o)) {
            o.parameters.forEach((o) => {
              const type = typeChecker.getTypeAtLocation(o.name);
              const doc = mapper.get(type);
              // const symbol = typeChecker.getSymbolAtLocation(o.name)
              // symbol?.valueDeclaration
              // printNode(o)

              // mapper.forEach((v, k) => {
              //   console.log(v, k)
              //   const result = k.declarations[0] === symbol?.valueDeclaration
              //   console.log(result)
              // })
            });
          }
        });
      });
  });
});
