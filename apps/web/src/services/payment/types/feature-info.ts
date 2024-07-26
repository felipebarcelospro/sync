export type FeatureInfo = {
  id: string
  available: boolean
  quota?: {
    available: number
    total: number
    usage: number
    usageRate: number
  }
}
