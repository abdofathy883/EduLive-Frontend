export interface RegisterStudent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

export interface Student extends RegisterStudent {
  studentId: string;
}
export interface RegisterInstructor {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  bio: string;
  CV: File;
  introVideo: File;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  isAuthenticated: boolean;
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[] | string;
  dateOfBirth?: Date;
  phoneNumber: string;
  bio?: string;
  CV?: string;
  introVideo?: string;
  token: string;
  message?: string;
  refreshToken?: string;
  refreshTokenExpiration?: Date;
}
