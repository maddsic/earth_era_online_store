import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "sanity-studio/studio/imageBuilder";
import { ProductCardProps } from "app/types";

const productImages = {
  moringa: "/moringa-product1.jpg",
  hibiscus:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hibiscus-powder.jpg-JyH0PR0VBV5CW4aOBdCyzzffKzZbEn.jpeg",
  "ginger-root": "/moringa-product1.jpg",
  "maca-root":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maca_Benefits_for_Hair_Health_480x480.jpg-L1PUMVLm6ancNxA6UDIzhVmiBi3Elh.jpeg",
};

const ProductCard = ({
  title,
  description,
  slug,
  color,
  imageUrl,
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-2xl ${color} shadow-lg`}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={urlFor(imageUrl).url()}
          alt=""
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className={`p-6 ${color}`}>
        <h3 className="text-2xl font-bold capitalize text-white mb-2">
          {title}
        </h3>
        <p className="text-white/90 mb-4">{description}</p>
        <a
          href={`/products/${slug}`}
          className="inline-flex items-center text-white hover:underline"
        >
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
