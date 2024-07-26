/**
 * The NotifyLog class provides methods to interact with the NotifyLog API.
 */
export class SaaS {
  private apiKey: string // The API key used for authenticating with the NotifyLog API.

  /**
   * Initializes a new instance of the NotifyLog class with the provided API key.
   * @param apiKey The API key for authenticating with the NotifyLog API.
   */
  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      throw new Error('SDK Error: API key is required.')
    }

    this.apiKey = apiKey
  }
}
