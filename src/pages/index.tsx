import Image from 'next/image'
import { Inter } from 'next/font/google'
import MainHero from '@/components/MainHero'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      {/* Main hero */}
      <MainHero></MainHero>
    </main>
  )
}
