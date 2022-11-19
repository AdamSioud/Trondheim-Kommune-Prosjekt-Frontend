export class CustomError extends Error {
  public advice: string

  constructor (message: string, name = 'CustomError', advice = '') {
    super(message)
    this.name = name
    this.advice = advice
  }
}
