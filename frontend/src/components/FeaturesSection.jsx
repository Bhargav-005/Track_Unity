import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Bell } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      title: 'Opportunity Extraction',
      description: 'Our advanced AI parses messy messages from anywhere and turns them into clean, actionable application links and details.',
      icon: <Sparkles size={32} className="text-blue-400" />,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      side: 'right'
    },
    {
      title: 'Smart Recommendations',
      description: 'Personalized job matches based on your profile, skills, and past applications to help you land the perfect role.',
      icon: <Heart size={32} className="text-purple-400" />,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      side: 'left'
    },
    {
      title: 'Deadline Reminder System',
      description: 'Never miss a deadline again. Get timely notifications via Email, Discord, or Telegram for upcoming application dates.',
      icon: <Bell size={32} className="text-orange-400" />,
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
      side: 'right'
    }
  ]

  return (
    <section id="features" className="section-padding bg-black/40">
      <div className="max-w-7xl mx-auto space-y-32">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className={`flex flex-col ${feature.side === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
          >
            {/* Illustration/Image side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 glass-dark h-[400px]">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div 
              initial={{ opacity: 0, x: feature.side === 'left' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl glass-dark flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-4xl font-bold font-outfit">{feature.title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-4">
                {['Industry-leading accuracy', 'Instant parsing', 'Cross-platform support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
