interface ActionMeta {
  /**
   * 上报日志
   * @date 7/4/2023 - 4:43:53 PM
   *
   * @type {(payload: { content: string, v: number }) => Promise<void>}
   */
  log: (payload: { content: string; v: number }) => Promise<void>;
}
