import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface ResultPageProps {
  answers: string[];
  onReset: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ answers, onReset }) => {
  const [personalColor, secondPersonalColor, faceType, makeupTolerance, skinType, image] = answers;

  const getImageUrls = () => {
    if (personalColor === 'イエベ春' && secondPersonalColor === 'ブルベ夏') {
      return ['/iebe_spring_blube_summer.webp'];
    } else if (personalColor === 'イエベ春' && secondPersonalColor === 'イエベ秋') {
      return ['/iebe_spring_iebe_autumn.webp'];
    } else {
      return [
        'https://storage.googleapis.com/studio-design-asset-files/projects/YPqrkkxLa5/s-1024x1024_d7f2548b-d294-4890-aa8a-5a642ffe14d9.webp',
      ];
    }
  };
  
  const [images] = useState([getImageUrls()]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleImageChange = () => {
    setIsFading(true);

    setTimeout(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);

      setTimeout(() => {
        setIsFading(false);
      }, 100);
    }, 500);
  };

  const getPersonalizedMessage = () => {
    let message = `あなたのパーソナルスタイル分析結果:\n\n`;
    message += `パーソナルカラー: ${personalColor}\n`;
    message += `2ndパーソナルカラー: ${secondPersonalColor}\n`;
    message += `顔タイプ: ${faceType}\n`;
    message += `盛り耐性: ${makeupTolerance}\n`;
    message += `肌タイプ: ${skinType}\n`;
    message += `イメージ: ${image}\n\n`;

    message += `あなたにおすすめのスタイル:\n`;
    if (personalColor.includes('イエベ')) {
      message += `・ 暖色系の服やメイクがお似合いです。\n`;
    } else {
      message += `・ 寒色系の服やメイクがお似合いです。\n`;
    }

    if (faceType === 'キュート' || faceType === 'フレッシュ') {
      message += `・ 若々しく元気な印象を活かしたスタイルがおすすめです。\n`;
    } else if (faceType === 'フェミニン') {
      message += `・ 柔らかく女性らしい印象を活かしたスタイルがおすすめです。\n`;
    } else {
      message += `・ シャープでモダンな印象を活かしたスタイルがおすすめです。\n`;
    }

    if (makeupTolerance === '盛り耐性あり') {
      message += `・ トレンドメイクや個性的なスタイルに挑戦してみましょう。\n`;
    } else {
      message += `・ ナチュラルで自然体なメイクやスタイルが似合います。\n`;
    }

    message += `・ ${skinType}に合わせたスキンケアを心がけましょう。\n`;

    return message;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">分析結果</h2>
      <img
        src={images[imageIndex]}
        alt="Personalized result"
        className={`mb-4 rounded object-cover transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
      />
      <button
        className="w-full bg-gradient-to-r from-pink-600 to-pink-400 transform text-white font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg mb-4"
        onClick={handleImageChange}
      >
        他のバリエーションも見てみる
      </button>
      <pre className="whitespace-pre-wrap text-sm mb-6 font-semibold">{getPersonalizedMessage()}</pre>
      <button
        className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:bg-gray-100"
        onClick={onReset}
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        もう一度診断する
      </button>
    </div>
  );
};

export default ResultPage;
