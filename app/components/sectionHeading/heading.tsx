import { motion } from "framer-motion";

export const SectionHeading = ({
  isInView,
  heading,
  subHeading,
}: {
  isInView: boolean;
  heading: string;
  subHeading: string;
}) => {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{
          opacity: 0,
          y: -30,
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
          type: "spring",
        }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        {heading}
      </motion.h2>
      <motion.p
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
          delay: 0.2,
          type: "spring",
        }}
        className="text-gray-600 max-w-2xl mx-auto"
      >
        {subHeading}
      </motion.p>
    </div>
  );
};
