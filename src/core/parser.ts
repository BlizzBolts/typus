import ts from "typescript";
import { generateDoc, generateDocByInternalSymbol } from "../utils/doc";
import { Doc } from "./doc";
import { FilePath, SourceFile } from "./sourceFile";

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
  private cache: Map<FilePath, SourceFile> = new Map<FilePath, SourceFile>();

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

    validSourceFiles.forEach((o: ts.SourceFile) => {
      const sourceFile = new SourceFile({ filePath: o.fileName });
      this.cache.set(o.fileName, sourceFile);
      o.forEachChild((p: ts.Node) => {
        const doc = this.traverse(p, sourceFile);
        if (doc) {
          sourceFile.addDoc(doc);
        }
      });
    });

    return this;
  }

  parseInterfaceDeclaration(
    node: ts.InterfaceDeclaration,
    sourceFile: SourceFile
  ) {
    const type = this.typeChecker.getTypeAtLocation(node.name);
    const doc = generateDoc(node, type, this.typeChecker);
    doc.setRoot(sourceFile);

    if (Array.isArray(node.members)) {
      node.members.forEach((memberNode) => {
        const childDoc = this.traverse(memberNode, sourceFile);
        if (childDoc) {
          childDoc.setRoot(sourceFile);
          doc.children?.push(childDoc);
        }
      });
    }
    return doc;
  }

  parseTypeAliasDeclaration(
    node: ts.TypeAliasDeclaration,
    sourceFile: SourceFile
  ): Doc {
    const type = this.typeChecker.getTypeAtLocation(node.name);
    const doc = generateDocByInternalSymbol(node, type, this.typeChecker);
    doc.setRoot(sourceFile);
    return doc;
  }

  parseMethodSignature(node: ts.MethodSignature, sourceFile: SourceFile): Doc {
    const type = this.typeChecker.getTypeAtLocation(node);
    const doc = generateDoc(node, type, this.typeChecker);
    doc.setRoot(sourceFile);

    if (Array.isArray(node.parameters)) {
      node.parameters.forEach((parameter) => {
        const parameterDoc = this.traverse(parameter, sourceFile);
        if (parameterDoc) {
          parameterDoc.setRoot(sourceFile);
          doc.parameters?.push(parameterDoc);
        }
      });
    }
    return doc;
  }

  parseParameter = (
    node: ts.ParameterDeclaration,
    sourceFile: SourceFile
  ): Doc => {
    const type = this.typeChecker.getTypeAtLocation(node);
    const doc = generateDoc(node.name, type, this.typeChecker);
    doc.setRoot(sourceFile);
    return doc;
  };

  parsePropertySignature = (
    node: ts.PropertySignature,
    sourceFile: SourceFile
  ): Doc => {
    const type = this.typeChecker.getTypeAtLocation(node.name!);
    const doc = generateDoc(node.name, type, this.typeChecker);
    doc.setRoot(sourceFile);

    if (node.type && ts.isFunctionTypeNode(node.type)) {
      node.type.parameters.forEach((parameter) => {
        const parameterDoc = this.traverse(parameter, sourceFile);
        if (parameterDoc) {
          parameterDoc.setRoot(sourceFile);
          doc.parameters?.push(parameterDoc);
        }
      });
    }

    // if (node.type && ts.isTypeReferenceNode(node.type)) {
    //   node.type.parameters.forEach((parameter) =>
    //     this.traverse(parameter, doc)
    //   );
    // }
    return doc;
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

  traverse(node: ts.Node, sourceFile: SourceFile): Doc | undefined {
    // if (this.cache.has(this.typeChecker.getTypeAtLocation(node))) {
    // }

    if (ts.isInterfaceDeclaration(node)) {
      console.log("isInterfaceDeclaration!");
      return this.parseInterfaceDeclaration(node, sourceFile);
    }

    if (ts.isMethodSignature(node)) {
      console.log("isMethodSignature!");
      return this.parseMethodSignature(node, sourceFile);
    }

    if (ts.isPropertySignature(node)) {
      console.log("isPropertySignature!");
      return this.parsePropertySignature(node, sourceFile);
    }

    if (ts.isParameter(node)) {
      console.log("isParameter!");
      return this.parseParameter(node, sourceFile);
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
      return this.parseTypeAliasDeclaration(node, sourceFile);
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

  serialize() {
    const cacheObject = Object.fromEntries(this.cache.entries());
    return Object.keys(cacheObject).reduce((memo, key) => {
      return {
        ...memo,
        [key]: SourceFile.serialize(cacheObject[key]),
      };
    }, {});
  }
}
