import ContactFormSection from "@/components/modules/support/ContactFormSection";
import FAQSection from "@/components/modules/support/FAQSection";
import SupportCTA from "@/components/modules/support/SupportCTA";
import SupportHero from "@/components/modules/support/SupportHero";

// --- Main Page Component ---
export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <SupportHero />
      <ContactFormSection />
      <FAQSection />
      <SupportCTA />
    </div>
  );
}
