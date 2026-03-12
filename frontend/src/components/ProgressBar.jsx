import React from 'react'
import { motion } from 'framer-motion'

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-blue-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-400">
          {currentStep === 1 ? 'Basic Details' : 'Career Information'}
        </span>
      </div>

      <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 ${
                i + 1 < currentStep
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : i + 1 === currentStep
                  ? 'bg-transparent border-blue-400 text-blue-400'
                  : 'bg-transparent border-white/20 text-gray-500'
              }`}
              animate={{ scale: i + 1 === currentStep ? 1.15 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {i + 1 < currentStep ? '✓' : i + 1}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
