import * as lodash from 'lodash'

export function interpolate(text: string, data: Record<string, any>) {
  if (!text) return undefined
  lodash.templateSettings.interpolate = /{{([\s\S]+?)}}/g
  return lodash.template(text)(data)
}

export function interpolateObject(
  template: Record<string, any>,
  data: Record<string, any>,
): Record<string, any> {
  const result = {}
  if (!template || Object.keys(template).length === 0) return result

  Object.keys(template).forEach((key) => {
    const value = template[key]
    if (typeof value === 'string') {
      result[key] = interpolate(value.trim(), data)
    } else if (typeof value === 'object' && value !== null) {
      result[key] = interpolateObject(value.trim(), data)
    } else {
      result[key] = value
    }
  })

  return result
}
