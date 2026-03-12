import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'

const inputBase =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'

const StepOneForm = ({ formData, onChange, onNext }) => {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.'
    }
    if (!formData.gender) newErrors.gender = 'Please select your gender.'
    if (!formData.password) {
      newErrors.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    onNext()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="flex flex-col gap-5"
    >
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className={`${inputBase} pl-10`}
          />
        </div>
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={`${inputBase} pl-10`}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Gender
        </label>
        <div className="flex gap-6">
          {['Male', 'Female'].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  formData.gender === option
                    ? 'border-blue-500'
                    : 'border-white/30 group-hover:border-white/60'
                }`}
              >
                {formData.gender === option && (
                  <motion.div
                    layoutId="gender-dot"
                    className="w-2 h-2 rounded-full bg-blue-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </div>
              <input
                type="radio"
                name="gender"
                value={option}
                checked={formData.gender === option}
                onChange={(e) => onChange('gender', e.target.value)}
                className="sr-only"
              />
              <span
                className={`text-sm transition-colors duration-200 ${
                  formData.gender === option ? 'text-white' : 'text-gray-400'
                }`}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="mt-1.5 text-xs text-red-400">{errors.gender}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            className={`${inputBase} pl-10`}
          />
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary py-3.5 mt-2 w-full text-base font-semibold justify-center"
      >
        Next
        <ArrowRight size={18} />
      </button>
    </motion.form>
  )
}

export default StepOneForm
