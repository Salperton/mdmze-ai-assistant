import React from 'react'
import Image from 'next/image'

interface HeaderVariantProps {
  variant?: 'default' | 'minimal' | 'centered' | 'modern'
}

export default function HeaderVariant({ variant = 'default' }: HeaderVariantProps) {
  const renderVariant = () => {
    switch (variant) {
      case 'minimal':
        return (
          <header className="py-4">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="Mind Maze Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-xl font-display font-bold" style={{ color: 'rgb(24, 64, 46)' }}>
                    Mind Maze
                  </h1>
                </div>
              </div>
            </div>
          </header>
        )

      case 'centered':
        return (
          <header className="py-8 text-center" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Mind Maze Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-display font-bold" style={{ color: 'rgb(24, 64, 46)' }}>
                  Mind Maze
                </h1>
                <p className="text-lg font-sans max-w-2xl" style={{ color: 'rgb(17, 17, 17)' }}>
                  Family Support Center
                </p>
              </div>
            </div>
          </header>
        )

      case 'modern':
        return (
          <header className="py-6 border-b" style={{ borderColor: 'rgb(218, 129, 108)' }}>
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/logo.png"
                      alt="Mind Maze Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-display font-bold" style={{ color: 'rgb(24, 64, 46)' }}>
                      Mind Maze
                    </h1>
                    <p className="text-sm font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
                      Family Support Center
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                  <a href="/" className="text-sm font-sans font-medium hover:opacity-75 transition-opacity" style={{ color: 'rgb(24, 64, 46)' }}>
                    Home
                  </a>
                  <a href="/insights" className="text-sm font-sans font-medium hover:opacity-75 transition-opacity" style={{ color: 'rgb(24, 64, 46)' }}>
                    Insights
                  </a>
                  <a href="/ncbi" className="text-sm font-sans font-medium hover:opacity-75 transition-opacity" style={{ color: 'rgb(24, 64, 46)' }}>
                    Research
                  </a>
                </div>
              </div>
            </div>
          </header>
        )

      default:
        // Original header design
        return (
          <header className="py-6" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="Mind Maze Logo"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-display font-bold" style={{ color: 'rgb(24, 64, 46)' }}>
                      Mind Maze
                    </h1>
                    <p className="text-lg font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
                      Family Support Center
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )
    }
  }

  return renderVariant()
}
