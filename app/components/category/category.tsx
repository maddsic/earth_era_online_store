// Framer Motion
import { motion, useInView } from "framer-motion";
// Components
import ProductCard from "../ProductCard/productCard";
import { SectionHeading } from "../sectionHeading/heading";
// Hooks
import { useRef } from "react";
import { useNavigate } from "@remix-run/react";
import { ProductSectionProps } from "~/types";

const CategorySection = ({ categoryData }: { categoryData: [] }) => {
  // console.log("LOGGING FROM PRODUCTS COMPONENT");
  // console.log(categoryData);

  const navigation = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, type: "spring" }}
          className="text-center mb-16"
        >
          <SectionHeading
            isInView={isInView}
            heading="Our Categories"
            subHeading=" Discover our selection of premium natural supplements, carefully
            sourced and processed to maintain their powerful benefits."
          />
        </motion.div>

        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer"
        >
          {categoryData.map((category: ProductSectionProps, index) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              onClick={() => navigation(`/category/${category.title}`)}
            >
              <ProductCard {...category} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
