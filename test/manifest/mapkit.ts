interface ActionMeta {
  /**
   * 上报日志
   * @date 7/4/2023 - 4:43:53 PM
   *
   * @type {(payload: { content: string, v: number }) => Promise<void>}
   */
  log: (payload: { content: string; v: number }) => Promise<void>;
}

interface Action {
  meta: ActionMeta;
}

interface MapkitType {
  /**
   * @description 操作相关
   * @date 7/4/2023 - 4:44:51 PM
   *
   * @type {Action}
   */
  Action: Action;
}

export default MapkitType;
