import ts from "typescript"

export interface DocEntry {
  name?: string
  documentation?: string
  type?: string
  tags?: { name: string; text: string }[]
  required?: boolean
  members?: DocEntry[]
  parameters?: DocEntry[]
  children?: DocEntry[]
  symbolType?: ts.Type
}
