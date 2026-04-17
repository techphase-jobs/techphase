import { getSettings, seedIfEmpty } from '@/lib/json-store'
import ContactClient from './contact-client'

export default async function ContactPage() {
  await seedIfEmpty()
  const settings = await getSettings()

  return <ContactClient settings={settings} />
}
