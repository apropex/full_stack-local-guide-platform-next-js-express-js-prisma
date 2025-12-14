//

import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";

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
    <SectionContainer className="bg-card/60">
      <SectionTitle
        title="The Trust"
        highlight="You Deserve"
        description="We are committed to providing you with the highest quality service and complete peace of mind. Your experience is safe, secure, and fully
        verified."
        className="max-w-xl mx-auto text-center mb-8 md:mb-12"
      />

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
    </SectionContainer>
  );
}
