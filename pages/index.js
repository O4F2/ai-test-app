// pages/index.js
import { useState } from "react";

// 폴더 기반 문제 생성 함수
const generateQuestions = () => {
  const questions = [];
  
  // AI 생성 이미지 (ai-creation 폴더에서 5개)
  for (let i = 1; i <= 5; i++) {
    questions.push({
      id: i,
      type: "image",
      content: `/ai-creation/image${i}.jpg`,
      answer: "AI"
    });
  }

  
  // 인간 창작 이미지 (human-creation 폴더에서 5개)  
  for (let i = 1; i <= 5; i++) {
    questions.push({
      id: i + 5,
      type: "image", 
      content: `/human-creation/image${i}.jpg`,
      answer: "human"
    });
  }
  
  // 배열을 섞어서 랜덤한 순서로 출제
  return questions.sort(() => Math.random() - 0.5);
};

const questions = generateQuestions();

export default function Home() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResultIcon, setShowResultIcon] = useState(null); // "O" | "X"

  const handleAnswer = (choice) => {
    if (selected) return; // 이미 선택한 경우 클릭 방지
    setSelected(choice);

    const isCorrect = choice === questions[current].answer;
    if (isCorrect) setScore(score + 1);

    setShowResultIcon(isCorrect ? "O" : "X");

    // 1초 후 다음 문제로 이동 (설명이 없으므로 더 빠르게)
    setTimeout(() => {
      setShowResultIcon(null);
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setStep("result");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-orange-400 flex flex-col">
      {/* 상단 고정 헤더 */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg p-4 text-center font-bold text-xl text-white z-50">
        AI 구분력 테스트
      </header>

      <main className="flex-1 flex flex-col mt-20 px-4 pb-4 max-w-lg mx-auto w-full">
        {step === "intro" && (
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center max-w-md mx-4 border border-white/20">
              <div className="mb-6">
                <div className="text-6xl mb-4 animate-pulse">🤖👨‍💻</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  AI vs 인간
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  당신은 AI가 만든 것과 실제 창작물을 구별할 수 있을까요?
                </p>
              </div>
              <button
                onClick={() => setStep("quiz")}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
              >
                시작하기
              </button>
            </div>
          </div>
        )}

        {step === "quiz" && (
          <div className="flex flex-col flex-1 py-4">
            {/* 진행도 표시 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-white/80 font-medium">문제 {current + 1}</span>
                <span className="text-sm text-white/80 font-medium">{questions.length}개 중</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 backdrop-blur-sm">
                <div 
                  className="bg-gradient-to-r from-yellow-300 to-pink-300 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Tinder 스타일 카드 */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl p-6 mx-4 transform hover:rotate-1 transition-transform duration-300 border-4 border-white/50">
                  <div className="relative">
                    <img
                      src={questions[current].content}
                      alt="문제 이미지"
                      className="w-full h-96 object-cover rounded-2xl shadow-md"
                    />
                  </div>
                  
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      AI 생성 이미지일까요?
                    </h3>
                  </div>
                </div>
              </div>
            </div>


            {/* 답변 버튼 */}
            <div className="flex justify-center gap-4 mb-8 px-4">
              <button
                onClick={() => handleAnswer("AI")}
                disabled={selected !== null}
                className={`flex-1 max-w-36 py-4 px-4 rounded-2xl shadow-xl font-bold transition-all duration-300 transform flex flex-col items-center gap-2 ${
                  selected === "AI"
                    ? selected === questions[current].answer
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
                    ? selected === questions[current].answer
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
          <div className="flex flex-col items-center justify-center flex-1 py-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center max-w-md mx-4 border border-white/20">
              {/* 결과 애니메이션 */}
              <div className="mb-6">
                <div className="text-6xl mb-4 animate-pulse">
                  {score <= 2 && "🤖"}
                  {score > 2 && score <= 5 && "👀"}
                  {score > 5 && score <= 8 && "🕵️‍♂️"}
                  {score > 8 && "🧠"}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  당신의 AI 구분력!
                </h2>
                
                <div className="relative mb-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                    {score} / {questions.length}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">점수</div>
                </div>
                
                <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-4 mb-4">
                  <p className="text-lg font-bold text-gray-800 mb-2">
                    {score <= 2 && "🤖 AI 찬양자"}
                    {score > 2 && score <= 5 && "👀 초보 탐지자"}
                    {score > 5 && score <= 8 && "🕵️‍♂️ 숙련자"}
                    {score > 8 && "🧠 AI 탐지 마스터"}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
            완벽합니다! 당신은 상위 1%의 '진짜' 인간입니다.
            <br />
            친구들에게 당신의 생존 능력을 자랑하세요!
        </>
    }
                  </p>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const shareText = `나는 AI 구분력 테스트에서 ${score}/${questions.length}점을 받았어요! 당신도 도전해보세요!`;
                    if (navigator.share) {
                      navigator.share({
                        title: "AI 구분력 테스트 결과",
                        text: shareText,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
                      alert("결과가 클립보드에 복사되었습니다!");
                    }
                  }}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  친구들에게 자랑하기
                </button>
                
                <button
                  onClick={() => {
                    setStep("intro");
                    setCurrent(0);
                    setScore(0);
                    setSelected(null);
                    setShowResultIcon(null);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  다시 도전하기
                </button>
              </div>
            </div>

            {/* 광고 영역 */}
            <div className="mt-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl text-center text-sm text-gray-600 max-w-md mx-4 border border-white/30">
              <div className="text-pink-500 font-medium mb-1">광고</div>
              <div>더 많은 재밌는 테스트가 곧 찾아와요!</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}