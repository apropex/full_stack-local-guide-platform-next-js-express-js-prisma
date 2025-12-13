//

const contents = [
  {
    icon: "🛡️",
    title: "Verified Guides",
    description: "All our guides go through a strict verification process",
  },
  {
    icon: "💳",
    title: "Secure Payment",
    description: "100% secure payment with money-back guarantee",
  },
  {
    icon: "⭐",
    title: "Authentic Reviews",
    description: "Real reviews from verified travelers",
  },
];

export default function TrustSignals() {
  return (
    <div className="py-24 md:py-36 relative dark:bg-black overflow-hidden">
      {/* Aurora Dream Diagonal Flow */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: `
         radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
        radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
        radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
        radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
        linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
      `,
        }}
      />

      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: `
          radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

      {/* content  */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          The Trust You Deserve
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We are committed to providing you with the highest quality service and
          complete peace of mind. Your experience is safe, secure, and fully
          verified.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {contents.map((content, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center py-10 md:py-16 px-5 rounded-2xl overflow-hidden dark:bg-[#020617] relative shadow-2xl"
          >
            {/* background */}
            <div
              className="absolute inset-0 z-0 dark:hidden"
              style={{
                background: `radial-gradient(circle at center, #F3E8FF 0%, #DDD6FE 30%, #C4B5FD 60%, #A78BFA 100%)`,
              }}
            />
            <div
              className="absolute inset-0 z-0 hidden dark:block"
              style={{
                backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
              }}
            />

            {/* content */}
            <div className="relative z-1">
              <span className="inline-block text-5xl mb-6">{content.icon}</span>
              <h4 className="text-xl md:text-3xl font-semibold mb-3">
                {content.title}
              </h4>
              <p className="text-muted-foreground">{content.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
