import { Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="shadow-sm border-b border-neutral-200" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgb(24, 64, 46)' }}>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold" style={{ color: 'rgb(24, 64, 46)' }}>MDMZE</h1>
              <p className="text-sm font-sans" style={{ color: 'rgb(17, 17, 17)' }}>Family Support Center</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="https://www.mdmze.com" className="font-sans transition-colors" style={{ color: 'rgb(17, 17, 17)' }}>
              Main Website
            </a>
            <a href="#about" className="font-sans transition-colors" style={{ color: 'rgb(17, 17, 17)' }}>
              About
            </a>
            <a href="#contact" className="font-sans transition-colors" style={{ color: 'rgb(17, 17, 17)' }}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
