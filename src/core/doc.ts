import ts from "typescript";

export interface SerialziedDoc {
  name?: string;
  documentation?: string;
  type?: string;
  tags?: { name: string; text: string }[];
  required?: boolean;
  members?: Doc[];
  parameters?: Doc[];
  children?: Doc[];
  symbolType?: ts.Type;
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
  symbolType?: ts.Type;

  constructor(param: SerialziedDoc = {}) {
    this.name = param.name || "";
    this.documentation = param.documentation || "";
    this.type = param.type || "";
    this.tags = param.tags || [];
    this.required = param.required || false;
    this.members = param.members || [];
    this.parameters = param.parameters || [];
    this.children = param.children || [];
    this.symbolType = param.symbolType || (null as unknown as ts.Type);
  }

  serialize(): SerialziedDoc {
    return {
      name: this.name,
      documentation: this.documentation,
      type: this.type,
      tags: this.tags,
      required: this.required,
      members: this.members,
      parameters: this.parameters,
      children: this.children,
      symbolType: this.symbolType,
    };
  }
}
