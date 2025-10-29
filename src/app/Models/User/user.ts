export interface RegisterStudent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
}

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
  bio?: string;
}

export interface TokenPayload {
  exp: number;
  sub: string;
  role: string;
  [key: string]: any;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: Date;
  bio?: string;
  CV?: string;
  introVideo?: string;
  message?: string;
  isAuthenticated: boolean;
  roles: string[] | string;
  token: string;
  refreshToken?: string;
  refreshTokenExpiration?: Date;
  isApproved?: boolean;
}
