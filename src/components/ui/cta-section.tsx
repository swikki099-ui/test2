"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Mail, Linkedin, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section id="community" className="py-24 px-4 bg-slate-50 dark:bg-slate-950/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
            Let&apos;s build <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              together.
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg font-medium">
            We&apos;re building the infrastructure for the next generation of AI developers. Join us on this journey to redefine coding.
          </p>

          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10">
                <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email Us</p>
                <p className="font-bold text-slate-900 dark:text-white">hello@neurodev.in</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10">
                <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Connect</p>
                <p className="font-bold text-slate-900 dark:text-white">linkedin.com/company/neurodev</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-900 to-slate-950 text-white overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700" />
          
          <div className="relative z-10 flex flex-col items-start gap-6">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Start the AI <br /> Revolution.
            </h3>
            <p className="text-indigo-200/80 font-medium text-lg leading-relaxed">
              Ready to push the boundaries? Join a community that prioritizes innovation, performance, and impact.
            </p>
            
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 px-8 py-4 bg-white text-indigo-950 rounded-full font-black text-lg flex items-center gap-3 hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Register Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
