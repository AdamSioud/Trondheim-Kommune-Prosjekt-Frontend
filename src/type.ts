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

export interface ParamInput{
  priceInput?: PriceInput,
  ageInput?: AgeInput,
  wellBeingInput?: EnvironmentInput,
  safetyInput?: EnvironmentInput,
  cultureInput?: EnvironmentInput,
  outdoorInput?: EnvironmentInput,
  transportInput?: EnvironmentInput,
  walkwayInput?: EnvironmentInput,
  noiseTrafficInput?: EnvironmentInput,
  noiseOtherInput?: EnvironmentInput
}
