interface Element {
  type?: string | undefined,
  input?: string | undefined,
  layout?: string | undefined,
  items?: Element[] | undefined
}

export interface Menu {
  title?: string | undefined,
  help?: string | undefined,
  input?: string | undefined,
  color?: string | undefined,
  enabled?: boolean | undefined,
  visible?: boolean | undefined,
  elements?: Element[] | { [key: string]: Menu } | undefined
}

export interface ConfigParameters {
  [key: string]: Menu
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
  cardWidth?: string | undefined
  propertyKey?: string | undefined,
  chartOption?: JSONObject | undefined,
  compareToGeneralData?: boolean | undefined,
  generalDataPropertyName?: string | undefined,
  data?: {[key: string]: string[]} | undefined
}

export interface ConfigDetails {
  [key: string]: Card
}

export interface CookieOptions {
  domain?: string,
  path?: string,
  sameSite?: 'Lax' | 'Strict' | 'None',
  secure?: boolean,
  httponly?: boolean,
  maxAge?: number,
  expires?: number | string,
  custom?: string[][]
}
