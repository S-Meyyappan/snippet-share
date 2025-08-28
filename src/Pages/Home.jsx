import LayoutWrapper from "../components/layoutwrapper";

function Home() {
  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to <span className="text-sky-400">Snippet Share</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Snippet Share is your personal space to save, organize, and share small
          pieces of code. No more digging through messy files or scattered notes —
          just clean snippets, easy to find, and simple to share.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-sky-400 mb-2">📌 Save</h2>
          <p className="text-gray-300 text-sm">
            Store your useful code snippets with a title, description, and tags.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-sky-400 mb-2">🔍 Search</h2>
          <p className="text-gray-300 text-sm">
            Quickly find snippets by title or tags and filter through when you need them.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-sky-400 mb-2">❤️ Share</h2>
          <p className="text-gray-300 text-sm">
            Share your snippets with friends or keep them private for yourself.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <a
          href="/login"
          className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-sky-500 transition"
        >
          🚀 Get Started
        </a>
      </section>
    </LayoutWrapper>
  );
}

export default Home;
