import type { MetaFunction } from "@remix-run/node";
import BackToTop from "~/components/back-to-top/backToTop";
import ChooseUs from "~/components/Choose/choose-us";
import FaqsSection from "~/components/Faqs/faqs";
import Footer from "~/components/footer/footer";
import HeroSlider from "~/components/HeroSlider/hero";
import HowItWorksSection from "~/components/howItWorks/how";
import { Navbar } from "~/components/Navbar/navbar";
import SocialSidebar from "~/components/socialSidebar/socialSidebar";
import TestimonialSection from "~/components/testimonial/testimonials";
// Sanity Hooks
// Types
import { sanityQuery } from "~/helpers/querySanity";
import { useLoaderData } from "@remix-run/react";
import CategorySection from "~/components/category/category";

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
