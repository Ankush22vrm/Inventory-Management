

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      
      {/* Test Card */}
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind Test
        </h1>
        
        {/* Color Tests */}
        <div className="space-y-3">
          <p className="text-red-500 font-semibold">
            ✓ Red text - Tailwind working!
          </p>
          <p className="text-green-500 font-semibold">
            ✓ Green text - Tailwind working!
          </p>
          <p className="text-yellow-500 font-semibold">
            ✓ Yellow text - Tailwind working!
          </p>
          <p className="text-purple-500 font-semibold">
            ✓ Purple text - Tailwind working!
          </p>
        </div>
        
        {/* Button Test */}
        <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition duration-300">
          Click Me - Hover Effect
        </button>
        
        {/* Info Box */}
        <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-700 text-sm">
            If you see colors, rounded corners, shadows, and spacing - Tailwind is working perfectly! 🎉
          </p>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;