import ts from "typescript"
import { DocEntry } from "./types"

export class DocCache {
  mapper: Map<ts.Type, DocEntry>

  constructor() {
    this.mapper = new Map()
  }

  get(key: ts.Type): DocEntry | undefined {
    return this.mapper.get(key)
  }

  set(key: ts.Type, value: DocEntry): void {
    if (!this.has(key)) {
      this.mapper.set(key, value)
    }
  }

  has(key: ts.Type): boolean {
    return this.mapper.has(key)
  }
}
