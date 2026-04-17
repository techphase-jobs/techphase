import { getTestimonials, getClients, seedIfEmpty } from '@/lib/json-store'
import ClientsClient from './clients-client'

export default async function ClientsPage() {
  seedIfEmpty()
  const testimonials = getTestimonials()
  const clients = getClients()

  return <ClientsClient clients={clients} testimonials={testimonials} />
}
