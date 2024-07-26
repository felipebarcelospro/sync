import { Badge } from '@design-system/react/components/ui/badge'
import { testimonials } from '../_data/testimonials'

export function TestimonialsSection() {
  return (
    <section className="opacity-1 transform perspective-1200 py-16 space-y-12">
      <header>
        <div className="container max-w-screen-xl flex flex-col items-center justify-center text-center">
          <Badge variant="outline" className="mb-6">
            Testimonials
          </Badge>

          <h3 className="text-white text-3xl font-bold max-w-[80%] font-gradient mb-2">
            Our Delighted Clients
          </h3>

          <p className="opacity-80 text-lg max-w-[40%] text-center">
            We are not done yet, check these out.
          </p>
        </div>
      </header>
      <main>
        <div className="container max-w-screen-xl grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.authorName}
              className="flex flex-col bg-zinc-50 dark:bg-secondary/20 z-10 border border-border p-8 relative rounded-md"
            >
              <p className="opacity-80 text-lg mb-8">{item.content}</p>

              <strong className="text-lg">{item.authorName}</strong>
              <small className="text-lg opacity-60">{item.authorLabel}</small>
            </div>
          ))}
        </div>
      </main>
    </section>
  )
}
