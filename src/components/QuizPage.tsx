import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface QuizPageProps {
  question: {
    title: string;
    options: string[];
  };
  onAnswer: (answer: string) => void;
  currentPage: number;
  totalPages: number;
}

const QuizPage: React.FC<QuizPageProps> = ({ question, onAnswer, currentPage, totalPages }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  useEffect(() => {
    setClickedIndex(null);
  }, [currentPage]);

  const getPageMessage = (page: number) => {
    switch (page) {
      case 0:
        return 'あなたにあう選択肢を選んでね！';
      case 1:
        return '2ndのパーソナルカラーは何ですか？';
      case 2:
        return '顔タイプを選んでね';
      case 3:
        return '盛り耐性を選んでね';
      case 4:
        return 'あなたにあう選択肢を選んでね！';
      default:
        return 'あなたにあう選択肢を選んでね！';
    }
  };

  const getImageUrl = (page: number) => {
    switch (page) {
      case 0:
        return 'https://storage.googleapis.com/studio-design-asset-files/projects/YPqrkkxLa5/s-1024x1024_bb5bf21a-b958-4483-8e89-e280a49049b5.webp';
      case 1:
        return 'https://storage.googleapis.com/studio-design-asset-files/projects/YPqrkkxLa5/s-1024x1024_5cfb3a7d-09d2-420d-b32e-7f05434af11f.webp';
      case 2:
        return 'https://storage.googleapis.com/studio-design-asset-files/projects/YPqrkkxLa5/s-1024x1024_bb5bf21a-b958-4483-8e89-e280a49049b5.webp';
      case 3:
        return 'https://storage.googleapis.com/studio-design-asset-files/projects/YPqrkkxLa5/s-1024x1024_5cfb3a7d-09d2-420d-b32e-7f05434af11f.webp';
      case 4:
        return 'https://storage.googleapis.com/studio-design-asset-files/projects/YPqrkkxLa5/s-1024x1024_bb5bf21a-b958-4483-8e89-e280a49049b5.webp';
      default:
        return 'https://storage.googleapis.com/studio-design-asset-files/projects/YPqrkkxLa5/s-1024x1024_d7f2548b-d294-4890-aa8a-5a642ffe14d9.webp';
    }
  };

  const handleClick = (index: number, option: string) => {
    setClickedIndex(index);
    setTimeout(() => {
      onAnswer(option);
    }, 1000);
  };

  return (
    <div className="text-center">
      <img
        src={getImageUrl(currentPage)}
        alt="Cute anime girl"
        className="rounded object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
      <p className="text-black-600 mb-6 font-bold">{getPageMessage(currentPage)}</p>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full ${
              clickedIndex === index
                ? 'bg-gradient-to-r from-pink-600 to-pink-400 text-white transform scale-95'
                : 'bg-white text-black'
            } font-semibold py-2 px-4 rounded-full transition duration-500 ease-out flex items-center justify-between shadow-md`}
            onClick={() => handleClick(index, option)}
            style={{ transition: 'transform 0.5s, background-color 0.5s' }}
          >
            <span>{option}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ))}
      </div>
      <div className="mt-8 text-gray-500">
        {currentPage + 1} / {totalPages}
      </div>
    </div>
  );
};

export default QuizPage;
