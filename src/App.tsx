import { useState } from 'react';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';

const questions = [
  {
    title: 'パーソナルカラー',
    options: ['イエベ春', 'ブルベ夏', 'イエベ秋', 'ブルベ冬'],
  },
  {
    title: '2ndパーソナルカラー',
    options: ['イエベ春', 'ブルベ夏', 'イエベ秋', 'ブルベ冬'],
  },
  {
    title: '顔タイプ',
    options: ['キュート', 'フレッシュ', 'フェミニン', 'クール'],
  },
  {
    title: '盛り耐性',
    options: ['盛り耐性あり', '盛り耐性なし'],
  },
  {
    title: '肌タイプ',
    options: ['乾燥肌', '普通肌', '混合肌', '脂性肌'],
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    setCurrentPage(currentPage + 1);
  };

  const resetQuiz = () => {
    setCurrentPage(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(126deg, #ff8fb5, #eac0ec)' }}>
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2">
          <h1 className="text-xl font-semibold">アプリ</h1>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-transparent rounded-lg p-8 max-w-md w-full">
          {currentPage >= questions.length ? (
            <ResultPage answers={answers} onReset={resetQuiz} />
          ) : (
            <QuizPage
              question={questions[currentPage]}
              onAnswer={handleAnswer}
              currentPage={currentPage}
              totalPages={questions.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;