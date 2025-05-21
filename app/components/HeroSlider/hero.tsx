import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSliderProps } from "~/types";
import { urlFor } from "sanity-studio/studio/imageBuilder";

const HeroSlider: React.FC<HeroSliderProps> = ({ sliderData }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderData.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={urlFor(sliderData[current].image.asset._ref || "").url()}
            alt={sliderData[current].title}
            width="100%"
            height="100%"
            className="object-cover w-full h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {sliderData[current].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {sliderData[current].description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-earth-primary text-white px-8 py-3 rounded-full 
                          hover:bg-earth-secondary transition-colors "
              >
                Explore Products
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
