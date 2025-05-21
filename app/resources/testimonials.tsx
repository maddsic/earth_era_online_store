interface TestimonialsDataProps {
  name: string;
  role: string;
  img: string;
  rating: number;
  text: string;
  product: string;
}

// Testimonials data
export const TestimonialData: TestimonialsDataProps[] = [
  {
    name: "Sain Sidibeh",
    role: "Software Developer",
    img: "/sain.jpeg?height=80&width=80",
    rating: 5,
    text: "I've been using Earth Era's Moringa supplements for 3 months and have noticed a significant boost in my energy levels. The quality is exceptional!",
    product: "moringa",
  },
  {
    name: "Shabri Alexis",
    role: "IT Consultant",
    img: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The Hibiscus tea has become a daily ritual for me. Not only does it taste amazing, but my blood pressure readings have improved since I started using it.",
    product: "hibiscus",
  },
  {
    name: "Abdou Jammeh",
    role: "Coding Instructor",
    img: "/dos.jpeg?height=80&width=80",
    rating: 4,
    text: "Ashwagandha has been a game-changer for my stress levels. I feel more balanced and focused throughout the day. Highly recommend!",
    product: "ashwagandha",
  },
  {
    name: "Amadou W. Jallow",
    role: "Artist",
    img: "/amadou.jpeg?height=80&width=80",
    rating: 5,
    text: "The subscription service is so convenient. I never have to worry about running out, and the quality is consistently excellent.",
    product: "all",
  },
];
