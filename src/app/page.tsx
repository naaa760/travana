import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <div className="mb-8">
              <Link
                href="/voice-agent-api"
                className="inline-flex items-center px-4 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400/10 transition-colors"
              >
                <span>Introducing Deepgram&apos;s Voice Agent API</span>
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text">
                Voice AI
              </span>{" "}
              platform for enterprise use cases
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Deepgram&apos;s voice AI platform provides APIs for
              speech-to-text, text-to-speech, and full speech-to-speech voice
              agents. Over 200,000+ developers use Deepgram to build voice AI
              products and features.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/try-free"
                className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors text-center"
              >
                Try It Free
              </Link>
              <Link
                href="/demo"
                className="px-6 py-3 bg-transparent border border-cyan-400 text-white font-medium rounded hover:bg-cyan-900/20 transition-colors text-center"
              >
                Get A Demo
              </Link>
            </div>
          </div>

          {/* Video Section */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-gray-800 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-purple-500/20 to-cyan-400/20 z-10 pointer-events-none"></div>
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm text-gray-300">
                  Experience the future of voice technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Speech-to-Text</h3>
            <p className="text-gray-400">
              Convert spoken words into written text with high accuracy and in
              real-time.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Text-to-Speech</h3>
            <p className="text-gray-400">
              Generate natural-sounding speech from text with multiple voices
              and languages.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice Agents</h3>
            <p className="text-gray-400">
              Create intelligent voice agents that can understand, process, and
              respond to human speech.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
