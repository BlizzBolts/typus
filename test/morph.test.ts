import { it, expect, suite, afterEach, beforeEach } from "vitest";
import { Project, SourceFile, Node, Symbol, TypeChecker, ts } from "ts-morph";
import { defaultCompilerOptions } from "../src/core/parser";
import { getManifestPath } from "./utils";

let project: Project = null!;
let typeChecker: TypeChecker = null!;
let cache = new Map();

interface DocEntry {
  name: string;
  documentation?: string;
  children: DocEntry[];
}

interface InterfaceDocEntry extends DocEntry {
  members?: DocEntry[];
}

const makeDoc = (symbol: Symbol): DocEntry => {
  return {
    name: symbol.getName(),
    children: [],
  };
};

const traverse = (node: Node, parent: DocEntry) => {
  const type = typeChecker.getTypeAtLocation(node);
  const symbol_ = typeChecker.getSymbolAtLocation(node);
  const symbol = type.getSymbol()!;
  let tmp;
  if (cache.has(symbol)) {
    tmp = cache.get(symbol);
  } else {
    if (type.isInterface()) {
      console.log("isInterface", symbol.getEscapedName());
      tmp = parseInterface(symbol);
      cache.set(symbol, tmp);
    }
    if (ts.isParameter(node.compilerNode)) {
      console.log("isParameter", symbol.getEscapedName());
    }
  }

  parent.children.push(tmp);
};

const parseInterface = (symbol: Symbol): DocEntry => {
  const doc = makeDoc(symbol) as InterfaceDocEntry;
  const members = symbol.getMembers();
  members.forEach((o) => {
    traverse(o.getDeclarations()[0], doc);
  });

  return doc;
};

suite("ts test", () => {
  beforeEach(() => {
    project = new Project({
      compilerOptions: defaultCompilerOptions,
    });
    typeChecker = project.getTypeChecker();
  });
  afterEach(() => {
    typeChecker = null!;
    project = null!;
  });

  it("raw parse", () => {
    project.addSourceFilesAtPaths(getManifestPath("interface"));
    const validSourceFiles = project.getSourceFiles().filter((o) => {
      return !o.isDeclarationFile();
    });

    const interfaces = validSourceFiles[0].getInterfaces();
    console.log(interfaces);
    interfaces.map((o) => o);
    const root: any = {
      children: [],
    };

    validSourceFiles.forEach((o: SourceFile) => {
      o.forEachChild((p: Node) => {
        traverse(p, root);
      });
    });

    expect(root).toBeTruthy();
  });
});
