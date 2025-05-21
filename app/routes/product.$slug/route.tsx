import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  RefreshCw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { client } from "sanity-studio/studio/client";
import { urlFor } from "sanity-studio/studio/imageBuilder";
import { Navbar } from "~/components/Navbar/navbar";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

const ProductDetailsPage = () => {
  const { product } = useLoaderData<typeof loader>();
  const {
    name,
    imageUrl,
    price,
    description,
    benefits,
    tags,
    subscriptions,
  }: {
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    benefits: string[];
    tags: string[];
    subscriptions: {
      months: number;
      price: number;
      savings: number;
      features: string[];
      isPopular?: boolean;
    }[];
  } = product;
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSubscription, setSelectedSubscription] = useState<
    number | null
  >(1); // Default to the 3-month plan
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const categoryInfo = product.category.title;
  const imageSrc = imageUrl ? urlFor(imageUrl).url() : "";

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedSubscription === null) {
      alert("Please select a subscription plan");
      return;
    }

    // Show success message
    setShowSuccessMessage(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="relative container mx-auto px-4 py-20">
        {/* Breadcrumb Navigation */}
        <BreadCrumbNavigation name={name} categoryInfo={categoryInfo} />

        {product.length === 0 ? (
          <div>
            <h1 className="text-2xl font-bold text-center mt-10">
              Product not found
            </h1>
          </div>
        ) : (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div>
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg aspect-square">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 aspect-[4/4] w-full h-full"
                      >
                        <img
                          src={urlFor(imageSrc).url()}
                          alt={`${name} view ${activeImageIndex + 1}`}
                          className="object-cover w-full h-full"
                          priority="true"
                        />

                        {/* Decorative elements */}
                        <motion.div
                          className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-white/10 to-transparent"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, 0],
                          }}
                          transition={{
                            duration: 12,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />

                        <motion.div
                          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-tl from-white/10 to-transparent"
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -10, 0],
                          }}
                          transition={{
                            duration: 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 1,
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="flex flex-col">
                  {/* Tags */}
                  <motion.div
                    className="flex flex-wrap gap-2 mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {tags?.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        className={`text-xs font-medium px-2 py-1 rounded-full bg-green-900 text-white capitalize `}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                  {/* Product Title */}
                  <ProductTitle name={name} />
                  {/* Rating */}
                  <ProductRating />
                  {/* Price */}
                  <ProductPrice price={price} />
                  {/* Description */}
                  <motion.p
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {description}
                  </motion.p>
                  {/* Benefits */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h3 className="font-bold text-lg mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  {/* Subscription Plans - Main Focus */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <h2 className="text-2xl font-bold mb-4">
                      Choose Your Subscription Plan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {subscriptions?.map((subscription, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.9 + index * 0.2,
                            type: "spring",
                          }}
                          whileHover={{
                            y: -15,
                            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
                            transition: {
                              duration: 0.3,
                              type: "spring",
                              stiffness: 300,
                            },
                          }}
                          className={` ${
                            selectedSubscription === index
                              ? "border-2 border-green-300 relative rounded-xl p-4 cursor-pointer transition-all capitalize h-[250px] shadow-lg"
                              : "relative rounded-xl border-2 p-4 cursor-pointer transition-all capitalize h-[250px]"
                          } `}
                          onClick={() => setSelectedSubscription(index)}
                        >
                          {subscription.isPopular && (
                            <motion.div
                              className="absolute -top-3 left-1/2 -translate-x-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 1.2 + index * 0.2,
                                type: "spring",
                              }}
                            >
                              <span
                                className={`bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse`}
                              >
                                Most Popular
                              </span>
                            </motion.div>
                          )}
                          <div className="text-center pt-2">
                            <h4 className="font-bold mb-1">
                              {subscription.months} Month Supply
                            </h4>
                            <div className="flex items-baseline justify-center gap-1 mb-1">
                              <span className="text-2xl font-bold">
                                ${subscription.price}
                              </span>
                              <span className="text-gray-600 text-sm">/mo</span>
                            </div>
                            {subscription.savings > 0 && (
                              <p className="text-green-600 text-sm mb-3">
                                Save ${subscription.savings}
                              </p>
                            )}
                            <ul className="text-sm text-left space-y-2 mt-4">
                              {subscription.features.map((feature, i) => (
                                <motion.li
                                  key={i}
                                  className="flex items-start gap-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: 1.3 + index * 0.2 + i * 0.1,
                                  }}
                                >
                                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Decorative elements */}
                          <motion.div
                            className={`absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-green-700 opacity-10`}
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                              delay: index * 0.5,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  {/* Quantity and Add to Cart */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-36">
                      <motion.button
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={decreaseQuantity}
                        className="px-3 py-2 bg-gray-100 transition-colors"
                      >
                        -
                      </motion.button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, Number.parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-full text-center py-2 focus:outline-none"
                      />
                      <motion.button
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={increaseQuantity}
                        className="px-3 py-2 bg-gray-100 transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      // className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg ${categoryInfo.accentColor} text-white font-medium transition-all duration-300`}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-green-400 text-white font-medium transition-all duration-300`}
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Subscribe Now</span>
                    </motion.button>
                  </motion.div>
                  {/* Additional Actions */}
                  <Actions />

                  {/* Shipping Info */}
                  <motion.div
                    className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05, color: "#4A5F41" }}
                    >
                      <Truck className="h-5 w-5 text-gray-500" />
                      <span>Free shipping on orders over $50</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05, color: "#4A5F41" }}
                    >
                      <RefreshCw className="h-5 w-5 text-gray-500" />
                      <span>30-day satisfaction guarantee</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05, color: "#4A5F41" }}
                    >
                      <Shield className="h-5 w-5 text-gray-500" />
                      <span>Secure checkout</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ProductDetailsPage;

