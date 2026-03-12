import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, User, Mail, Sparkles, Rocket } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const OnboardingPage = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleComplete = () => {
    // Navigate to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 px-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  s <= step ? 'text-blue-400' : 'text-gray-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  s <= step ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
                }`}>
                  {s < step ? <CheckCircle2 size={16} /> : s}
                </div>
                <span className="hidden sm:inline font-medium text-sm">
                  {s === 1 ? 'Profile' : s === 2 ? 'Interests' : 'Connect'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-800 rounded-full">
            <motion.div 
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: '33.33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="glass-dark border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-2">Create your profile</h2>
                  <p className="text-gray-400 text-lg">Tell us a bit about yourself to get started.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-1">First Name</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-1">Last Name</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Work/Education</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                      placeholder="University of Tech"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-2">Choose your interests</h2>
                  <p className="text-gray-400 text-lg">We use these to recommend relevant opportunities.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['Web Dev', 'AI/ML', 'Cloud', 'Cybersecurity', 'FinTech', 'Data Science'].map((interest) => (
                    <button 
                      key={interest}
                      className="p-4 rounded-2xl glass border border-white/5 hover:border-blue-500/40 text-left transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium group-hover:text-blue-400">{interest}</span>
                        <div className="w-5 h-5 rounded-full border border-gray-600 transition-colors group-hover:border-blue-500"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-400 border border-blue-500/30">
                  <Rocket size={40} className="animate-bounce" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-outfit mb-2">Connect your channels</h2>
                  <p className="text-gray-400 text-lg">Sync Telegram or Discord to start extracting opportunities automatically.</p>
                </div>

                <div className="space-y-4 max-w-sm mx-auto">
                  <button className="w-full py-4 rounded-2xl bg-[#5865F2] hover:opacity-90 transition-all font-bold flex items-center justify-center gap-3">
                    Connect Discord
                  </button>
                  <button className="w-full py-4 rounded-2xl bg-[#0088CC] hover:opacity-90 transition-all font-bold flex items-center justify-center gap-3">
                    Connect Telegram
                  </button>
                  <button className="w-full py-4 rounded-2xl glass border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
                    Skip for now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 gap-4">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="btn-secondary px-8"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                onClick={nextStep}
                className="btn-primary px-10"
              >
                Next Step
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleComplete}
                className="btn-primary px-12 bg-green-600 hover:bg-green-700 shadow-green-500/25"
              >
                Get Started
                <Rocket size={18} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already using Track Unity? <Link to="/login" className="text-blue-500 hover:underline">Dashboard</Link>
        </p>
      </div>
    </div>
  )
}

export default OnboardingPage
