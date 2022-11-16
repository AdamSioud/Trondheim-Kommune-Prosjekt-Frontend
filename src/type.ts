import { GeoJsonObject } from 'geojson'

export interface PriceInput {
  selected: string[],
  budget: number
}

export interface AgeInput {
  selected: string[],
  percent: number
}

export interface EnvironmentInput {
  weight: number
}

interface ParamInput{
  // eslint-disable-next-line camelcase
  price_input?: PriceInput,
  // eslint-disable-next-line camelcase
  age_input?: AgeInput,
  // eslint-disable-next-line camelcase
  wellBeing_input?: EnvironmentInput,
  // eslint-disable-next-line camelcase
  safety_input?: EnvironmentInput,
  // eslint-disable-next-line camelcase
  culture_input?: EnvironmentInput,
  // eslint-disable-next-line camelcase
  outdoor_input?: EnvironmentInput,
  // eslint-disable-next-line camelcase
  transport_input?: EnvironmentInput,
  // eslint-disable-next-line camelcase
  walkway_input?: EnvironmentInput,
  // eslint-disable-next-line camelcase
  noiseTraffic_input?: EnvironmentInput,
  // eslint-disable-next-line camelcase
  noiseOther_input?: EnvironmentInput
}

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
