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
      </div>
    </main>
  );
}
