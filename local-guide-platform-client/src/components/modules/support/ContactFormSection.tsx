import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";

export default function ContactFormSection() {
  return (
    <SectionContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div className="space-y-8">
          <SectionTitle
            title="Get in touch"
            description="Prefer to write to us directly? Fill out the form and our team will get back to you within 24 hours."
          />

          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "support@tourbook.com" },
              { icon: Phone, label: "Phone", value: "+880 1712 345 678" },
              {
                icon: MapPin,
                label: "Office",
                value: "Level 4, Gulshan-1, Dhaka",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/70 hover:border-primary/50 transition-colors group"
              >
                <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Decor Image */}
          <div className="relative h-48 w-full rounded-2xl overflow-hidden hidden lg:block mt-8">
            <Image
              src="/bento/60.jpg"
              alt="Contact Support"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
        </div>

        {/* Right: The Form */}
        <div className="bg-card/70 border border-border rounded-3xl p-8 shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  First Name
                </label>
                <Input placeholder="John" className="h-12 bg-black/5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Last Name
                </label>
                <Input placeholder="Doe" className="h-12 bg-black/5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                className="h-12 bg-black/5"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Subject
              </label>
              <Select>
                <SelectTrigger className="bg-black/5 dark:bg-black/5 w-full data-[size=default]:h-12 data-[size=sm]:h-10">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Subjects</SelectLabel>
                    <SelectItem value="General Inquiry">
                      General Inquiry
                    </SelectItem>
                    <SelectItem value="Booking Issue">Booking Issue</SelectItem>
                    <SelectItem value="Payment Problem">
                      Payment Problem
                    </SelectItem>
                    <SelectItem value="Become a Guide">
                      Become a Guide
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Message
              </label>
              <Textarea
                placeholder="Tell us how we can help..."
                className="min-h-[150px] bg-black/5 dark:bg-black/5 resize-none p-4"
              />
            </div>

            <Button
              size="lg"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              Send Message <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
}
