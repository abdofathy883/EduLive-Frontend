export interface RegisterStudent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
}

// export interface Student extends RegisterStudent {
//   studentId: string;
// }
export interface RegisterInstructor {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  CV: File;
  introVideo: File;
  bio: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  cv?: File;
  introVideo?: File;
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
  concurrencyStamp?: string;
}
