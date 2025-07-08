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
