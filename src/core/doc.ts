import ts from "typescript";

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

  constructor() {
    this.name = "";
    this.documentation = "";
    this.type = "";
    this.tags = [];
    this.required = false;
    this.members = [];
    this.parameters = [];
    this.children = [];
    this.symbolType = null as unknown as ts.Type;
  }

  serialize() {
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
