export default function TestColors() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-display font-bold mb-8">Color Test Page</h1>
      
      <div className="space-y-8">
        {/* Header Color Test */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#f8f5ea' }}>
          <h2 className="text-xl font-display font-semibold mb-2">Header Color: #f8f5ea</h2>
          <p className="font-sans">This should match your header background</p>
        </div>

        {/* Masthead Color Test */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#e7d0b9' }}>
          <h2 className="text-xl font-display font-semibold mb-2">Masthead Color: #e7d0b9</h2>
          <p className="font-sans">This should match your main masthead background</p>
        </div>

        {/* Button Color Tests */}
        <div className="space-y-4">
          <button 
            className="px-6 py-3 rounded-lg text-white font-sans font-medium"
            style={{ backgroundColor: '#18402e' }}
          >
            Primary Button: #18402e
          </button>
          
          <button 
            className="px-6 py-3 rounded-lg text-white font-sans font-medium ml-4"
            style={{ backgroundColor: '#da816c' }}
          >
            Secondary Button: #da816c
          </button>
        </div>

        {/* Background Color Test */}
        <div className="p-6 rounded-lg border-2 border-gray-300" style={{ backgroundColor: '#f8f5ea' }}>
          <h2 className="text-xl font-display font-semibold mb-2">Below Masthead Background: #f8f5ea</h2>
          <p className="font-sans">This should match your below masthead background</p>
        </div>
      </div>
    </div>
  )
}
