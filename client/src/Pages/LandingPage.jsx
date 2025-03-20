import React from 'react';
import { Search, UploadCloud, Menu, Umbrella, Key, Paperclip, Ticket, Scissors, CreditCard, Leaf } from 'lucide-react';

const PocketWeirdosLanding = () => {
  return (
    <div className="min-h-screen bg-purple-100 font-sans relative overflow-hidden">
      {/* Random pocket items scattered in background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Umbrella */}
        <div className="absolute top-20 left-10 transform -rotate-12 opacity-20">
          <Umbrella size={40} className="text-pink-500" />
        </div>
        
        {/* Keys */}
        <div className="absolute top-40 right-20 transform rotate-45 opacity-20">
          <Key size={30} className="text-yellow-500" />
        </div>
        
        {/* Paperclip */}
        <div className="absolute bottom-32 left-24 transform rotate-12 opacity-20">
          <Paperclip size={25} className="text-blue-500" />
        </div>
        
        {/* Ticket */}
        <div className="absolute top-60 right-40 transform -rotate-6 opacity-20">
          <Ticket size={35} className="text-green-500" />
        </div>
        
        {/* Scissors */}
        <div className="absolute bottom-40 right-20 transform rotate-90 opacity-20">
          <Scissors size={30} className="text-red-500" />
        </div>
        
        {/* Credit Card (replacing Coin) */}
        <div className="absolute top-72 left-40 opacity-20">
          <CreditCard size={28} className="text-yellow-600" />
        </div>
        
        {/* Leaf */}
        <div className="absolute bottom-20 right-56 transform rotate-30 opacity-20">
          <Leaf size={25} className="text-green-600" />
        </div>
        
        {/* Candy wrapper */}
        <div className="absolute top-20 right-72 transform rotate-12 opacity-20">
          <div className="w-12 h-6 bg-red-400 rounded-lg flex items-center justify-center">
            <div className="w-10 h-4 bg-white rounded-lg"></div>
          </div>
        </div>
        
        {/* Lint ball */}
        <div className="absolute bottom-48 left-48 opacity-20">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* String */}
        <div className="absolute top-40 left-64 opacity-20">
          <div className="w-16 h-1 bg-indigo-300 rounded-full transform rotate-45"></div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button className="p-2 rounded-md hover:bg-purple-100">
            <Menu size={24} />
          </button>
        </div>
        
        {/* Logo/Website Name */}
        <div className="flex-1 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-600 tracking-wider">
            <span className="text-yellow-500">P</span>
            <span className="text-green-500">O</span>
            <span className="text-blue-500">C</span>
            <span className="text-red-500">K</span>
            <span className="text-purple-600">E</span>
            <span className="text-pink-500">T</span>
            <span className="ml-2 text-orange-500">W</span>
            <span className="text-teal-500">E</span>
            <span className="text-indigo-500">I</span>
            <span className="text-yellow-600">R</span>
            <span className="text-green-600">D</span>
            <span className="text-blue-600">O</span>
            <span className="text-red-600">S</span>
          </h1>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-purple-600 font-medium border-2 border-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
            Log In
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all">
            Sign Up
          </button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 pt-12 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Share the Weirdest Things You've Found in Your Pockets!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ever reached into your pocket and found something bizarre? You're not alone! 
            Join our community of pocket treasure hunters and share your strangest discoveries.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search weird pocket findings..." 
              className="w-full py-3 px-12 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none shadow-md"
            />
            <Search className="absolute left-4 top-3 text-purple-400" size={20} />
          </div>
        </div>
        
        {/* Post Button */}
        <div className="text-center">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-200">
            <UploadCloud className="mr-2" size={24} />
            Share Your Pocket Weirdo!
            <span className="absolute -inset-1 rounded-full border-2 border-white opacity-30 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></span>
          </button>
          <p className="mt-4 text-sm text-gray-500">No judgment, only curiosity!</p>
        </div>
        
        {/* Fun Pocket Items */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pocket Example 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:rotate-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-20 bg-blue-100 rounded-md flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-300 rounded-full"></div>  
              </div>
            </div>
            <h3 className="text-center font-bold text-lg mb-2">Mystery Marble</h3>
            <p className="text-center text-gray-600 text-sm">Why is there always a marble?</p>
          </div>
          
          {/* Pocket Example 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:-rotate-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-20 bg-red-100 rounded-md flex items-center justify-center">
                <div className="w-12 h-6 bg-green-400 rounded-sm"></div>  
              </div>
            </div>
            <h3 className="text-center font-bold text-lg mb-2">Ancient Gum Wrapper</h3>
            <p className="text-center text-gray-600 text-sm">From a flavor long discontinued</p>
          </div>
          
          {/* Pocket Example 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:rotate-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-20 bg-purple-100 rounded-md flex items-center justify-center">
                <div className="w-10 h-10 bg-gray-400 rounded-md transform rotate-45"></div>  
              </div>
            </div>
            <h3 className="text-center font-bold text-lg mb-2">Mystery Key</h3>
            <p className="text-center text-gray-600 text-sm">No idea what it unlocks anymore</p>
          </div>
        </div>

        {/* Additional silly pocket items */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Random Receipt */}
          <div className="bg-white p-4 rounded-lg shadow-md transform hover:rotate-1 transition-transform">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-20 bg-gray-100 flex flex-col items-center justify-start p-1">
                <div className="w-10 h-1 bg-gray-300 mb-1"></div>
                <div className="w-10 h-1 bg-gray-300 mb-1"></div>
                <div className="w-8 h-1 bg-gray-300 mb-1"></div>
                <div className="w-10 h-1 bg-gray-300 mb-1"></div>
              </div>
            </div>
            <p className="text-center text-gray-600 text-xs">3-year-old receipt</p>
          </div>
          
          {/* Paperclip */}
          <div className="bg-white p-4 rounded-lg shadow-md transform hover:-rotate-1 transition-transform">
            <div className="flex justify-center mb-3">
              <Paperclip size={40} className="text-blue-500" />
            </div>
            <p className="text-center text-gray-600 text-xs">Bent paperclip</p>
          </div>
          
          {/* Broken Headphone */}
          <div className="bg-white p-4 rounded-lg shadow-md transform hover:rotate-1 transition-transform">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <p className="text-center text-gray-600 text-xs">One broken earbud</p>
          </div>
          
          {/* Lint */}
          <div className="bg-white p-4 rounded-lg shadow-md transform hover:-rotate-1 transition-transform">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <p className="text-center text-gray-600 text-xs">Mysterious lint ball</p>
          </div>
        </div>

        {/* Floating pocket items */}
        <div className="hidden md:block absolute top-0 right-0 -mr-16 mt-20">
          <div className="w-32 h-40 bg-blue-200 rounded-md transform rotate-12 opacity-30 flex items-center justify-center">
            <div className="w-10 h-4 bg-red-400 rounded-sm"></div>
          </div>
        </div>
        <div className="hidden md:block absolute bottom-0 left-0 -ml-16 mb-20">
          <div className="w-32 h-40 bg-green-200 rounded-md transform -rotate-12 opacity-30 flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PocketWeirdosLanding;