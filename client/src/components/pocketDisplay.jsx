import React, { useState, useEffect } from "react";
import axios from "axios";

const PocketFindsGallery = () => {
  const [pocketFinds, setPocketFinds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPocketFinds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/finds/pocket-finds"
        );
        if (response.data.success) {
          setPocketFinds(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching pocket finds:", err);
        setError("Failed to load pocket finds from the pocket dimension");
      } finally {
        setLoading(false);
      }
    };

    fetchPocketFinds();
  }, []);

  // Random emoji generator
  const floatingEmojis = [
    '🧦', '🔑', '🧠', '👀', '👽', '🤖', '🦄', '🌈', 
    '🍄', '👻', '🪐', '🧩', '🧸', '🎭', '🔮', '⚡️'
  ];
  
  const randomEmojis = [];
  for (let i = 0; i < 16; i++) {
    const emoji = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    const top = Math.floor(Math.random() * 90) + 5;
    const left = Math.floor(Math.random() * 90) + 5;
    const size = Math.floor(Math.random() * 3) + 3;
    const delay = Math.floor(Math.random() * 5);
    const animation = ['bounce-slow', 'spin-slow', 'wobble', 'pulse'][Math.floor(Math.random() * 4)];
    
    randomEmojis.push(
      <div 
        key={i}
        className={`absolute text-${size}xl animate-${animation}`} 
        style={{ 
          top: `${top}%`, 
          left: `${left}%`,
          animationDelay: `${delay}s`,
          zIndex: 0
        }}
      >
        {emoji}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-500 via-purple-400 to-indigo-500 py-12 px-4 flex items-center justify-center font-comic overflow-hidden">
        <div className="relative z-10">
          <div className="text-white text-3xl font-bold animate-bounce bg-purple-700 p-6 rounded-3xl border-4 border-yellow-300 shadow-lg">
            <span className="animate-pulse">✨</span> Searching the pocket dimension... <span className="animate-spin-slow inline-block">🔍</span>
          </div>
        </div>
        {randomEmojis}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-500 via-purple-400 to-indigo-500 py-12 px-4 flex items-center justify-center font-comic overflow-hidden">
        <div className="relative z-10">
          <div className="text-white text-2xl font-bold bg-purple-700 p-6 rounded-3xl border-4 border-yellow-300 shadow-lg animate-wobble">
            {error} <span className="text-4xl">👻</span>
          </div>
        </div>
        {randomEmojis}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-500 via-purple-400 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8 font-comic overflow-hidden relative">
      {/* Random floating emojis */}
      {randomEmojis}
      
      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl font-extrabold text-white text-center mb-12 animate-pulse tracking-widest">
          <span className="animate-spin-slow inline-block">🧠</span> POCKET DIMENSION GALLERY <span className="animate-wobble inline-block">🌀</span>
        </h1>
        
        <div className="w-full h-32 absolute top-0 left-0 transform -translate-y-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-20">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-pink-400"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-purple-500"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-indigo-600"></path>
          </svg>
        </div>

        {pocketFinds.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border-4 border-dotted border-yellow-400 shadow-2xl transition-transform duration-300">
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              The pocket dimension is empty! Be the first to submit a weird find! <span className="animate-bounce-slow inline-block">🤯</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pocketFinds.map((find, index) => (
              <div
                key={find._id}
                className="bg-gradient-to-r from-white to-pink-50 rounded-3xl shadow-xl border-4 border-dashed border-yellow-300 overflow-hidden transform transition-all hover:scale-110 hover:shadow-2xl"
              >
                <div className="relative">
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold py-1 px-3 rounded-bl-2xl shadow-md z-10">
                    <span className="animate-pulse">✨</span> Weird!
                  </div>
                  <div className="h-64 overflow-hidden">
                    <img
                      src={find.image}
                      alt={find.itemName}
                      className="w-full h-full object-cover transform transition-transform hover:scale-105"
                    />
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-10 -right-8 text-6xl opacity-20">
                    {['🧠', '👽', '👁️', '🔮', '🦄'][index % 5]}
                  </div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    {find.itemName}
                  </h2>
                  <div className="text-gray-700 mb-4 bg-white bg-opacity-70 p-3 rounded-xl">
                    {find.description}
                  </div>
                  
                  {/* Fixed Weirdness Rating Section */}
                  <div className="mt-4">
                    <div className="bg-violet-100 bg-opacity-75 rounded-xl p-3 shadow-inner">
                      <div className="font-bold text-xl text-purple-600 mb-1">Weirdness:</div>
                      <div className="w-full h-6 bg-white rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-end pr-2"
                          style={{ width: `${find.weirdnessRating * 10}%` }}
                        >
                          <div className="flex space-x-1">
                            {find.weirdnessRating > 0 && (
                              <span className="text-white text-sm font-bold animate-pulse">{find.weirdnessRating}/10</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-purple-700">Normal</span>
                        <span className="text-xs text-purple-700">EXTREMELY WEIRD</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 bg-white rounded-full px-3 py-1 shadow-inner mt-2 text-center">
                      {new Date(find.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Blob decorations */}
      <div className="absolute -bottom-36 -left-36 w-72 h-72 bg-pink-300 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute -bottom-24 left-32 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 right-24 w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-300 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
    </div>
  );
};

<style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        @keyframes wobble {
          0%, 100% {
            transform: translateX(0) rotate(0);
          }
          15% {
            transform: translateX(-15px) rotate(-5deg);
          }
          30% {
            transform: translateX(10px) rotate(3deg);
          }
          45% {
            transform: translateX(-10px) rotate(-3deg);
          }
          60% {
            transform: translateX(5px) rotate(2deg);
          }
          75% {
            transform: translateX(-5px) rotate(-1deg);
          }
        }
        .animate-wobble {
          animation: wobble 1s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .font-comic {
          font-family: "Comic Sans MS", "Comic Sans", cursive;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

export default PocketFindsGallery;