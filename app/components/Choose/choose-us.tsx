import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { whyChooseUsData } from "app/resources/chooseUS";
import { SectionHeading } from "../sectionHeading/heading";

interface WhyChooseUsDataProps {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const ChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Natural background"
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-primary/10 to-earth-accent/30" />
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-earth-accent/30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-earth-accent/20 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <SectionHeading
            isInView={isInView}
            heading="Why Choose Us"
            subHeading="At Earth Era, we're committed to providing the highest quality
            natural supplements to support your health journey."
          />
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {whyChooseUsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative group"
            >
              {/* BACKGROUND ELEMENT */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br bg-white/90 backdrop-blur-sm shadow-xl transform group-hover:scale-[1.02] transition-all duration-300" />
              {/* CARD */}
              <div className="relative p-8 z-10">
                <div
                  className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-earth-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
