export interface NewCourse {
  title: string;
  description: string;
  nuOfLessons: number;
  originalPrice: number;
  salePrice: number;
  courseImage: File;
  categoryId: string;
  instructorId: string;
  certificateSerialNumber: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  nuOfLessons: number;
  originalPrice: number;
  salePrice: number;
  image: string;
  categoryId: string;
  categoryName: string;
  instructorId: string;
  instructorName: string;
  certificateSerialNumber?: string; // Optional field
}

export interface CourseReview {
  studentId: string;
  courseId: number;
  rating: number;
  comment: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
}
