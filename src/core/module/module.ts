import ts from "typescript";
import type { BaseModule } from "./types";
import { setModule } from "./utils";

let hash = 0;

export class Module implements BaseModule<Module> {
  name?: string;
  documentation?: string;
  type?: string;
  _type?: ts.Type;
  tags?: { name: string; text: string }[];
  required?: boolean;
  members?: Module[];
  parameters?: Module[];
  children?: Module[];
  symbol?: ts.Symbol;

  /**
   * module flag
   * @date 10/7/2023 - 10:06:49 AM
   *
   * @type {?number}
   */
  hash?: number;

  constructor(param: BaseModule<Module>) {
    this.name = param.name || "";
    this.documentation = param.documentation || "";
    this.type = param.type || "";
    this._type = param._type;
    this.tags = param.tags || [];
    this.required = param.required || false;
    this.members = param.members || [];
    this.parameters = param.parameters || [];
    this.children = param.children || [];
    this.symbol = param.symbol || (null as unknown as ts.Symbol);
    this.hash = hash++;

    setModule(this.hash, this);
    return this;
  }

  toString = (): Module => {
    return {
      name: this.name,
      documentation: this.documentation,
      type: this.type,
      tags: this.tags,
      required: this.required,
      members: this.members?.map((o) => o.toString()),
      parameters: this.parameters?.map((o) => o.toString()),
      children: this.children?.map((o) => o.toString()),
    };
  };
}