const query = `*[_type == "product" && slug.current == $slug][0]{
  name,
  slug,
  imageUrl,
  price,
  category->{title, slug},
  description,
  benefits,
  tags,
  subscriptions
}`;

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const product = await client.fetch(query, { slug });

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return { product };
};

function BreadCrumbNavigation({
  name,
  categoryInfo,
}: {
  name: string;
  categoryInfo: string;
}) {
  return (
    <div className="bg-gray-100 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-earth-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link
            to={`/products/${name}`}
            className="hover:text-earth-primary transition-colors"
          >
            {categoryInfo}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-bold">{name}</span>
        </div>
      </div>
    </div>
  );
}

function ProductTitle({ name }: { name: string }) {
  return (
    <motion.h1
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
      className="text-3xl md:text-4xl font-bold mb-2 capitalize font-montserrat"
    >
      {name}
    </motion.h1>
  );
}

function ProductPrice({ price }: { price: number }) {
  return (
    <motion.div
      className="text-2xl font-bold mb-4"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.4,
      }}
    >
      From ${price}/month
    </motion.div>
  );
}

function ProductRating({}) {
  return (
    <motion.div
      className="flex items-center gap-2 mb-4"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.3,
      }}
    >
      <div className="flex">
        {Array.from({
          length: 5,
        }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 text-yellow-500  fill-yellow-500`}
          />
        ))}
        <span className="ml-2 text-gray-500">4.8 (124 reviews)</span>
      </div>
      {/* <span className="text-gray-600">
     {productInfo.rating} ({productInfo.reviews} reviews)
    </span> */}
    </motion.div>
  );
}

function Actions({}) {
  return (
    <motion.div
      className="flex gap-4 mb-8"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 1.3,
      }}
    >
      <motion.button
        className="flex items-center gap-2 text-gray-600 hover:text-earth-primary transition-colors"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <Heart className="h-5 w-5" />
        <span>Add to Wishlist</span>
      </motion.button>
      <motion.button
        className="flex items-center gap-2 text-gray-600 hover:text-earth-primary transition-colors"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <Share2 className="h-5 w-5" />
        <span>Share</span>
      </motion.button>
    </motion.div>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error);
//   return (
//     <div className="text-center py-10">
//       <h1 className="text-2xl font-bold">Unexpected Error</h1>
//       <p>{error.message}</p>
//     </div>
//   );
// }

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
