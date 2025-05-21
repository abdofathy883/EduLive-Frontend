export interface NewCourse {
  title: string;
  categoryId: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  nuOfLessons: number;
  courseImage: File;
  instructorId: string;
  certificateSerialNumber: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
}
