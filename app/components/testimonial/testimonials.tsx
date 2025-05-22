import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialData } from "app/resources/testimonials";
import { SectionHeading } from "../sectionHeading/heading";

const TestimonialSection = () => {
  const [currentTestimonails, setCurrentTestimonials] = useState<number>(0);
  const [autoplay, setAutoPlay] = useState<boolean>(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentTestimonials((prev) => (prev + 1) % TestimonialData.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [autoplay]);

  // Next Btn
  const nextBtn = () => {
    setAutoPlay(false);
    setCurrentTestimonials((prev) => (prev + 1) % TestimonialData.length);
  };

  const prevBtn = () => {
    setAutoPlay(false);
    setCurrentTestimonials(
      (prev) => (prev - 1 + TestimonialData.length) % TestimonialData.length
    );
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/capsules.jpg"
          alt="Natural herbs background"
          className="object-cover opacity-50"
          height="100%"
          width="100%"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-earth-accent/20 to-earth-accent/30" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionHeading
          isInView={isInView}
          heading="What Our Customers Say"
          subHeading="   Don't just take our word for it. Here's what our customers have to say
        about their experience with our products."
        />

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4,
            type: "spring",
            damping: 15,
          }}
          className="max-w-6xl mx-auto relative"
        >
          {/* Large Quote Icon */}
          <LargeQuote isInView={isInView} />

          <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl">
            <div className="grid md:grid-cols-2">
              {/* Testimonial Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonails}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col justify-center"
                  >
                    {/* STARS */}
                    <Stars currentTestimonails={currentTestimonails} />
                    <p className="text-xl md:text-2xl text-gray-700 italic mb-8">
                      "{TestimonialData[currentTestimonails].text}"
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-bold text-lg">
                        {TestimonialData[currentTestimonails].name}
                      </h4>
                      <p className="text-earth-primary">
                        {TestimonialData[currentTestimonails].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image Side with Gradient Overlay */}
              <div className="relative h-64 md:h-auto bg-earth-primary">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonails}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {/* Small Image */}
                    <img
                      src={
                        TestimonialData[currentTestimonails].img ||
                        "/placeholder.svg"
                      }
                      alt={TestimonialData[currentTestimonails].name}
                      className="object-cover opacity-20"
                    />
                    {/* Background color */}
                    <div className="absolute inset-0 bg-gradient-to-r from-earth-primary to-earth-primary/80" />

                    {/* Big Image overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                        <img
                          src={
                            TestimonialData[currentTestimonails].img ||
                            "/placeholder.svg"
                          }
                          alt={TestimonialData[currentTestimonails].name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <NavigationControls
            isInView={isInView}
            prevBtn={prevBtn}
            setAutoPlay={setAutoPlay}
            setCurrentTestimonials={setCurrentTestimonials}
            currentTestimonails={currentTestimonails}
            nextBtn={nextBtn}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;

// Large Quote
function LargeQuote({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: 0.6,
        type: "spring",
        damping: 10,
      }}
      className="absolute -top-70 left-1/3 -translate-x-1/2 text-earth-primary/10"
    >
      <Quote className="w-28 h-28 text-yellow-700" />
    </motion.div>
  );
}

function NavigationControls({
  isInView,
  prevBtn,
  setAutoPlay,
  setCurrentTestimonials,
  currentTestimonails,
  nextBtn,
}: {
  isInView: boolean;
  prevBtn: () => void;
  setAutoPlay: (value: boolean) => void;
  setCurrentTestimonials: (index: number) => void;
  currentTestimonails: number;
  nextBtn: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: 0.8,
        type: "spring",
      }}
      className="flex justify-center mt-8 gap-4"
    >
      <button
        onClick={prevBtn}
        className="p-3 rounded-full bg-white shadow-md hover:bg-earth-accent transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6 text-earth-primary" />
      </button>

      <div className="flex items-center gap-2">
        {TestimonialData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoPlay(false);
              setCurrentTestimonials(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentTestimonails
                ? "bg-earth-primary scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={nextBtn}
        className="p-3 rounded-full bg-white shadow-md hover:bg-earth-accent transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6 text-earth-primary" />
      </button>
    </motion.div>
  );
}

function Stars({ currentTestimonails }: { currentTestimonails: number }) {
  return (
    <div className="flex mb-4">
      {Array.from({
        length: 5,
      }).map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < TestimonialData[currentTestimonails].rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
