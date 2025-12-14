import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Globe2, HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Globe2,
    title: "Authenticity First",
    desc: "We prioritize real connections over tourist traps. Every tour is curated by locals who live and breathe their culture.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Trust",
    desc: "Every guide is vetted, every route is verified. Your safety is our obsession, so you can explore with peace of mind.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: HeartHandshake,
    title: "Community Impact",
    desc: "We believe in fair pay. Our platform empowers local guides to turn their passion into a sustainable livelihood.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    icon: Lightbulb,
    title: "Curated Innovation",
    desc: "From food walks to mountain treks, we constantly seek out new, unique experiences that you won't find elsewhere.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
];

export default function CoreValues() {
  return (
    <SectionContainer bg="bg-card/60">
      <SectionTitle
        title="Our Core Values"
        description="We are not just a booking platform. We are a community built on principles that matter."
        className="max-w-lg mx-auto text-center mb-8 md:mb-12"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((item, idx) => (
          <Card
            key={idx}
            className="border-0 shadow-lg bg-background/50 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300"
          >
            <CardContent className="p-6 pt-8 flex flex-col items-center text-center h-full">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.bg} ${item.color}`}
              >
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
