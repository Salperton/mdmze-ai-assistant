import { Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="shadow-sm border-b border-neutral-200" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://raw.githubusercontent.com/Salperton/mdmze-ai-assistant/refs/heads/main/Hero%20Logo.svg" 
              alt="Mind Maze Logo" 
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-xl font-display font-bold" style={{ color: 'rgb(24, 64, 46)' }}>Mind Maze</h1>
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
