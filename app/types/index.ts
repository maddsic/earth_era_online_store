export interface ProductSectionProps {
  _id: "string";
  title: "string";
  description: "stirng";
  slug: "string";
  color: "string";
  imageUrl: "string";
}

export interface ProductCardProps {
  title: string;
  description: string;
  slug: string;
  color: string;
  imageUrl: string;
}

interface slides {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export interface HeroSliderProps {
  sliderData: slides[];
}
