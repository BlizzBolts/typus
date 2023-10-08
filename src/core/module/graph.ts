import ts from "typescript";
import { Module } from "./module";

export class ModuleGraph {
  /**
   * dependencies mapper
   * @date 9/27/2023 - 5:13:44 PM
   *
   * @type {Map<ts.Type, Module>}
   */
  deps: Map<ts.Type, Module>;

  /**
   * child module
   * @date 9/27/2023 - 5:17:32 PM
   *
   * @type {Module[][]}
   */
  children: Module[][];

  /**
   * hit cache times
   * @date 9/27/2023 - 5:17:24 PM
   *
   * @type {number}
   */
  hitCacheTimes = 0;

  constructor() {
    this.deps = new Map();
    this.children = [];
  }

  /**
   * get cached module by type
   * @date 9/27/2023 - 5:18:10 PM
   *
   * @param {ts.Type} type
   * @returns {Module | undefined}
   */
  getCacheBy = (type: ts.Type) => {
    const cache = this.deps.get(type);
    if (cache) {
      this.hitCacheTimes += 1;
    }
    return cache;
  };

  setCacheModule = (type: ts.Type, module: Module): this => {
    this.deps.set(type, module);
    return this;
  };

  toString = () => {
    return {
      children: this.children?.map((o) => {
        return o?.map((item) => item.toString());
      }),
    };
  };
}
