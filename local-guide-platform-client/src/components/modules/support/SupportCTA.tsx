import SectionContainer from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";

export default function SupportCTA() {
  return (
    <SectionContainer className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
        <LifeBuoy className="w-8 h-8" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Still need help <br />
        <span className="text-4xl font-black text-primary">?</span>
      </h2>
      <p className="text-muted-foreground mb-8 ">
        Our support team is available 7 days a week from 9 AM to 6 PM.
      </p>

      <div className="flex justify-center gap-4">
        <Button variant="default" className="rounded-full px-8">
          Start Live Chat
        </Button>
        <Button variant="outline" className="rounded-full px-8">
          Visit Help Center
        </Button>
      </div>
    </SectionContainer>
  );
}
