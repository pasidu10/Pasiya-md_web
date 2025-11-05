export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-blue-100 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-800 mb-4">
        විභාග ජයගැනීමේ ඔබේ මඟ - Passify
      </h2>
      <p className="text-gray-700 mb-6">
        A/L සහ O/L සිසුන් සඳහා සම්පූර්ණ පාඩම්, notes, papers සහ AI ගුරුමැදුරක්.
      </p>
      <a
        href="/subjects"
        className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
      >
        විෂයයන් ගවේෂණය කරන්න
      </a>
    </section>
  );
}
