import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Send, Bell, ListTodo } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-mesh">
      {/* Background Blobs */}
      <div className="glow-mesh">
        <div className="glow-blob glow-blob-1"></div>
        <div className="glow-blob glow-blob-2"></div>
        <div className="glow-blob glow-blob-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-blue-400 text-sm font-medium mb-6">
            <Sparkles size={16} />
            AI-Powered Opportunity Tracking
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 font-outfit">
            Track your <br />
            <span className="text-gradient">opportunities</span> <br />
            intelligently
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            Convert chaotic opportunity messages from Telegram, Discord, and Email into structured opportunities using AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary py-4 px-8 text-lg">
              Get Started
              <ArrowRight size={20} />
            </button>
            <button className="btn-secondary py-4 px-8 text-lg">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Content - Stacked Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[500px] flex items-center justify-center"
        >
          {/* Decorative Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-spin-slow"></div>
          
          {/* Floating Cards */}
          <div className="relative w-full max-w-[400px]">
            {/* Card 1 */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -left-10 z-20 glass p-6 rounded-2xl w-64 shadow-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Send size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Message Received</h4>
                  <p className="text-xs text-gray-400">telegrambot.io</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic mb-3">"We are hiring Frontend Interns! Apply at bit.ly/hire-me..."</p>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-blue-500"
                ></motion.div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="relative z-10 glass p-6 rounded-2xl shadow-2xl border border-white/10 bg-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg font-outfit">Opportunity Parsed</h4>
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <Sparkles size={16} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Role:</span>
                  <span className="text-white font-medium">Frontend Developer</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Company:</span>
                  <span className="text-white font-medium">TechNova Inc.</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Deadline:</span>
                  <span className="text-red-400 font-medium">Oct 24, 2026</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -right-10 z-20 glass p-5 rounded-2xl w-56 shadow-2xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <Bell size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Deadline Alert</h4>
                  <p className="text-xs text-red-400 font-medium">2 days left</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
