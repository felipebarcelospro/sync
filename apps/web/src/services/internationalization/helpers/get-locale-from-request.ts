import { APP_CONFIGS } from '@/boilerplate.config'
import { LocalesEnum } from './get-dictionary'

export function getLocaleFromRequest() {
  return APP_CONFIGS.app.defaultLanguage as LocalesEnum
}
