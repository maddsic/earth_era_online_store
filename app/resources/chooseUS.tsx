import { Award, Leaf, Sparkles, Users } from "lucide-react";

interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

// Why Choose Us data
export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    title: "Premium Quality",
    description:
      "We source only the highest quality ingredients, tested for purity and potency.",
    icon: <Award className="w-10 h-10" />,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Sustainably Sourced",
    description:
      "Our ingredients are ethically harvested with respect for nature and communities.",
    icon: <Leaf className="w-10 h-10" />,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    title: "Science-Backed",
    description:
      "All our formulations are based on scientific research and traditional wisdom.",
    icon: <Sparkles className="w-10 h-10" />,
    color: "from-teal-400 to-teal-600",
  },
  {
    title: "Customer Satisfaction",
    description:
      "Join thousands of satisfied customers who have transformed their health with our products.",
    icon: <Users className="w-10 h-10" />,
    color: "from-cyan-400 to-cyan-600",
  },
];
