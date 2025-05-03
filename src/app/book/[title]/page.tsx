'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

export default function BookPage({ params }: { params: Promise<{ title: string }> }) {
  const router = useRouter();
  const { title } = React.use(params);
  const decodedTitle = decodeURIComponent(title || '');

  if (!decodedTitle) {
    notFound();
  }

  const normalizedTitle = decodedTitle.toLowerCase();

  let bgColor = 'bg-white';
  if (normalizedTitle.includes('react')) {
    bgColor = 'bg-red-100';
  } else if (normalizedTitle.includes('python')) {
    bgColor = 'bg-blue-100';
  } else if (normalizedTitle.includes('system-design') || normalizedTitle.includes('networks')) {
    bgColor = 'bg-green-100';
  } else if (normalizedTitle.includes('ai') || normalizedTitle.includes('machine learning')) {
    bgColor = 'bg-purple-100';
  }

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col items-center p-10 transition-colors duration-300`}>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{decodedTitle}</h1>

      <div className="w-full max-w-md p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-8">
        <p className="text-gray-700 font-medium">
          This is where the content for the selected book would go. Start filling this in with notes,
          examples, or embedded resources related to <strong>{decodedTitle}</strong>.
        </p>
      </div>

      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
