'use client'

import { useRouter } from 'next/navigation'
import ThemeSwitch from './ThemeSwitch' // adjust path as needed

export default function Home() {
  const router = useRouter()

  const books = [
    { title: "System-Design/Networks", emoji: "🧠" },
    { title: "Typescript/React", emoji: "⚛️" },
    { title: "Python/Django", emoji: "🐍" },
    { title: "AI/Machine Learning", emoji: "🤖" },
  ]

  const handleSelect = (title: string) => {
    router.push(`/book/${encodeURIComponent(title)}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-colors duration-500 
                    bg-gray-100 text-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <div className="absolute top-4 right-4 text-2xl">
        <ThemeSwitch />
      </div>

      <h1 className="text-5xl font-extrabold mb-12 text-center">
        Software Study Library
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {books.map(({ title, emoji }, index) => (
          <div
            key={index}
            onClick={() => handleSelect(title)}
            className="w-48 h-64 cursor-pointer rounded-lg border-4 border-gray-700 shadow-md p-4 flex items-center justify-center 
                       bg-white hover:bg-gray-200 text-gray-900 
                       dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white 
                       hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <span className="flex flex-col items-center">
              <span className="text-4xl">{emoji}</span>
              <span className="mt-2 text-center text-lg font-semibold tracking-tight">
                {title}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
