import { getHero, getServices, getTestimonials, seedIfEmpty } from '@/lib/json-store'
import HomeClient from './home-client'

export default async function HomePage() {
  await seedIfEmpty()
  const hero = await getHero()
  const services = await getServices()
  const testimonials = await getTestimonials()

  return <HomeClient hero={hero} services={services} testimonials={testimonials} />
}
