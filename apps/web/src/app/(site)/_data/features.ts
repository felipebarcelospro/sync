import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import {
  Expand,
  CreditCard,
  UserCheck,
  BookOpen,
  Activity,
  Layers,
} from 'lucide-react'

export const getFeatures = () => {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return [
    {
      Icon: UserCheck,
      title: dict.site.sections.morePossibilities.main.features[0].title,
      description:
        dict.site.sections.morePossibilities.main.features[0].description,
    },
    {
      Icon: CreditCard,
      title: dict.site.sections.morePossibilities.main.features[1].title,
      description:
        dict.site.sections.morePossibilities.main.features[1].description,
    },
    {
      Icon: Expand,
      title: dict.site.sections.morePossibilities.main.features[2].title,
      description:
        dict.site.sections.morePossibilities.main.features[2].description,
    },
    {
      Icon: BookOpen,
      title: dict.site.sections.morePossibilities.main.features[3].title,
      description:
        dict.site.sections.morePossibilities.main.features[3].description,
    },
    {
      Icon: Activity,
      title: dict.site.sections.morePossibilities.main.features[4].title,
      description:
        dict.site.sections.morePossibilities.main.features[4].description,
    },
    {
      Icon: Layers,
      title: dict.site.sections.morePossibilities.main.features[5].title,
      description:
        dict.site.sections.morePossibilities.main.features[5].description,
    },
  ]
}
