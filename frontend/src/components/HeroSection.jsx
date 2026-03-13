import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Send, Bell, ListTodo } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DisplayCardsDemo } from './ui/display-cards-demo'


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
            <Link to="/register" className="btn-primary py-4 px-8 text-lg">
              Get Started
              <ArrowRight size={20} />
            </Link>
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
          
          <DisplayCardsDemo />
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection
