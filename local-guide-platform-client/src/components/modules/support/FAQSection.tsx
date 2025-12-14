import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I cancel a booking?",
    a: "You can cancel your booking from your profile page under 'My Trips'. Refunds are processed according to the specific tour's cancellation policy.",
  },
  {
    q: "Is it safe to pay online?",
    a: "Absolutely. We use Stripe and SSL encryption to ensure your payment details are 100% secure. We do not store your credit card information.",
  },
  {
    q: "Can I customize a tour?",
    a: "Many of our guides offer private/custom tours. Look for the 'Customizable' tag on the tour page or contact the guide directly after booking.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Safety is our priority. If a tour is cancelled due to weather, you will be offered a reschedule date or a full refund.",
  },
];

export default function FAQSection() {
  return (
    <SectionContainer className="bg-card/60">
      <SectionTitle
        title="Frequently Asked Questions"
        description="Quick answers to common questions about booking and payments."
        className="max-w-2xl mx-auto text-center mb-8 md:mb-12"
      />

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-4xl mx-auto space-y-4"
      >
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-border bg-card px-6 rounded-xl data-[state=open]:border-primary/50 transition-all"
          >
            <AccordionTrigger className="text-lg font-medium py-6 hover:no-underline hover:text-primary text-left">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionContainer>
  );
}
