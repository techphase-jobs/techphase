import { getServices, seedIfEmpty } from '@/lib/json-store'
import ServicesClient from './services-client'

export default async function ServicesPage() {
  seedIfEmpty()
  const services = getServices()

  return <ServicesClient services={services} />
}
