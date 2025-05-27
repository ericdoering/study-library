"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

import pythonQuestions from "../../data/python.json";
import reactQuestions from "../../data/react.json";
import aiQuestions from "../../data/ai.json";
import systemDesignQuestions from "../../data/system-design.json";

export default function BookPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const router = useRouter();
  const { title } = React.use(params);
  const decodedTitle = decodeURIComponent(title || "");
  const [highlightAnswer, setHighlightAnswer] = useState(false);

  if (!decodedTitle) {
    notFound();
  }

  const normalizedTitle = decodedTitle.toLowerCase();

  let bgColor = "bg-white";
  let topic = "";
  let questions: { question: string; answer: string }[] = [];

  if (normalizedTitle.includes("react")) {
    bgColor = "bg-red-100";
    topic = "React";
    questions = reactQuestions;
  } else if (normalizedTitle.includes("python")) {
    bgColor = "bg-blue-100";
    topic = "Python";
    questions = pythonQuestions;
  } else if (
    normalizedTitle.includes("system-design") ||
    normalizedTitle.includes("networks")
  ) {
    bgColor = "bg-green-100";
    topic = "System Design";
    questions = systemDesignQuestions;
  } else if (
    normalizedTitle.includes("ai") ||
    normalizedTitle.includes("machine learning")
  ) {
    bgColor = "bg-purple-100";
    topic = "AI";
    questions = aiQuestions;
  }

  const [randomQA, setRandomQA] = useState<{
    question: string;
    answer: string;
  } | null>(null);

  const getRandomQuestion = () => {
    if (questions.length === 0) return;
    const index = Math.floor(Math.random() * questions.length);
    setRandomQA(questions[index]);
  };

  useEffect(() => {
    getRandomQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedTitle]);

  return (
    <div
      className={`min-h-screen ${bgColor} flex flex-col items-center p-10 transition-colors duration-300`}
    >
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {decodedTitle}
      </h1>

      {randomQA && (
        <div className="w-full max-w-xl bg-white border p-6 rounded shadow-md mb-6">
          <h2 className="text-xl text-gray-900 mb-2">
            Random {topic} Question
          </h2>
          <p className="mb-2 font-bold text-gray-900">
            <strong className="text-gray-900">Q:</strong> {randomQA.question}
          </p>
          <p
            onClick={() => setHighlightAnswer((prev) => !prev)}
            className={`cursor-pointer transition-colors duration-300 ${
              highlightAnswer ? "text-gray-900" : ""
            }`}
          >
            <strong>A:</strong> {randomQA.answer}
          </p>
          <button
            onClick={() => {
              setHighlightAnswer(false);
              getRandomQuestion();
            }}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500 transition"
          >
            Show Another Question
          </button>
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-gray-800 text-white font-bold rounded hover:bg-gray-500 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
