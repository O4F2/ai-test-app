// pages/about.js
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-orange-400">
      <Head>
        <title>서비스 소개 - AI 구분력 테스트</title>
        <meta name="description" content="AI가 만든 이미지와 인간의 창작물을 구분하는 능력을 테스트하는 서비스입니다. 당신의 AI 구분력을 확인해보세요." />
      </Head>

      {/* 상단 헤더 */}
      <header className="bg-gradient-to-r from-pink-500 to-red-500 shadow-lg p-4 text-center">
        <Link href="/" className="text-white font-bold text-xl hover:text-pink-100 transition-colors">
          ← AI 구분력 테스트로 돌아가기
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            서비스 소개
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">나의 AI 구분력 테스트란?</h2>
              <p className="text-lg">
                최근 AI가 만드는 이미지와 인간의 창작물을 구분하기 어려워졌습니다. 
                ChatGPT, Midjourney, DALL-E, Stable Diffusion 같은 AI 도구들이 놀라울 정도로 
                사실적이고 창의적인 이미지를 생성할 수 있게 되면서, 일반인들이 AI 생성물과 
                인간 창작물을 구별하는 것이 점점 더 힘들어지고 있습니다.
              </p>
              <p className="text-lg mt-4">
                이 테스트는 사용자가 자신의 변별력을 재미있게 시험해볼 수 있도록 만들어졌습니다. 
                과연 당신은 AI가 만든 것과 인간이 만든 것을 얼마나 정확하게 구분할 수 있을까요?
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">테스트 방식</h2>
              <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-pink-500 font-bold mr-3">1.</span>
                    <span>총 12개의 이미지가 랜덤한 순서로 출제됩니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 font-bold mr-3">2.</span>
                    <span>각 이미지를 보고 'AI 생성' 또는 '인간 창작' 중 하나를 선택합니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 font-bold mr-3">3.</span>
                    <span>모든 테스트가 끝나면 당신의 점수와 함께 재미있는 등급을 알려줍니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 font-bold mr-3">4.</span>
                    <span>결과를 친구들과 공유하여 누가 더 뛰어난 구분력을 가졌는지 경쟁해보세요</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">AI 이미지 구분 팁</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">🔍 세부사항 확인하기</h3>
                  <p>AI가 만든 이미지는 종종 손가락, 치아, 귀걸이 같은 작은 디테일에서 
                  어색함이 발견됩니다. 특히 손가락 개수나 모양을 유심히 살펴보세요.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-green-800 mb-3">🎨 질감과 일관성</h3>
                  <p>AI는 때때로 비현실적인 질감이나 조명을 만들어냅니다. 
                  전체적인 이미지의 일관성을 확인해보세요.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-purple-800 mb-3">📐 기하학적 정확성</h3>
                  <p>건물, 도로, 대칭적인 객체들의 원근법이나 비례가 
                  자연스러운지 확인해보세요.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-yellow-800 mb-3">💡 직관 믿기</h3>
                  <p>때로는 논리적 분석보다 첫 느낌이 정확할 수 있습니다. 
                  '뭔가 이상하다'는 직감을 무시하지 마세요.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">등급 시스템</h2>
              <div className="space-y-3">
                <div className="flex items-center p-4 bg-gray-100 rounded-xl">
                  <span className="text-2xl mr-4">🤖</span>
                  <div>
                    <strong>AI 노예 (0-3점)</strong>
                    <p className="text-sm text-gray-600">혹시... AI세요? AI의 세상에 완전히 빠져있네요!</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-100 rounded-xl">
                  <span className="text-2xl mr-4">👀</span>
                  <div>
                    <strong>매트릭스 거주자 (4-6점)</strong>
                    <p className="text-sm text-gray-600">진실과 거짓의 경계에서 아슬아슬 줄타기 중!</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-100 rounded-xl">
                  <span className="text-2xl mr-4">🧐</span>
                  <div>
                    <strong>AI 지배자 (7-9점)</strong>
                    <p className="text-sm text-gray-600">웬만한 AI는 당신의 눈을 속일 수 없군요!</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-yellow-100 rounded-xl">
                  <span className="text-2xl mr-4">👑</span>
                  <div>
                    <strong>AI 감별사 (10-12점)</strong>
                    <p className="text-sm text-gray-600">완벽합니다! 당신은 상위 1%의 '진짜' 인간입니다!</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">왜 이런 테스트가 필요할까요?</h2>
              <p className="text-lg">
                AI 기술이 급속도로 발전하면서, 가짜 뉴스, 딥페이크, 사기성 광고 등에 
                AI 생성 이미지가 악용되는 사례가 증가하고 있습니다. 이런 시대에 
                AI와 인간의 창작물을 구분할 수 있는 능력은 단순한 재미를 넘어 
                필수적인 디지털 리터러시가 되었습니다.
              </p>
              <p className="text-lg mt-4">
                이 테스트를 통해 당신의 현재 수준을 확인하고, 앞으로 더욱 정교해질 
                AI 기술에 대비해 보세요. 그리고 친구들과 함께 도전해보며 
                재미있게 AI 시대를 준비해보세요!
              </p>
            </section>

            <div className="text-center mt-12">
              <Link href="/" className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                🎯 지금 바로 테스트 시작하기
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 text-white text-center py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">Copyright © 2025 emergencylabs</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-pink-200 transition-colors">메인으로</Link>
            <Link href="/about" className="hover:text-pink-200 transition-colors">서비스 소개</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}