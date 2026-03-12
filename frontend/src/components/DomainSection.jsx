import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Brain, Cloud, Terminal } from 'lucide-react'

const DomainSection = () => {
  const domains = [
    {
      title: 'Web Development',
      icon: <Code2 size={40} className="text-blue-400" />,
      description: 'Frontend, Backend and Fullstack opportunities.'
    },
    {
      title: 'Machine Learning',
      icon: <Brain size={40} className="text-purple-400" />,
      description: 'AI, Data Science and Neural Network roles.'
    },
    {
      title: 'Cloud Computing',
      icon: <Cloud size={40} className="text-cyan-400" />,
      description: 'AWS, Azure and DevOps opportunities.'
    },
    {
      title: 'Software Engineering',
      icon: <Terminal size={40} className="text-indigo-400" />,
      description: 'Core systems and architecture roles.'
    }
  ]

  return (
    <section id="domains" className="section-padding relative">
      <div className="max-w-7xl mx-auto mb-16 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-outfit mb-6"
        >
          Specialized <span className="text-gradient">Domains</span>
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          We categorize opportunities across various technical domains to help you focus on what matters.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {domains.map((domain, index) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-8 rounded-3xl glass-dark border border-white/5 group hover:bg-white/10 transition-all duration-300"
          >
            <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 group-hover:bg-blue-500/10 transition-colors">
              {domain.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 font-outfit">{domain.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {domain.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default DomainSection
