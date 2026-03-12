import React from 'react'
import { motion } from 'framer-motion'

const StatsSection = () => {
  const stats = [
    { value: '500K+', label: 'Opportunities Processed' },
    { value: '50K+', label: 'Students Using Platform' },
    { value: '10K+', label: 'Deadlines Tracked' }
  ]

  return (
    <section className="section-padding border-y border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center md:items-start"
          >
            <span className="text-5xl md:text-7xl font-bold font-outfit text-gradient mb-2">
              {stat.value}
            </span>
            <span className="text-gray-400 font-medium uppercase tracking-widest text-sm">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
