import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import { FaqsData } from "app/resources/faqs";
import { SectionHeading } from "../sectionHeading/heading";

const FaqsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  //   Toggle Faqs
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image and Pattern */}
      <div className="absolute inset-0 z-0">
        {/* <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moringa-oleifera-powder-and-capsules-1296x728.jpg-AiOJLwcf8Ken1VsxMZpqH4h1Tnh9KY.jpeg?width=100&height=100"
          width="100%"
          alt="Moringa background"
          className="object-cover opacity-10"
        /> */}
        <div className="absolute inset-0 bg-white" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <SectionHeading
            heading="Frequently Asked Questions"
            subHeading="Find answers to common questions about our products, subscriptions,
            and shipping."
            isInView={isInView}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            damping: 15,
          }}
          className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-8"
        >
          {FaqsData.map((faq, index) => (
            <FAQ
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqIndex === index}
              onClick={() => toggleFaq(index)}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqsSection;

// FAQ Component
function FAQ({
  question,
  answer,
  isOpen,
  onClick,
  index,
  isInView,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="border-b border-gray-200 py-4"
    >
      <button
        className="flex justify-between items-center w-full text-left font-medium text-lg"
        onClick={onClick}
      >
        {question}
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
