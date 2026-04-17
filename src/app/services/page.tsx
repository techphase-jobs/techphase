import { getServices, seedIfEmpty } from '@/lib/json-store'
import ServicesClient from './services-client'

export default async function ServicesPage() {
  await seedIfEmpty()
  const services = await getServices()

  return <ServicesClient services={services} />
}
