import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 z-10 backdrop-blur-sm bg-black/30 p-8 rounded-2xl">
              <div className="mb-8">
                <Link
                  href="/voice-agent-api"
                  className="inline-flex items-center px-4 py-2 rounded-full border border-lime-400 text-lime-400 hover:bg-lime-400/10 transition-colors"
                >
                  <span className="text-shadow-sm">
                    Introducing Travana&apos;s Voice Agent API
                  </span>
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

              <h1 className="font-normal main-gradient text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-6">
                The <span className="gradient-text lime-glow">Voice AI</span>{" "}
                platform for
                <span className="silver-shine"> enterprise use cases</span>
              </h1>

              <p className="text-lg text-gray-200 mb-8 font-light">
                Travana&apos;s voice AI platform provides APIs for
                <span className="silver-accent font-medium">
                  {" "}
                  speech-to-text
                </span>
                ,
                <span className="text-lime-400 font-medium">
                  {" "}
                  text-to-speech
                </span>
                , and full
                <span className="silver-accent font-medium">
                  {" "}
                  speech-to-speech
                </span>{" "}
                voice agents. Over{" "}
                <span className="text-lime-300 font-semibold">
                  200,000+
                </span>{" "}
                developers use Travana to build voice AI products and features.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/try-free"
                  className="shimmer-effect px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-medium rounded-md hover:shadow-lg hover:shadow-lime-500/20 transition-all btn-glow text-center"
                >
                  Try It Free
                </Link>
                <Link
                  href="/demo"
                  className="px-6 py-3 bg-transparent border border-lime-500 text-white font-medium rounded-md hover:bg-lime-500/20 transition-colors text-center"
                >
                  Get A Demo
                </Link>
              </div>
            </div>

            {/* Video Section - Displaying Original Video */}
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center float-animation">
              <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/20 via-transparent to-lime-600/20"></div>
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
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-normal main-gradient text-2xl sm:text-3xl lg:text-4xl mb-12 text-center">
            <span className="silver-shine">Transforming</span> voice
            interactions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-500/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-slate-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-slate-300"
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
              <h3 className="text-xl font-semibold mb-2 text-slate-300">
                Speech-to-Text
              </h3>
              <p className="text-gray-300 font-light">
                Convert spoken words into written text with high accuracy and in
                real-time.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-lime-500/50 hover:shadow-lg hover:shadow-lime-500/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-lime-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-lime-400"
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
              <h3 className="text-xl font-semibold mb-2 text-lime-300">
                Text-to-Speech
              </h3>
              <p className="text-gray-300 font-light">
                Generate natural-sounding speech from text with multiple voices
                and languages.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-500/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500/20 to-slate-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-slate-300"
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
              <h3 className="text-xl font-semibold mb-2 text-slate-300">
                Voice Agents
              </h3>
              <p className="text-gray-300 font-light">
                Create intelligent voice agents that can understand, process,
                and respond to human speech.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
