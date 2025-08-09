// pages/index.js
import { useState, useEffect } from "react";
import Head from 'next/head'; // Head 태그 관리를 위해 import
import Image from 'next/image'; // Next.js Image 컴포넌트 import

// 폴더 기반 문제 생성 함수 (기존과 동일)
const generateQuestions = () => {
  const questions = [];
  
  // AI 생성 이미지 (ai-creation 폴더에서 6개로 수정)
  for (let i = 1; i <= 6; i++) {
    questions.push({
      id: i,
      type: "image",
      content: `/ai-creation/image${i}.jpg`,
      answer: "AI"
    });
  }

  
  // 인간 창작 이미지 (human-creation 폴더에서 6개로 수정)  
  for (let i = 1; i <= 6; i++) {
    questions.push({
      id: i + 6,
      type: "image", 
      content: `/human-creation/image${i}.jpg`,
      answer: "human"
    });
  }
  
  // 배열을 섞어서 랜덤한 순서로 출제
  return questions.sort(() => Math.random() - 0.5);
};

// ** AdBanner 컴포넌트 **
// 구글 광고를 표시하기 위한 전용 컴포넌트입니다.
const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div className="mt-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl text-center max-w-md mx-4 border border-white/30">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7545352297994538"
           crossOrigin="anonymous"></script>
      {/* ad1 */}
      <ins className="adsbygoogle"
           style={{display:"block", minHeight: "100px"}}
           data-ad-client="ca-pub-7545352297994538"
           data-ad-slot="2445419028"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};


// const questions = generateQuestions(); // 더 이상 사용하지 않음 (shuffledQuestions 사용)

