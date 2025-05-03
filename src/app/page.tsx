'use client';
import { useRouter } from 'next/navigation'; 

export default function Home() {
  const router = useRouter();

  const books = [
    { title: "System-Design/Networks", emoji: "🧠" },
    { title: "Typescript/React", emoji: "⚛️" },
    { title: "Python/Django", emoji: "🐍" },
    { title: "AI/Machine Learning", emoji: "🤖" },
  ];

  const handleSelect = (title: string) => {
    router.push(`/book/${encodeURIComponent(title)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-5xl font-extrabold mb-12 text-gray-800 text-center">
        Software Study Library
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {books.map(({ title, emoji }, index) => (
          <div
            key={index}
            onClick={() => handleSelect(title)}
            className="w-48 h-64 bg-white border-4 border-gray-700 shadow-lg rounded-lg flex items-center justify-center p-4 text-center text-lg font-extrabold tracking-tight text-gray-800
                       hover:shadow-2xl hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
          >
             <span className="flex flex-col items-center">
              <span className="text-4xl">{emoji}</span>
              <span className="mt-2">{title}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
