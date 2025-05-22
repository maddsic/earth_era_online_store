import type { MetaFunction } from "@remix-run/node";
import BackToTop from "app/components/back-to-top/backToTop";
import ChooseUs from "app/components/Choose/choose-us";
import FaqsSection from "app/components/Faqs/faqs";
import Footer from "app/components/footer/footer";
import HeroSlider from "app/components/HeroSlider/hero";
import HowItWorksSection from "app/components/howItWorks/how";
import { Navbar } from "app/components/Navbar/navbar";
import SocialSidebar from "app/components/socialSidebar/socialSidebar";
import TestimonialSection from "app/components/testimonial/testimonials";
// Sanity Hooks
// Types
import { sanityQuery } from "app/helpers/querySanity";
import { useLoaderData } from "@remix-run/react";
import CategorySection from "app/components/category/category";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
  1;
};

export default function Index() {
  const { categoryData, sliderData } = useLoaderData<typeof loader>();
  return (
    <main className="">
      <Navbar />
      <HeroSlider sliderData={sliderData} />
      <CategorySection categoryData={categoryData} />
      <ChooseUs />
      <HowItWorksSection />
      <TestimonialSection />
      <FaqsSection />
      <Footer />
      <BackToTop />
      <SocialSidebar />
    </main>
  );
}

// Remix Loader function
export async function loader() {
  const { data: categoryData } = await sanityQuery({
    type: "category",
    fields: "_id, imageUrl, title, description, slug, color",
  });
  const { data: sliderData } = await sanityQuery({
    type: "slides",
    fields: "_id, image, title, description",
  });

  console.log("Fetching SLider Data");
  console.log(sliderData);

  return { categoryData, sliderData };
}
