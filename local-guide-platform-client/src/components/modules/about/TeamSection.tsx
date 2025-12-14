import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";

export default function TeamSection() {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/bento/2.jpg",
    },
    {
      name: "Samantha Lee",
      role: "Head of Operations",
      image: "/bento/41.jpg",
    },
    {
      name: "Atik Ahmed",
      role: "Community Lead",
      image: "/bento/3.jpg",
    },
  ];

  return (
    <SectionContainer>
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <SectionTitle
          title="Meet the"
          highlight="Explorers"
          description="The minds working behind the scenes to make your travel dreams a reality."
        />

        <Button variant="outline" className="rounded-full">
          Join our team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-3xl bg-muted aspect-3/4"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />

            {/* Overlay with Info */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-white/80 text-sm font-medium mb-4">
                {member.role}
              </p>

              {/* Social Links (Reveal on hover) */}
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
