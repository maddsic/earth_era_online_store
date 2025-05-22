import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { ArrowLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { client } from "sanity-studio/studio/client";
import {
  getCategoryBySlug,
  getProductsByCategoryId,
} from "sanity-studio/studio/lib/queries";
import { motion } from "framer-motion";
import { useState } from "react";
import { urlFor } from "sanity-studio/studio/imageBuilder";
import { Navbar } from "app/components/Navbar/navbar";

interface ProductsProps {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
}

interface Category {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ProductsPage: React.FC<ProductsProps> = () => {
  const { category, products } = useLoaderData<typeof loader>();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  console.log(category);
  console.log(products.length);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <>
      <Navbar />
      <main className="">
        {products.length === 0 ? (
          <ProductsNotFound />
        ) : (
          <div className="container mx-auto px-4 py-20">
            <div className="">
              <BackButton />
              <h1 className="text-4xl font-bold capitalize">
                {category.title} Products
              </h1>
              <p className="text-gray-600 mt-2 max-w-3xl">
                {category.description}
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-5"
            >
              {products.map((product: ProductsProps) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group"
                >
                  <Link to={`/product/${product.slug.current}`}>
                    <div className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl">
                      {/* Product Image */}
                      <div className="relative aspect-square">
                        <div className="aspect-[4/4] w-full oveflow-hidden rounded-lg">
                          <img
                            src={urlFor(product.imageUrl).url()}
                            alt={product.name}
                            className=" w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <Overlay />
                        {/* Quick shop button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={
                              hoveredProduct === product._id
                                ? { y: 0, opacity: 1 }
                                : {}
                            }
                            transition={{ duration: 0.3 }}
                            className={` text-white px-6 py-3 rounded-full flex items-center gap-2 bg-earth-primary`}
                          >
                            <ShoppingCart className="h-5 w-5" />
                            <span>View Options</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <ProductInfo
                        name={product.name}
                        description={product.description}
                        price={product.price}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
};

export default ProductsPage;

// Remix Loader function
export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug as string;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }
  // fetch cat by slug
  const category = await client.fetch(getCategoryBySlug, { slug });
  // check if cat_id exist
  if (!category) {
    throw new Response("Not Found", { status: 404 });
  }
  // fetch product by category id
  const products = await client.fetch(getProductsByCategoryId, {
    categoryId: category._id,
  });

  return { products, category };
};

// COMPONENTS
function Overlay({}) {
  return (
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
  );
}

function ProductInfo({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: number;
}) {
  return (
    <div className="p-5 bg-white">
      <h3 className="text-lg font-semibold capitalize font-montserrat mb-1 group-hover:text-earth-primary transition-colors">
        {name}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2 font-lato">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold font-montserrat">
          ${price.toFixed(2)}
        </span>
        <span
          className={`text-sm font-medium  font-lato flex items-center text-green-600`}
        >
          View Details <ChevronRight className="h-4 w-4 ml-1" />
        </span>
      </div>
    </div>
  );
}

function BackButton({}) {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-earth-primary mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}

function ProductsNotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-24 px-4"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-red-700 mb-4">
        No products found
      </h2>
      <p className="text-gray-500 text-lg mb-6 max-w-md">
        Sorry, we couldn't find any products in this category. Please check back
        later or explore other categories.
      </p>
      <Link
        to="/"
        className="inline-block bg-earth-primary hover:bg-earth-dark text-white px-6 py-3 rounded-full transition duration-300"
      >
        Back to Home
      </Link>
    </motion.div>
  );
}