export default function Home() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResultIcon, setShowResultIcon] = useState(null); // "O" | "X"
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // 컴포넌트가 처음 로드될 때 문제를 한번만 섞습니다.
  useEffect(() => {
    setShuffledQuestions(generateQuestions());
  }, []);
  
  // 다시 시작하기 함수
  const handleRestart = () => {
    setStep("intro");
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResultIcon(null);
    // 다시 시작할 때 문제를 새로 섞어줍니다.
    setShuffledQuestions(generateQuestions());
  }

  const handleAnswer = (choice) => {
    if (selected) return;
    setSelected(choice);

    const isCorrect = choice === shuffledQuestions[current].answer;
    if (isCorrect) setScore(score + 1);

    setShowResultIcon(isCorrect ? "O" : "X");

    setTimeout(() => {
      setShowResultIcon(null);
      setSelected(null);
      if (current + 1 < shuffledQuestions.length) {
        setCurrent(current + 1);
      } else {
        setStep("result");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-orange-400 flex flex-col">
       <Head>
        <title>AI 구분력 테스트 - AI vs 인간</title>
        <meta name="description" content="AI가 만든 창작물과 인간의 창작물을 구별해보세요! 당신의 AI 구분력 점수는?" />
        {/* 구글 애드센스 스크립트 */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7545352297994538"
          crossOrigin="anonymous"
        ></script>
      </Head>
      
      {/* (헤더, 인트로, 퀴즈 부분은 기존 코드와 동일하여 생략) */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg p-4 text-center font-bold text-xl text-white z-50">
        AI 구분력 테스트
      </header>

      <main className="flex-1 flex flex-col mt-20 px-2 pb-4 max-w-lg mx-auto w-full">
      {step === "intro" && (
          <div className="flex flex-col h-full py-4">
            {/* 상단 제목 */}
            <div className="text-center mb-6 flex-shrink-0">
              <h1 className="text-2xl font-bold text-white mb-2">
                AI vs 인간 구분력 테스트
              </h1>
              <p className="text-white/80 text-sm">
                당신은 AI가 만든 것과 실제 창작물을 구별할 수 있을까요?
              </p>
            </div>

            {/* AI vs Human 이미지 카드 */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="flex gap-3 w-full max-w-sm mx-2">
                {/* AI 카드 */}
                <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-xl transform rotate-[-2deg]">
                  <div className="text-4xl mb-2">🤖</div>
                  <div className="text-sm font-bold text-gray-800 mb-1">AI 생성</div>
                  <div className="w-full h-24 rounded-lg overflow-hidden">
                    <Image
                      src="/ai-creation/image1.jpg"
                      alt="AI 생성 이미지 예시"
                      width={120}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* VS 텍스트 */}
                <div className="flex items-center justify-center px-2">
                  <span className="text-white font-bold text-2xl">VS</span>
                </div>

                {/* Human 카드 */}
                <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-xl transform rotate-[2deg]">
                  <div className="text-4xl mb-2">👨‍💻</div>
                  <div className="text-sm font-bold text-gray-800 mb-1">인간 창작</div>
                  <div className="w-full h-24 rounded-lg overflow-hidden">
                    <Image
                      src="/human-creation/image1.jpg"
                      alt="인간 창작 이미지 예시"
                      width={120}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div className="px-4 flex-shrink-0">
              <button
                onClick={() => setStep("quiz")}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
              >
                🎯 테스트 시작하기
              </button>
              <p className="text-center text-white/60 text-xs mt-2">
                총 12문제 · 약 1분 소요
              </p>
            </div>
          </div>
        )}

        {step === "quiz" && shuffledQuestions.length > 0 && (
          <div className="flex flex-col h-full py-2">
            {/* 진행도 표시 */}
            <div className="mb-4 flex-shrink-0">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-white/80 font-medium">문제 {current + 1}</span>
                <span className="text-sm text-white/80 font-medium">{shuffledQuestions.length}개 중</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 backdrop-blur-sm">
                <div 
                  className="bg-gradient-to-r from-yellow-300 to-pink-300 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${((current + 1) / shuffledQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Tinder 스타일 카드 */}
            <div className="flex-1 flex items-center justify-center mb-4">
              <div className="relative w-full max-w-sm">
                <div className="bg-white rounded-3xl shadow-2xl p-4 mx-2 transform hover:rotate-1 transition-transform duration-300 border-4 border-white/50">
                  <div className="relative">
                    <Image
                      src={shuffledQuestions[current].content}
                      alt="문제 이미지"
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-2xl shadow-md"
                      priority
                    />
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">
                      AI 생성 이미지일까요?
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* 답변 버튼 */}
            <div className="flex justify-center gap-3 px-2 flex-shrink-0">
              <button
                onClick={() => handleAnswer("AI")}
                disabled={selected !== null}
                className={`flex-1 max-w-36 py-4 px-4 rounded-2xl shadow-xl font-bold transition-all duration-300 transform flex flex-col items-center gap-2 ${
                  selected === "AI"
                    ? selected === shuffledQuestions[current].answer
                      ? "bg-green-500 text-white scale-105 shadow-green-500/50"
                      : "bg-red-500 text-white scale-105 shadow-red-500/50"
                    : "bg-gradient-to-br from-purple-500 to-indigo-600 text-white hover:scale-105 hover:shadow-purple-500/50 active:scale-95"
                } ${selected !== null ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
              >
                <div className="text-3xl">🤖</div>
                <div className="text-sm font-medium">AI 생성</div>
              </button>
              
              <button
                onClick={() => handleAnswer("human")}
                disabled={selected !== null}
                className={`flex-1 max-w-36 py-4 px-4 rounded-2xl shadow-xl font-bold transition-all duration-300 transform flex flex-col items-center gap-2 ${
                  selected === "human"
                    ? selected === shuffledQuestions[current].answer
                      ? "bg-green-500 text-white scale-105 shadow-green-500/50"
                      : "bg-red-500 text-white scale-105 shadow-red-500/50"
                    : "bg-gradient-to-br from-pink-500 to-red-500 text-white hover:scale-105 hover:shadow-pink-500/50 active:scale-95"
                } ${selected !== null ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
              >
                <div className="text-3xl">👨‍💻</div>
                <div className="text-sm font-medium">인간 창작</div>
              </button>
            </div>

            {/* 선택 후 O/X 표시 */}
            {showResultIcon && (
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                <span
                  className={`text-8xl sm:text-9xl font-bold ${
                    showResultIcon === "O" ? "text-green-500" : "text-red-500"
                  } animate-bounce drop-shadow-lg`}
                >
                  {showResultIcon}
                </span>
              </div>
            )}
          </div>
        )}
        
        {step === "result" && (
          <div className="flex flex-col h-full py-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 text-center mx-2 border border-white/20 flex-shrink-0">
               {/* 결과 표시 - 컴팩트하게 조정 */}
               <div className="mb-4">
                <div className="text-5xl mb-3 animate-pulse">
                  {score <= 3 && "🤖"}
                  {score > 3 && score <= 6 && "👀"}
                  {score > 6 && score <= 9 && "🧐"}
                  {score > 9 && "👑"}
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  당신의 AI 구분력 점수는?
                </h2>
                
                <div className="relative mb-3">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                    {score} / {shuffledQuestions.length}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">점수</div>
                </div>
                
                <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-3 mb-3">
                  <p className="text-base font-bold text-gray-800 mb-1">
                    {score <= 3 && "AI 노예"}
                    {score > 3 && score <= 6 && "매트릭스 거주자"}
                    {score > 6 && score <= 9 && "AI 지배자"}
                    {score > 9 && "AI 감별사"}
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                  {score <= 3 && 
                    <>
                        혹시... AI세요? AI가 보여주는 세상을 100% 신뢰하는 당신,
                        <br />
                        AI에게 지배당하지 않도록 조심하세요!
                    </>
                  }
                  {score > 3 && score <= 6 && 
                      <>
                          진실과 거짓의 경계에서 아슬아슬 줄타기 중!
                          <br />
                          친구는 진짜 인간인지 꼭 확인해보세요.
                      </>
                  }
                  {score > 6 && score <= 9 && 
                      <>
                          웬만한 AI는 당신의 눈을 속일 수 없군요.
                          <br />
                          AI 개발자들이 당신의 테스트 결과를 두려워합니다.
                      </>
                  }
                  {score > 9 && 
                      <>
                          완벽합니다! 당신은 상위 1%의 &lsquo;진짜&rsquo; 인간입니다.
                          <br />
                          친구들에게 당신의 AI 구분 능력을 자랑하세요!
                      </>
                  }
                  </p>
                </div>
              </div>


              {/* 액션 버튼들 */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const shareText = `난 ${score}점, 넌 몇점? 👀 내 "AI 구분력 점수" 확인하고 너도 테스트 해봐!`;
                    const pageUrl = window.location.href;

                    if (navigator.share) {
                      navigator.share({
                        title: "AI 구분력 테스트",
                        text: shareText,
                        url: pageUrl
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(`${shareText}\n${pageUrl}`);
                      alert("결과가 클립보드에 복사되었어요. 친구에게 붙여넣기 해주세요!");
                    }
                  }}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  결과 공유하기
                </button>
                
                <button
                  onClick={handleRestart}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  다시 도전하기
                </button>
              </div>
            </div>

            {/* 광고 영역 - 컴팩트하게 조정 */}
            <div className="flex-1 flex items-end justify-center mt-2">
              <AdBanner />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}