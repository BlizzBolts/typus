import ts from "typescript";
import type { SourceFile } from "./sourceFile";

export interface SerialziedDoc {
  name?: string;
  documentation?: string;
  type?: string;
  tags?: { name: string; text: string }[];
  required?: boolean;
  members?: SerialziedDoc[];
  parameters?: SerialziedDoc[];
  children?: SerialziedDoc[];
  symbol?: ts.Symbol;
}

export interface DocPayload {
  name?: string;
  documentation?: string;
  type?: string;
  tags?: { name: string; text: string }[];
  required?: boolean;
  members?: Doc[];
  parameters?: Doc[];
  children?: Doc[];
  symbol?: ts.Symbol;
}

export class Doc {
  name?: string;
  documentation?: string;
  type?: string;
  tags?: { name: string; text: string }[];
  required?: boolean;
  members?: Doc[];
  parameters?: Doc[];
  children?: Doc[];
  symbol?: ts.Symbol;

  root?: SourceFile | null;

  constructor(param: DocPayload) {
    this.name = param.name || "";
    this.documentation = param.documentation || "";
    this.type = param.type || "";
    this.tags = param.tags || [];
    this.required = param.required || false;
    this.members = param.members || [];
    this.parameters = param.parameters || [];
    this.children = param.children || [];
    this.symbol = param.symbol || (null as unknown as ts.Symbol);

    this.root = null;
  }

  public setRoot(root: SourceFile) {
    this.root = root;
  }

  static serialize = (curr: Doc): SerialziedDoc => {
    return {
      name: curr.name,
      documentation: curr.documentation,
      type: curr.type,
      tags: curr.tags,
      required: curr.required,
      members: curr.members?.map(Doc.serialize),
      parameters: curr.parameters?.map(Doc.serialize),
      children: curr.children?.map(Doc.serialize),
    };
  };
}
