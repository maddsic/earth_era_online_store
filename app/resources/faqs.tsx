interface FaqsProps {
  question: string;
  answer: string;
}

// FAQ data
export const FaqsData: FaqsProps[] = [
  {
    question: "How should I take these supplements?",
    answer:
      "Our supplements come with detailed usage instructions. Generally, capsules should be taken with water, while powders can be mixed into smoothies, juices, or other beverages. Always follow the recommended dosage on the packaging.",
  },
  {
    question: "Are your products organic?",
    answer:
      "Yes, all Earth Era products are certified organic. We source our ingredients from trusted farms that follow sustainable and organic farming practices to ensure the highest quality and purity.",
  },
  {
    question: "How long will it take to see results?",
    answer:
      "Results vary depending on the individual and the product. Some people notice benefits within days, while others may take a few weeks. Consistency is key - we recommend taking our supplements regularly for at least 30 days.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "You can easily manage or cancel your subscription at any time through your account dashboard or by contacting our customer support team.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping times and costs vary by location. You can view specific shipping information during checkout.",
  },
];
