import { getAbout, seedIfEmpty } from '@/lib/json-store'
import AboutClient from './about-client'

export default async function AboutPage() {
  seedIfEmpty()
  const about = getAbout()

  return <AboutClient about={about} />
}
