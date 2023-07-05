interface LogPayload {
  content: string;
}

interface ActonMeta {
  log: (payload: LogPayload) => void;
}

interface Action {
  meta: ActonMeta;
}

export interface ComplexInterface {
  Action: Action;
}
