declare namespace NodeJS {
  interface ProcessEnv {
    PG_HOST: string;
    PG_PORT: string;
    PG_USER: string;
    PG_PASSWORD: string;
    PG_DATABASE: string;
  }
}

type rating = 0 | 1 | 2 | 3 | 4 | 5;

interface generalBathroomList {
  id: number;
  location: string;
  review_text: string;
  created_at: Date;
  name: string;
  lat: number;
  lng: number;
  cleanliness_rating: rating;
  is_closed: boolean;
}

interface generalBathroomItem {
  id: number;
  location: string;
  review_text: string;
  created_at: Date;
  name: string;
  lat: number;
  lng: number;
  cleanliness_rating: rating;
  safety_rating: rating;
  accessibility_rating: rating;
  facilities_rating: rating;
  functionality_rating: rating;
  maintenance_rating: rating;
  is_closed: boolean;
}

interface insertBathroomReview {
  location: string;
  review_text: string;
  name: string;
  lat: number;
  lng: number;
  cleanliness_rating: rating;
  safety_rating: rating;
  accessibility_rating: rating;
  facilities_rating: rating;
  functionality_rating: rating;
  maintenance_rating: rating;
  is_closed: boolean;
}

interface insertBathroomComment {
  bathroom_id: number;
  name: string;
  comment_text: string;
  cleanliness_rating: rating;
  safety_rating: rating;
  accessibility_rating: rating;
  facilities_rating: rating;
  functionality_rating: rating;
  maintenance_rating: rating;
  is_closed: boolean;
}
