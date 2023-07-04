import ts from "typescript";
import { generateDoc, generateDocByInternalSymbol } from "../utils/doc";
import { Doc } from "./doc";

export const defaultCompilerOptions = {
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.Latest,
};

export class Parser {
  private compilerOptions: ts.CompilerOptions = defaultCompilerOptions;
  private filePaths: string[] = [];
  private program!: ts.Program;
  private typeChecker!: ts.TypeChecker;
  private cache: Map<ts.Type, Doc> = new Map<ts.Type, Doc>();

  constructor(
    filePaths?: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ) {
    if (filePaths) {
      this.setup(filePaths, compilerOptions);
    }
  }

  static of(
    filePaths?: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ) {
    return new Parser(filePaths, compilerOptions);
  }

  getTypeChecker() {
    return this.typeChecker;
  }

  getProgram() {
    return this.program;
  }

  setup(
    filePaths: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ): this {
    this.compilerOptions = Object.assign(
      defaultCompilerOptions,
      compilerOptions
    );
    this.filePaths = Array.isArray(filePaths) ? filePaths : [filePaths];
    this.program = ts.createProgram(this.filePaths, this.compilerOptions);
    this.typeChecker = this.program.getTypeChecker();

    this.cache.clear();

    return this;
  }

  parse() {
    const validSourceFiles = this.program.getSourceFiles().filter((o) => {
      return !o.isDeclarationFile;
    });

    const rootDoc = new Doc({
      name: "root",
    });

    validSourceFiles.forEach((o: ts.SourceFile) => {
      o.forEachChild((p: ts.Node) => {
        this.traverse(p, rootDoc);
      });
    });

    return rootDoc;
  }

  parseInterfaceDeclaration(node: ts.InterfaceDeclaration, parent: Doc) {
    const type = this.typeChecker.getTypeAtLocation(node.name);
    const doc = generateDoc(node, type, this.typeChecker);
    parent.children?.push(doc);
    if (Array.isArray(node.members)) {
      node.members.forEach((memberNode) => {
        this.traverse(memberNode, doc);
      });
    }
  }

  parseTypeAliasDeclaration(node: ts.TypeAliasDeclaration, parent: Doc) {
    const type = this.typeChecker.getTypeAtLocation(node.name);
    const doc = generateDocByInternalSymbol(node, type, this.typeChecker);
    parent.children?.push(doc);
  }

  parseMethodSignature(node: ts.MethodSignature, parent: Doc) {
    const type = this.typeChecker.getTypeAtLocation(node);
    const doc = generateDoc(node, type, this.typeChecker);
    parent.children?.push(doc);

    if (Array.isArray(node.parameters)) {
      node.parameters.forEach((parameter) => this.traverse(parameter, doc));
    }
  }

  parseParameter = (node: ts.ParameterDeclaration, parent: Doc) => {
    const type = this.typeChecker.getTypeAtLocation(node);
    const doc = generateDoc(node.name, type, this.typeChecker);
    parent.parameters?.push(doc);
  };

  parsePropertySignature = (node: ts.PropertySignature, parent: Doc) => {
    const type = this.typeChecker.getTypeAtLocation(node.name!);
    const doc = generateDoc(node.name, type, this.typeChecker);
    parent.children?.push(doc);

    if (node.type && ts.isFunctionTypeNode(node.type)) {
      node.type.parameters.forEach((parameter) =>
        this.traverse(parameter, doc)
      );
    }

    // if (node.type && ts.isTypeReferenceNode(node.type)) {
    //   node.type.parameters.forEach((parameter) =>
    //     this.traverse(parameter, doc)
    //   );
    // }
  };

  // parseFunction(node: ts.FunctionDeclaration, parent: Doc) {
  //   const fnType = this.typeChecker.getTypeAtLocation(node);
  //   const Doc = generateDoc(node, fnType.getSymbol()!, this.typeChecker);
  //   parent.children?.push(Doc);
  //   this.cache.set(fnType, Doc);

  //   if (Array.isArray(node.parameters)) {
  //     node.parameters.forEach((parameter) => this.traverse(parameter, Doc));
  //   }
  // }

  // parseInterfaceMember = (node: ts.TypeElement, parent: Doc) => {
  //   const memberType = this.typeChecker.getTypeAtLocation(node!.name!);

  //   if (this.cache.has(memberType)) {
  //     parent.members?.push(this.cache.get(memberType)!);
  //   } else {
  //     const symbol = this.typeChecker.getSymbolAtLocation(node.name!);
  //     parent.members?.push(generateDoc(node, symbol!, this.typeChecker));
  //   }
  // };

  traverse(node: ts.Node, parent: Doc) {
    // if (this.cache.has(this.typeChecker.getTypeAtLocation(node))) {
    // }

    if (ts.isInterfaceDeclaration(node)) {
      console.log("isInterfaceDeclaration!");
      this.parseInterfaceDeclaration(node, parent);
      return;
    }

    if (ts.isMethodSignature(node)) {
      console.log("isMethodSignature!");
      this.parseMethodSignature(node, parent);
      return;
    }

    if (ts.isPropertySignature(node)) {
      console.log("isPropertySignature!");
      this.parsePropertySignature(node, parent);
      return;
    }

    if (ts.isParameter(node)) {
      console.log("isParameter!");
      this.parseParameter(node, parent);
      return;
    }

    // if (ts.isVariableDeclaration(node)) {
    //   console.log("isVariableDeclaration!");
    //   this.parseIndexSignatureDeclaration(node, parent)
    //   return;
    // }

    // if (ts.isFunctionDeclaration(node)) {
    //   console.log("isFunctionDeclaration!");
    //   this.parseFunction(node, parent);
    //   return;
    // }

    // if (ts.isClassDeclaration(node)) {
    //   console.log("isClassDeclaration");
    //   return;
    // }

    if (ts.isTypeAliasDeclaration(node)) {
      console.log("isTypeAliasDeclaration");
      this.parseTypeAliasDeclaration(node, parent);
      return;
    }

    // if (ts.isEnumDeclaration(node)) {
    //   console.log("isEnumDeclaration");
    //   return;
    // }
    // if (ts.isModuleDeclaration(node)) {
    //   console.log("isModuleDeclaration");
    //   return;
    // }

    // if (ts.isTypeElement(node)) {
    //   console.log("isTypeElement!");
    //   this.parseInterfaceMember(node, parent);
    //   return;
    // }
  }
}
