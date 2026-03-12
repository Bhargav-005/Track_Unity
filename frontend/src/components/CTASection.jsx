import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const CTASection = () => {
  return (
    <section className="section-padding py-32 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-full bg-blue-600/10 blur-[150px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="glass-dark border border-white/5 rounded-[48px] p-12 md:p-20 relative overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[80px] -ml-32 -mb-32 rounded-full"></div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
            <Zap size={16} />
            Ready to scale?
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-8 leading-tight">
            Start tracking <span className="text-gradient">opportunities</span> today
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students and professionals who have automated their career growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/onboarding" className="btn-primary py-4 px-10 text-lg w-full sm:w-auto">
              Create Account
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
