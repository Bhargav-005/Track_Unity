import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Users,
  SlidersHorizontal,
  Zap
} from 'lucide-react'

// Components
import DashboardHeader from '../components/DashboardHeader'
import StatsCards from '../components/StatsCards'
import OpportunityFeed from '../components/OpportunityFeed'
import CategoryFilters from '../components/CategoryFilters'
import QuickAddOpportunity from '../components/QuickAddOpportunity'
import NotificationsPanel from '../components/NotificationsPanel'
import DeadlineTracker from '../components/DeadlineTracker'
import RecommendationPanel from '../components/RecommendationPanel'
import AdvancedStats from '../components/AdvancedStats'

// Service
import { opportunityApi } from '../services/opportunityApi'

const DashboardPage = () => {
  const [activeCategory, setActiveCategory] = useState('Internships')
  const [opportunities, setOpportunities] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data for initial fill (will be replaced by API)
  const mockOpportunities = [
    {
      title: 'Google Summer Internship',
      company: 'Google',
      deadline: 'March 30',
      eligibility: '3rd Year',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_\"G\"_Logo.svg',
      applicationLink: 'https://google.com/apply'
    },
    {
      title: 'Microsoft AI Hackathon',
      company: 'Microsoft',
      deadline: 'April 2',
      eligibility: 'All Years',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      applicationLink: 'https://microsoft.com/hackathon'
    }
  ]

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Attempting to fetch from actual API (will fail if backend not running, so fallback to mock)
      try {
        const dashboardData = await opportunityApi.getDashboard()
        setStats(dashboardData.stats)
        const opps = await opportunityApi.getOpportunities(activeCategory.toLowerCase())
        setOpportunities(opps)
      } catch (e) {
        console.log('API not available, using mock data')
        setOpportunities(mockOpportunities)
        setStats({ total: 124, upcoming: 8, applied: 12 })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleExtractWithAI = async (message) => {
    if (!message) return
    try {
      console.log('Extracting:', message)
      const result = await opportunityApi.extractOpportunity(message)
      // Here you would typically refresh the list or show the new item
      alert('AI Extraction successful! (Simulated)')
      console.log(result)
    } catch (e) {
      alert('AI Extraction failed. Please ensure the backend is running.')
    }
  }

  const handleImageUpload = async (file) => {
    try {
      console.log('Uploading image:', file.name)
      const result = await opportunityApi.uploadImage(file)
      alert('Image OCR processed! (Simulated)')
      console.log(result)
    } catch (e) {
      alert('Image upload failed. Please ensure the backend is running.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-sans selection:bg-blue-100">
      {/* Top Navbar */}
      <nav className="bg-white px-8 py-3 sticky top-0 z-50 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-6 flex-1 max-w-3xl">
          <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Zap size={20} fill="currentColor" />
          </div>
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              placeholder="Search opportunities"
              className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl py-2.5 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-medium"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5">
           <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <img 
              src="https://framerusercontent.com/images/R94Z9N9M4oM4Y8pP7n5Z3zY.jpg" 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all" 
              alt="Profile"
            />
            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto p-8 lg:flex gap-8">
        
        {/* Left Section (70%) */}
        <div className="flex-[0.7] space-y-8 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DashboardHeader />
          </motion.div>

          <StatsCards stats={stats} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <OpportunityFeed opportunities={opportunities} />
          </motion.div>

          <CategoryFilters 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          <QuickAddOpportunity 
            onExtract={handleExtractWithAI} 
            onImageUpload={handleImageUpload} 
          />
        </div>

        {/* Right Sidebar (30%) */}
        <aside className="flex-[0.3] space-y-7">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NotificationsPanel />
            <DeadlineTracker />
            <AdvancedStats />
            <RecommendationPanel />
          </motion.div>
        </aside>
      </main>

      {/* Footer / Spacing for mobile */}
      <div className="h-20 lg:hidden"></div>
    </div>
  )
}

export default DashboardPage
