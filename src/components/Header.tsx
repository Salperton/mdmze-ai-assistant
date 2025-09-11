import { Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-neutral-900">MDMZE</h1>
              <p className="text-sm font-sans text-neutral-600">Family Support Center</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="https://www.mdmze.com" className="text-neutral-600 hover:text-primary-500 transition-colors font-sans">
              Main Website
            </a>
            <a href="#about" className="text-neutral-600 hover:text-primary-500 transition-colors font-sans">
              About
            </a>
            <a href="#contact" className="text-neutral-600 hover:text-primary-500 transition-colors font-sans">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
