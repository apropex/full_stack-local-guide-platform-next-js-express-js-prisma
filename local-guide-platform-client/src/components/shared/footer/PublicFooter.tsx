"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-primary/5 border-t border-primary/50 pb-16 pt-24 md:pt-30 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-slate-200 font-sans">
      {/* 1. Background Decoration (World Map / Dots Pattern) */}
      {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100 C 20 0 50 0 100 100 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <pattern
            id="grid-pattern"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div> */}

      <div className="container mx-auto relative z-10">
        {/* Top Section: 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Social (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              {/* Replace with your Logo Image/SVG */}
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                LASV Guides
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover the world&apos;s most unique experiences with local
              experts. We are connecting travelers with authentic stories and
              hidden gems.
            </p>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Level 4, Gulshan-1, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@tourbook.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Company (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-lg">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Blog", "Partners"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 3: Support (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-lg">Support</h3>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Safety Center",
                "Cancellation Options",
                "Community",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter (Span 4) */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white font-semibold text-lg mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest travel updates, deals, and inspiring stories
                directly to your inbox.
              </p>

              <form className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-slate-950 border-slate-800 text-slate-200 focus:border-primary focus:ring-primary h-10"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
                  Subscribe
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <p className="text-xs text-slate-500 mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2025 TourBook Inc. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>

      <div className="size-24 bg-primary rounded-full absolute -bottom-[10%] right-[50%] translate-x-[50%] z-1 blur-3xl opacity-70" />
      <div className="size-60 bg-primary rounded-full absolute -bottom-[50%] -translate-y-[50%] right-[50%] translate-x-[50%] z-0 blur-[10rem] opacity-50" />
    </footer>
  );
}
