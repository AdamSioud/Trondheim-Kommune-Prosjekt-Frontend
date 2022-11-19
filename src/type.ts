interface Element {
  type?: string | undefined,
  input?: string | undefined,
  layout?: string | undefined,
  items?: Element[] | undefined
}

interface Checkbox extends Element {
  title?: string,
  picture?: string,
  size?: string
}

export interface Menu {
  title?: string | undefined,
  datatype?: string | undefined,
  input?: string | undefined,
  color?: string | undefined,
  enabled?: boolean | undefined,
  visible?: boolean | undefined,
  elements?: Element[] | { [key: string]: Menu } | undefined
}

export interface ConfigParameters {
  [key: string]: Menu
}

export interface Point {
  label?: string,
  point?: number[]
}

export interface FeatureProperties {
  score: number,
  zoneName: string
}

export interface ZoneData {
  zoneName: string,
  [key: string]: unknown
}

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export interface JSONObject {
  [x: string]: JSONValue;
}
