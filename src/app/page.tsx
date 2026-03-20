"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { TechnicalArsenal } from "@/components/ui/technical-arsenal";
import { CTASection } from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { cn } from "@/lib/utils";
import { 
  Home as HomeIcon, 
  User, 
  Cpu, 
  Globe, 
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const navItems = [
    { name: "Home", link: "#home", icon: <HomeIcon className="h-4 w-4" /> },
    { name: "Features", link: "#features", icon: <Cpu className="h-4 w-4" /> },
    { name: "Community", link: "#community", icon: <Globe className="h-4 w-4" /> },
    { name: "Waitlist", link: "#waitlist", icon: <User className="h-4 w-4" /> },
  ];

  const placeholders = [
    "Enter your email to join the waitlist",
    "Be part of the AI coding revolution",
    "Collaborate with top AI developers",
    "neurodev.in is coming soon",
    "Join our community today",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4f46e5", "#818cf8", "#c7d2fe"],
    });
    console.log("submitted");
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      <FloatingNav navItems={navItems} />

      {/* Hero Section with Highlight Effect and Fade-out transition */}
      <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <HeroHighlight 
          containerClassName="h-screen w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
              Building the Future <br /> 
              <span className="text-indigo-600 dark:text-indigo-400">
                Together.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl font-medium">
              A community of developers, creators, and AI enthusiasts working together to push the boundaries of what&apos;s possible in coding and technology.
            </p>

            <div className="w-full max-w-md mx-auto" id="waitlist">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-500 font-medium">
              Join 500+ developers already on the waitlist.
            </p>
          </motion.div>
        </HeroHighlight>
      </section>

      {/* Technical Arsenal Section (Replacing Why Join) */}
      <section id="features" className="relative py-24 px-4 overflow-hidden bg-white dark:bg-black border-y border-black/5 dark:border-white/5">
        <div className="relative z-20">
          <TechnicalArsenal />
        </div>
      </section>

      {/* Let's build together Section */}
      <CTASection />

      {/* Footer Addition */}
      <Footer />

      <BackgroundBeams className="opacity-40" />
    </main>
  );
}


