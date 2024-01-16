import SpeechToText from '@/components/SpeechToText'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="container mx-auto p-4">
      <SpeechToText />
    </div>
    </main>
  )
}
