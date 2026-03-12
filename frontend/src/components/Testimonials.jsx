import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Computer Science Student',
      quote: 'Track Unity completely changed how I find internships. No more scrolling through endless Discord messages manually!',
      image: 'https://i.pravatar.cc/150?u=alex'
    },
    {
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      quote: 'The AI parsing is scary accurate. It picked up a deadline from a nested thread that I would have definitely missed.',
      image: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
      name: 'Marcus Thorne',
      role: 'Graduate Researcher',
      quote: 'Finally, a way to centralize all my opportunity channels. The dashboard is clean and really helps me stay focused.',
      image: 'https://i.pravatar.cc/150?u=marcus'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="section-padding bg-mesh relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 inline-block p-4 rounded-full bg-blue-500/10 text-blue-400"
        >
          <Quote size={40} />
        </motion.div>
        
        <div className="relative h-[300px] md:h-[250px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-2xl md:text-3xl italic text-gray-200 mb-10 leading-relaxed font-outfit">
                "{testimonials[currentIndex].quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full border-2 border-blue-500/30"
                />
                <div className="text-left">
                  <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-blue-400 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            onClick={prev}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? 'bg-blue-500 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={next}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
