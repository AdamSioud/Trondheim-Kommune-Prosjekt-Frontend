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

export type JSONValue =
  | string
  | number
  | boolean
  | { [key: string]: JSONValue }
  | Array<JSONValue>;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface ZoneData {
  zoneName: string,
  [key: string]: JSONObject | string
}

interface Card {
  chartType: string,
  propertyName: string,
  head: string | string[],
  chartOption?: JSONObject | undefined,
  compareToGeneralData?: boolean | undefined,
  generalDataPropertyName?: string | undefined,
  data?: {[key: string]: string[]} | undefined
}

export interface ConfigDetails {
  [key: string]: Card
}
