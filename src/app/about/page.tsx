import { getAbout, seedIfEmpty } from '@/lib/json-store'
import AboutClient from './about-client'

export default async function AboutPage() {
  await seedIfEmpty()
  const about = await getAbout()

  return <AboutClient about={about} />
}
