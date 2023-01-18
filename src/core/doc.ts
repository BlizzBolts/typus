import ts from "typescript";

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

  constructor(param: Doc = {} as Doc) {
    this.name = param.name || "";
    this.documentation = param.documentation || "";
    this.type = param.type || "";
    this.tags = param.tags || [];
    this.required = param.required || false;
    this.members = param.members || [];
    this.parameters = param.parameters || [];
    this.children = param.children || [];
    this.symbol = param.symbol || (null as unknown as ts.Symbol);
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
