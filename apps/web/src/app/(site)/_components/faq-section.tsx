'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@design-system/react/components/ui/accordion'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'

export function FAQSection() {
  const { dict } = useDictionary()

  return (
    <section className="opacity-1 transform perspective-1200 pt-16">
      <div className="container max-w-screen-xl items-start">
        <h3 className="text-3xl font-normal max-w-[36%] mb-2 mt-2">
          {dict.site.sections.faq.header.title}
        </h3>
        <p className="text-lg text-muted-foreground mb-8">
          {dict.site.sections.faq.header.description}
        </p>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {dict.site.sections.faq.main.questions.map((item, index) => (
            <AccordionItem
              key={item.title}
              value={`item-${index}`}
              className="border border-border rounded-md bg-background"
            >
              <AccordionTrigger className="text-left px-6">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-6 border-t border-border pt-4 text-md opacity-60">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
