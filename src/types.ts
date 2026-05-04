export interface Movie {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  year: number;
  rating: number;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  cast: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}
