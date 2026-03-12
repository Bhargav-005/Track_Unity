import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import PlatformOverview from '../components/PlatformOverview'
import StatsSection from '../components/StatsSection'
import DomainSection from '../components/DomainSection'
import FeaturesSection from '../components/FeaturesSection'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const LandingPage = () => {
  // Simple scroll progress indicator
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      
      <main>
        <PlatformOverview />
        <StatsSection />
        <DomainSection />
        <FeaturesSection />
        <Testimonials />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
