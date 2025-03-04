import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const images = [
  "/assets/manageTruck.jpg",
  "/assets/manageFleet.jpg",
  "/assets/geoLocation.jpg",
];

const GetStarted = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-[300px]">
        <AnimatePresence>
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>

      {/* Centered Button Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => navigate("/intro")}
          className="px-6 py-3 font-bold text-black bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg border border-black"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default GetStarted;