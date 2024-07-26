export type IntegrationField = {
  id: string
  label: string
  placeholder: string
  type?: string
  help?: string
  icon?: React.ReactNode
}

export type Integration = {
  key: string
  name: string
  description: string
  icon: string
  customForm?: React.ReactElement
  commingSoon?: boolean
  webhook?: boolean
  help?: string
  customClass?: string
  field: IntegrationField[]
}

export type IntegrationGroup = {
  key: string
  name: string
  description: string
  integrations: Integration[]
}
