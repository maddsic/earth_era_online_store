import { CheckCircle2, Clock, Truck, ThumbsUp } from "lucide-react";

interface HowItWorksProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

// How It Works data
export const HowItWorksData: HowItWorksProps[] = [
  {
    title: "Choose Your Product",
    description:
      "Browse our range of premium herbal supplements and select what's right for you.",
    icon: <CheckCircle2 className="w-8 h-8" />,
  },
  {
    title: "Select Your Plan",
    description:
      "Pick a subscription plan that fits your needs - monthly, quarterly, or bi-annual.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    title: "Free Delivery",
    description:
      "We'll ship your order directly to your door with our carbon-neutral delivery.",
    icon: <Truck className="w-8 h-8" />,
  },
  {
    title: "Enjoy the Benefits",
    description:
      "Experience the natural benefits of our premium herbal supplements.",
    icon: <ThumbsUp className="w-8 h-8" />,
  },
];
