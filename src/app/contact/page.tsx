import { getSettings, seedIfEmpty } from '@/lib/json-store'
import ContactClient from './contact-client'

export default async function ContactPage() {
  seedIfEmpty()
  const settings = getSettings()

  return <ContactClient settings={settings} />
}
