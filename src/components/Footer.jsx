import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 px-6 border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          {/* Logo and About */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-outfit">
                TrackUnity
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Empowering students and professionals to capture every opportunity with AI-driven intelligence.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-white mb-6 font-outfit">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Dashboard', 'API', 'Pricing'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-6 font-outfit">Company</h4>
            <ul className="space-y-4">
              {['About', 'Contact', 'Privacy', 'Terms'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-white mb-6 font-outfit">Stay Updated</h4>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter email"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="btn-primary py-3 rounded-xl text-sm font-bold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center md:flex md:justify-between md:text-left text-gray-500 text-sm">
          <p>© 2026 Track Unity. All rights reserved.</p>
          <div className="flex gap-6 justify-center mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
