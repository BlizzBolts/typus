import { FSWatcher } from "fs-extra"

/**
 * this is a Param
 *
 * @author phshy0607
 */
export interface Param {
  // a is a string
  a: string
  /**
   * B is a string
   */
  b: number
  /**
   * c is a string with fully description
   * @description c is a string
   */
  c?: string
  /** d is a number */
  d?: number

  /**
   * e is Param Interface
   */
  e?: Param
}

/**
 * This is a Test function
 * @param param
 * @returns
 */
function test(param: Param, b: string): number {
  return 1
}

const a: number = 1

export interface ParamTTT {
  /**
   * look a FsWatcher
   */
  a: FSWatcher
}
