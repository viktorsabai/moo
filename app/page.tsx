export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            Own your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyan-200">
              customer relationships
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            MOO is an AI growth platform for restaurants inside Telegram Mini Apps.
            Track behavior, predict intent, launch automations, and increase repeat revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg border border-cyan-500/50 text-white hover:bg-cyan-600/10 transition-colors">
              Start free
            </button>
            <button className="px-8 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/30 transition-colors">
              See demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
