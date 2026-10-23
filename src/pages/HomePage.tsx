import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { BookingCta } from '../features/booking/BookingCta'
import { ProcessSection } from '../features/booking/ProcessSection'
import { AboutPreview } from '../features/home/AboutPreview'
import { FaqSection } from '../features/home/FaqSection'
import { GalleryPreview } from '../features/home/GalleryPreview'
import { Hero } from '../features/home/Hero'
import { ServiceMarquee } from '../features/home/ServiceMarquee'
import { ServicesPreview } from '../features/home/ServicesPreview'
import { Testimonials } from '../features/home/Testimonials'
import { TrustHighlights } from '../features/home/TrustHighlights'

export default function HomePage() {
  return (
    <>
      <PageSEO route={routes.home} />
      <Hero />
      <ServiceMarquee />
      <TrustHighlights />
      <AboutPreview />
      <ServicesPreview />
      <GalleryPreview />
      <ProcessSection />
      <FaqSection />
      <Testimonials />
      <BookingCta />
    </>
  )
}
