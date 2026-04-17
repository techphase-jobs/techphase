import { getTestimonials, getClients, seedIfEmpty } from '@/lib/json-store'
import ClientsClient from './clients-client'

export default async function ClientsPage() {
  await seedIfEmpty()
  const testimonials = await getTestimonials()
  const clients = await getClients()

  return <ClientsClient clients={clients} testimonials={testimonials} />
}
