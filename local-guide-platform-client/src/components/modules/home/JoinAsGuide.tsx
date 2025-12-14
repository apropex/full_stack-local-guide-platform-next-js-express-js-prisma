"use client";

import SectionContainer from "@/components/shared/SectionContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Clock4,
  Star,
  TrendingUp,
  Users2,
  Wallet,
} from "lucide-react";
import Image from "next/image";

export default function JoinAsGuide() {
  return (
    <SectionContainer className="bg-card/60">
      {/* Background Gradient Blob (Subtle) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/20 dark:bg-amber-500/15 rounded-full blur-[10rem] " />

      <div className="relative z-1 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* --- Left Side: Content --- */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Header Group */}
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-semibold text-primary bg-primary/10 border-primary/20"
              >
                Join the Community
              </Badge>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Passion into Paycheck. <br />
                <span className="text-primary">Become a Local Guide.</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Unlock a world of opportunities. Share your city&apos;s secret
                stories, meet fascinating travelers, and earn on your own terms.
              </p>
            </div>

            {/* Benefits List (Grid Layout) */}
            <div className="grid sm:grid-cols-1 gap-6">
              {[
                {
                  icon: Wallet,
                  title: "Earn Money",
                  text: "Set your own rates and get paid securely for every tour you host.",
                },
                {
                  icon: Users2,
                  title: "Meet People",
                  text: "Connect with global travelers and build a network of friends worldwide.",
                },
                {
                  icon: Clock4,
                  title: "Flexible Schedule",
                  text: "Full-time or weekend hobby? You decide when you want to work.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-base h-12 px-8 rounded-full shadow-lg shadow-orange-600/20 transition-all hover:scale-105"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-base h-12 rounded-full px-8 hover:bg-secondary"
              >
                How it works?
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground pt-2">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" /> Free
                Onboarding
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" /> 24/7 Support
              </span>
            </div>
          </div>

          {/* --- Right Side: Image with Floating Elements --- */}
          <div className="order-1 lg:order-2 relative w-full">
            {/* Main Image Wrapper - Fixed Aspect Ratio ensures visibility */}
            <div className="relative aspect-4/5 md:aspect-square lg:aspect-4/5 w-full rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-muted">
              <Image
                src="/bento/60.jpg"
                alt="Happy Guide"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Gradient Overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating Card 1: Earnings (Bottom Left) */}
            <Card className="absolute bottom-8 -left-4 md:-left-8 p-4 bg-white dark:bg-zinc-900 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Total Earnings
                </p>
                <p className="text-xl font-bold text-foreground">$1,250.00</p>
              </div>
            </Card>

            {/* Floating Card 2: Rating (Top Right) */}
            <Card className="absolute top-8 -right-4 md:-right-8 p-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl flex flex-col items-center gap-1 animate-in fade-in slide-in-from-top-4 duration-1000 delay-200 min-w-[120px]">
              <div className="flex items-center gap-1">
                <span className="font-bold text-2xl text-foreground">4.9</span>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                Guide Rating
              </p>
              <div className="flex -space-x-2 mt-1">
                {[
                  "/author/20.jpg",
                  "/author/19.jpg",
                  "/author/17.jpg",
                  "/author/18.jpg",
                ].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 bg-gray-200 overflow-hidden relative"
                  >
                    <Image src={i} alt="u" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
