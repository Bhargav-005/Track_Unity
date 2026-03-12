import React from 'react'
import { motion } from 'framer-motion'
import { Zap, LayoutDashboard, Calendar } from 'lucide-react'

const PlatformOverview = () => {
  const cards = [
    {
      title: 'Opportunity Parsing',
      description: 'Automatically extract opportunities from raw messages with LLM-powered accuracy.',
      icon: <Zap size={24} className="text-blue-400" />,
      color: 'blue'
    },
    {
      title: 'Smart Dashboard',
      description: 'Organized dashboard to view, filter, and manage all your tracked opportunities.',
      icon: <LayoutDashboard size={24} className="text-purple-400" />,
      color: 'purple'
    },
    {
      title: 'Deadline Tracking',
      description: 'Never miss important application deadlines with intelligent automated reminders.',
      icon: <Calendar size={24} className="text-orange-400" />,
      color: 'orange'
    }
  ]

  return (
    <section className="section-padding bg-[#030712] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-outfit mb-6"
        >
          From opportunity chaos to <br />
          <span className="text-gradient">intelligent tracking</span>
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="group p-8 rounded-3xl glass-dark border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden"
          >
            {/* Hover Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
              card.color === 'blue' ? 'from-blue-500/10' : 
              card.color === 'purple' ? 'from-purple-500/10' : 'from-orange-500/10'
            } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              {card.icon}
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-outfit">{card.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PlatformOverview
