import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

const PocketFindsForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [weirdnessRating, setWeirdnessRating] = useState(5);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const funnyPlaceholders = [
    "A mysterious key to... somewhere?",
    "Three-month-old movie ticket stub",
    "That weird rubber thing you have no idea about",
    "Half-eaten candy from last Halloween",
    "A receipt for something embarrassing",
    "The weirdest lint ball in history",
  ];

  const funnyDescriptions = [
    "Tell us how this oddity ended up in your pocket...",
    "Share the bizarre backstory of this pocket treasure!",
    "Explain how long this has been hiding in your pocket dimension...",
    "We promise not to judge (much) about this find...",
    "What's the strange saga behind this pocket surprise?",
  ];

  // Success messages
  const successMessages = [
    "WOOHOO! Your weird pocket find has been uploaded to our dimension!",
    "SUCCESS! Your pocket oddity is now immortalized for all to see!",
    "BAZINGA! Your strange treasure is now in our collection!",
    "OH SNAP! You've successfully shared your pocket surprise with the world!",
    "HOLY MOLY! Your pocket mystery has been unleashed upon humanity!"
  ];

  // Error messages
  const errorMessages = [
    "OOPSIE WOOPSIE! Something went wonky with your upload!",
    "OH NO! Your pocket find got lost in the digital void!",
    "YIKES! Our pocket dimension glitched out!",
    "UH-OH SPAGHETTIO! Something weird happened (weirder than your find)!",
    "GOOD GRIEF! The upload gremlins struck again!"
  ];

  const getRandomMessage = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getRandomPlaceholder = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getWeirdnessEmoji = () => {
    const emojis = ['😐', '🙂', '😮', '😲', '🤨', '😳', '🤔', '🤯', '👽', '🧟‍♂️'];
    return emojis[Math.min(Math.floor(weirdnessRating), 9)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('weirdnessRating', weirdnessRating);
    
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      // Make actual API call to your backend endpoint
      const response = await axios.post('http://localhost:3000/api/finds/pocket-finds', formData, {    
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Show success popup instead of message
        setShowSuccessPopup(true);
        
        // Reset form
        setItemName('');
        setDescription('');
        setWeirdnessRating(5);
        setPreviewImage(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(response.data.message || 'Failed to upload pocket find');
      }
    } catch (error) {
      console.error('Error uploading pocket find:', error);
      setError(error.response?.data?.message || error.message || 'Something went wrong with your upload');
      setShowErrorPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const navigateToLandingPage = () => {
    window.location.href = '/'; // Change this to your landing page URL
  };

  const weirdnessLabels = {
    1: "Mildly Unusual",
    3: "Definitely Strange",
    5: "Seriously Weird",
    7: "Bizarrely Odd",
    10: "Reality-Breaking"
  };

  // Apply random rotation to emojis in popup
  const getRandomRotation = () => {
    return `rotate(${Math.floor(Math.random() * 60 - 30)}deg)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-400 via-purple-300 to-indigo-400 py-12 px-4 sm:px-6 lg:px-8 font-comic">
      {/* Floating emoji background decorations */}
      <div className="absolute bottom-10 right-10 text-6xl animate-bounce delay-700">🔑</div>
      <div className="absolute top-20 right-20 text-5xl animate-spin-slow">🧠</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-pulse">👀</div>
      
      {/* Back to Landing Page Button */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={navigateToLandingPage}
          className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white font-extrabold py-3 px-6 rounded-full border-4 border-dashed border-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:-rotate-6 hover:shadow-xl flex items-center"
        >
          <span className="inline-block animate-bounce mr-2">👈</span>
          BACK TO WEIRDNESS HQ!
          <span className="inline-block animate-spin-slow ml-2">🔮</span>
        </button>
      </div>
      
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 border-8 border-dashed border-yellow-400">
        {/* Header with crazy pattern */}
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 py-6 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-teal-400 transform rotate-45 translate-x-1/2 scale-150"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-blue-400 transform -rotate-45 -translate-y-1/2 scale-150"></div>
          </div>
          
          <h2 className="text-4xl font-extrabold text-white tracking-wide animate-bounce font-comic">
            🧠 WEIRD POCKET FINDS 🧠
          </h2>
          <p className="mt-2 text-xl text-white animate-pulse font-comic">Show us what's hiding in your pockets!</p>
          
          {/* Zigzag border at bottom of header */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-white" style={{ clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)" }}></div>
        </div>
        
        <form onSubmit={handleSubmit} className="py-8 px-6 space-y-6 bg-gradient-to-b from-white to-purple-50">
          {submitMessage && (
            <div className="bg-green-100 border-4 border-green-400 border-dotted text-green-700 p-4 mb-4 rounded-xl animate-pulse">
              <p className="text-center font-bold">{submitMessage}</p>
            </div>
          )}
          
          {error && !showErrorPopup && (
            <div className="bg-red-100 border-4 border-red-400 border-dotted text-red-700 p-4 mb-4 rounded-xl">
              <p className="text-center font-bold">{error}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="item-name" className="block text-xl font-bold text-purple-700 mb-2 transform -rotate-1">
              <span className="inline-block animate-bounce">🔍</span> Name Your Weird Find 
              <span className="inline-block animate-pulse ml-2">👽</span>
            </label>
            <input
              type="text"
              id="item-name"
              className="appearance-none block w-full px-4 py-4 border-4 border-yellow-300 rounded-xl shadow-lg placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900 bg-gradient-to-r from-yellow-50 to-pink-50 transform hover:-rotate-1"
              placeholder={getRandomPlaceholder(funnyPlaceholders)}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-xl font-bold text-purple-700 mb-2 transform rotate-1">
              <span className="inline-block animate-spin-slow">📝</span> The Bizarre Backstory 
              <span className="inline-block animate-pulse ml-2">🕵️‍♂️</span>
            </label>
            <textarea
              id="description"
              rows={4}
              className="appearance-none block w-full px-4 py-4 border-4 border-green-300 rounded-xl shadow-lg placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900 bg-gradient-to-r from-green-50 to-blue-50 transform hover:rotate-1"
              placeholder={getRandomPlaceholder(funnyDescriptions)}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="image-upload" className="block text-xl font-bold text-purple-700 mb-2 transform -rotate-2">
              <span className="inline-block animate-pulse">📸</span> Photo Evidence 
              <span className="inline-block animate-bounce ml-2">🔎</span>
            </label>
            <input
              type="file"
              id="image-upload"
              ref={fileInputRef}
              accept="image/*"
              className="appearance-none block w-full px-4 py-4 border-4 border-blue-300 rounded-xl shadow-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-extrabold file:bg-gradient-to-r file:from-pink-500 file:to-orange-500 file:text-white hover:file:from-pink-600 hover:file:to-orange-600 text-gray-900 bg-gradient-to-r from-blue-50 to-purple-50 transition duration-300 ease-in-out transform hover:rotate-1"
              onChange={handleImageChange}
              required
            />
            
            {previewImage && (
              <div className="mt-3 flex justify-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-48 object-contain rounded-xl border-8 border-dotted border-purple-300 p-2 transform -rotate-3 shadow-lg"
                />
              </div>
            )}
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-indigo-100 to-pink-100 p-6 rounded-xl border-4 border-dotted border-indigo-300 shadow-lg">
            <label className="block text-xl font-bold text-purple-700 mb-3 text-center">
              Weirdness Rating {getWeirdnessEmoji()}
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-indigo-600 animate-pulse">1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={weirdnessRating}
                onChange={(e) => setWeirdnessRating(parseInt(e.target.value))}
                className="w-full h-8 bg-gradient-to-r from-green-300 via-yellow-300 to-red-500 rounded-full appearance-none cursor-pointer"
              />
              <span className="text-lg font-bold text-red-600 animate-pulse">10</span>
            </div>
            <div className="mt-2 text-center font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {weirdnessRating}/10 - {weirdnessLabels[weirdnessRating] || weirdnessLabels[Math.ceil(weirdnessRating/2)*2-1]}
            </div>
          </div>
          
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-4 px-6 border-4 border-purple-500 rounded-xl shadow-xl text-xl font-extrabold text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-offset-2 transform transition-all duration-300 hover:-rotate-2 hover:scale-105 hover:shadow-2xl"
            >
              {isSubmitting ? (
                <span className="animate-pulse flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading to the Pocket Dimension...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="animate-bounce mr-2">🚀</span> UNLEASH YOUR FIND! 
                  <span className="animate-bounce ml-2">🚀</span>
                </span>
              )}
            </button>
          </div>
          
          <div className="text-center text-sm text-purple-500 mt-6 italic bg-yellow-100 p-3 rounded-xl border-2 border-yellow-300 transform -rotate-1">
            By submitting, you confirm this actually came from a pocket and not some other dimension... probably
          </div>
        </form>
        
        {/* Footer with wavy pattern */}
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-3 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-20 bg-yellow-400 transform rotate-45 translate-x-1/2"></div>
            <div className="absolute top-0 left-0 w-full h-20 bg-pink-400 transform -rotate-45 -translate-y-1/2"></div>
          </div>
          
          <p className="text-white font-bold relative z-10 animate-pulse">👖 What's In YOUR Pockets? 👖</p>
          
          {/* Zigzag border at top of footer */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-white" style={{ clipPath: "polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)" }}></div>
        </div>
      </div>
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-gradient-to-br from-green-400 via-teal-300 to-blue-500 p-8 rounded-3xl border-8 border-dashed border-yellow-300 shadow-2xl max-w-md w-full relative z-10 transform transition-all animate-bounce-slow">
            {/* Floating emojis in the popup */}
            <div className="absolute top-4 left-4 text-4xl" style={{ transform: getRandomRotation() }}>🎉</div>
            <div className="absolute top-4 right-4 text-4xl" style={{ transform: getRandomRotation() }}>🥳</div>
            <div className="absolute bottom-4 left-4 text-4xl" style={{ transform: getRandomRotation() }}>👏</div>
            <div className="absolute bottom-4 right-4 text-4xl" style={{ transform: getRandomRotation() }}>✨</div>
            
            <div className="text-center bg-white bg-opacity-80 p-6 rounded-xl border-4 border-dotted border-green-500">
              <div className="text-5xl mb-4 flex justify-center">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="inline-block animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>🎊</span>
                ))}
              </div>
              <h3 className="text-3xl font-extrabold text-green-600 mb-4 font-comic tracking-wide">SUCCESS!</h3>
              <p className="text-xl font-bold text-purple-700 mb-6 font-comic">
                {getRandomMessage(successMessages)}
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={closeSuccessPopup}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-extrabold py-3 px-6 rounded-xl border-4 border-green-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-3"
                >
                  AWESOME! 👍
                </button>
                <button 
                  onClick={navigateToLandingPage}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold py-3 px-6 rounded-xl border-4 border-purple-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:-rotate-3"
                >
                  BACK HOME 🏠
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-gradient-to-br from-red-400 via-pink-300 to-purple-500 p-8 rounded-3xl border-8 border-dashed border-yellow-300 shadow-2xl max-w-md w-full relative z-10 transform transition-all animate-wobble">
            {/* Floating emojis in the popup */}
            <div className="absolute top-4 left-4 text-4xl" style={{ transform: getRandomRotation() }}>😵</div>
            <div className="absolute top-4 right-4 text-4xl" style={{ transform: getRandomRotation() }}>🤪</div>
            <div className="absolute bottom-4 left-4 text-4xl" style={{ transform: getRandomRotation() }}>💥</div>
            <div className="absolute bottom-4 right-4 text-4xl" style={{ transform: getRandomRotation() }}>🔥</div>
            
            <div className="text-center bg-white bg-opacity-80 p-6 rounded-xl border-4 border-dotted border-red-500">
              <div className="text-5xl mb-4 flex justify-center">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="inline-block animate-spin-slow" style={{ animationDelay: `${i * 0.1}s` }}>💩</span>
                ))}
              </div>
              <h3 className="text-3xl font-extrabold text-red-600 mb-4 font-comic tracking-wide">OH NO!</h3>
              <p className="text-xl font-bold text-purple-700 mb-6 font-comic">
                {getRandomMessage(errorMessages)}
              </p>
              <p className="text-md mb-6 text-red-600 bg-red-100 p-3 rounded-lg border-2 border-red-300">
                {error}
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={closeErrorPopup}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-extrabold py-3 px-6 rounded-xl border-4 border-red-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:-rotate-3"
                >
                  TRY AGAIN 🔄
                </button>
                <button 
                  onClick={navigateToLandingPage}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold py-3 px-6 rounded-xl border-4 border-purple-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-3"
                >
                  BACK HOME 🏠
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add custom animations */}
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
        
        .font-comic {
          font-family: "Comic Sans MS", "Comic Sans", cursive;
        }
      `}</style>
    </div>
  );
};

export default PocketFindsForm;