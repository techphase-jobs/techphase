import { getHero, getServices, getTestimonials, seedIfEmpty } from '@/lib/json-store'
import HomeClient from './home-client'

export default async function HomePage() {
  seedIfEmpty()
  const hero = getHero()
  const services = getServices()
  const testimonials = getTestimonials()

  return <HomeClient hero={hero} services={services} testimonials={testimonials} />
}
