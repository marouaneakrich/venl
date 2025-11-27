export interface VenlOptions {
  schema?: Record<string, "string" | "number" | "boolean" | "string?" | "number?" | "boolean?">;
  strict?: boolean;
  envFiles?: string[] | null;
  autoCast?: boolean;
}

export interface VenlEnv {
  [key: string]: string | number | boolean | null;
}

export function venl(options?: VenlOptions): VenlEnv;

declare namespace venl {
  function reload(options?: VenlOptions): VenlEnv;
}

export default venl;
