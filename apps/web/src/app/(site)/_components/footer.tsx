import { APP_CONFIGS } from '@/boilerplate.config'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { Separator } from '@design-system/react/components/ui/separator'
import { Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <footer className="border-t border-border relative">
      <div className="border-t border-border pt-8 text-sm">
        <div className="container max-w-screen-xl flex flex-col md:flex-row text-center md:text-left justify-between opacity-60">
          <p className="mb-8 md:mb-0">
            &copy; {new Date().getFullYear()} {APP_CONFIGS.app.name}.{' '}
            {dict.site.layout.footer.rights}
          </p>
          <ul className="flex flex-col md:flex-row space-y-2 h-4 md:space-x-8 items-center md:space-y-0">
            <li className="mr-4">
              <a href={APP_CONFIGS.app.links.terms}>
                {dict.site.layout.footer.terms}
              </a>
            </li>
            <li>
              <a href={APP_CONFIGS.app.links.privacy}>
                {dict.site.layout.footer.privacy}
              </a>
            </li>
            <li>
              <Separator orientation="vertical" className="h-3" />
            </li>
            <li>
              <a
                href={APP_CONFIGS.app.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="group rounded-md p-2 transition-colors dark:text-white/60 dark:hover:bg-white/10 dark:active:bg-white/20"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href={APP_CONFIGS.app.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors dark:text-white/60 dark:hover:bg-white/10 dark:active:bg-white/20"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
