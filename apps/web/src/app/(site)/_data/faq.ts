import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'

export const getFaq = () => {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return dict.site.sections.faq.main.questions
}
