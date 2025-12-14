import SectionContainer from "@/components/shared/SectionContainer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  FileQuestion,
  Mail,
  MessageSquare,
  Search,
} from "lucide-react";

export default function SupportHero() {
  const quickLinks = [
    {
      icon: MessageSquare,
      title: "Chat Support",
      desc: "Get instant answers via live chat.",
      action: "Start Chat",
    },
    {
      icon: Mail,
      title: "Email Us",
      desc: "Send us a detailed message.",
      action: "Send Email",
    },
    {
      icon: FileQuestion,
      title: "Knowledge Base",
      desc: "Browse guides and tutorials.",
      action: "Visit Center",
    },
  ];

  return (
    <SectionContainer className="relative bg-slate-950">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <Badge
          variant="outline"
          className="mb-6 border-white/20 text-blue-200 bg-blue-900/30 px-4 py-1"
        >
          24/7 Support
        </Badge>
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-6">
          How can we <span className="text-blue-400">help you?</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Have questions about your booking? Need travel advice? We are here to
          help you every step of the way.
        </p>

        {/* Search Bar (Optional Visual) */}
        <div className="max-w-lg mx-auto relative mb-16">
          <Search className="absolute z-10 left-3 top-3.5 w-5 h-5 text-slate-300" />
          <input
            type="text"
            placeholder="Search for answers (e.g., cancellation policy)"
            className="w-full h-12 pl-10 pr-4 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all backdrop-blur-sm"
          />
        </div>

        {/* Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {quickLinks.map((item, idx) => (
            <Card
              key={idx}
              className="bg-primary/5 border-primary/15 hover:border-primary/30 hover:bg-primary/10 transition-colors backdrop-blur-md text-white "
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
                <span className="text-blue-400 text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline">
                  {item.action} <ChevronDown className="w-4 h-4 -rotate-90" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
