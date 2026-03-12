import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, ChevronDown, ArrowLeft, Loader2, X } from 'lucide-react'

const inputBase =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'

const SKILL_SUGGESTIONS = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'Machine Learning',
  'AWS',
  'Docker',
  'TypeScript',
  'SQL',
  'MongoDB',
]

const DOMAINS = [
  'Web Development',
  'Machine Learning',
  'Cloud Computing',
  'Software Engineering',
  'Data Science',
]

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'ML Engineer',
  'Cloud Engineer',
  'Software Developer',
]

const StepTwoForm = ({ formData, onChange, onBack, onSubmit, isLoading }) => {
  const [errors, setErrors] = useState({})
  const [skillInput, setSkillInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredSuggestions = SKILL_SUGGESTIONS.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !formData.skills.includes(s)
  )

  const addSkill = (skill) => {
    const trimmed = skill.trim()
    if (trimmed && !formData.skills.includes(trimmed)) {
      onChange('skills', [...formData.skills, trimmed])
    }
    setSkillInput('')
    setShowSuggestions(false)
  }

  const removeSkill = (skill) => {
    onChange(
      'skills',
      formData.skills.filter((s) => s !== skill)
    )
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (skillInput.trim()) addSkill(skillInput)
    } else if (e.key === 'Backspace' && !skillInput && formData.skills.length > 0) {
      removeSkill(formData.skills[formData.skills.length - 1])
    }
  }

  const validate = () => {
    const newErrors = {}
    if (formData.skills.length === 0) newErrors.skills = 'Add at least one skill.'
    if (!formData.domain) newErrors.domain = 'Please select a domain.'
    if (!formData.interestedRole.trim()) newErrors.interestedRole = 'Interested role is required.'
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
    onSubmit()
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
      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Skills
        </label>
        <div
          className="flex flex-wrap gap-2 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 cursor-text"
          onClick={() => document.getElementById('skill-input').focus()}
        >
          {formData.skills.map((skill) => (
            <motion.span
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-lg"
            >
              {skill}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeSkill(skill)
                }}
                className="hover:text-white transition-colors ml-0.5"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
          <div className="relative flex-1 min-w-[120px]">
            <input
              id="skill-input"
              type="text"
              value={skillInput}
              placeholder={formData.skills.length === 0 ? 'Type a skill and press Enter...' : ''}
              onChange={(e) => {
                setSkillInput(e.target.value)
                setShowSuggestions(e.target.value.length > 0)
              }}
              onKeyDown={handleSkillKeyDown}
              onFocus={() => setShowSuggestions(skillInput.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none py-0.5"
            />

            <AnimatePresence>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 top-full left-0 mt-1 w-full min-w-[160px] bg-[#0f1728] border border-white/10 rounded-xl overflow-hidden shadow-xl"
                >
                  {filteredSuggestions.map((s) => (
                    <li
                      key={s}
                      onMouseDown={() => addSkill(s)}
                      className="px-3 py-2 text-sm text-gray-300 hover:bg-blue-500/10 hover:text-white cursor-pointer transition-colors"
                    >
                      {s}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
        {errors.skills && (
          <p className="mt-1.5 text-xs text-red-400">{errors.skills}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Suggestions: {SKILL_SUGGESTIONS.slice(0, 5).join(', ')}…
        </p>
      </div>

      {/* Domain */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Domain
        </label>
        <div className="relative">
          <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={formData.domain}
            onChange={(e) => onChange('domain', e.target.value)}
            className={`${inputBase} pl-10 pr-10 appearance-none cursor-pointer`}
            style={{ colorScheme: 'dark' }}
          >
            <option value="" disabled className="bg-[#0f1728] text-gray-400">
              Select a domain
            </option>
            {DOMAINS.map((d) => (
              <option key={d} value={d} className="bg-[#0f1728] text-white">
                {d}
              </option>
            ))}
          </select>
        </div>
        {errors.domain && (
          <p className="mt-1.5 text-xs text-red-400">{errors.domain}</p>
        )}
      </div>

      {/* Interested Role */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Interested Role
        </label>
        <div className="relative">
          <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={formData.interestedRole}
            onChange={(e) => onChange('interestedRole', e.target.value)}
            className={`${inputBase} pr-10 appearance-none cursor-pointer`}
            style={{ colorScheme: 'dark' }}
          >
            <option value="" disabled className="bg-[#0f1728] text-gray-400">
              Select a role
            </option>
            {ROLES.map((r) => (
              <option key={r} value={r} className="bg-[#0f1728] text-white">
                {r}
              </option>
            ))}
          </select>
        </div>
        {errors.interestedRole && (
          <p className="mt-1.5 text-xs text-red-400">{errors.interestedRole}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 font-medium text-sm disabled:opacity-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary py-3.5 flex-1 text-base font-semibold justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </motion.form>
  )
}

export default StepTwoForm
