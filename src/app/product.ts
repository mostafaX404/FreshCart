export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }
  
  export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Product {
    sold: number;
    images: string[];
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    reviews: any[]; // If you have a specific structure for reviews, you can replace 'any' with that structure
    id: string;
  }
  