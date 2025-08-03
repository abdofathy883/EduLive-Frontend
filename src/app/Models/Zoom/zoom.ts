export interface ZoomMeeting {
  id: string;
  zoomMeetingId: string;
  topic: string;
  startTime: Date;
  duration: number;
  joinUrl: string;
  startUrl: string;
  password: string;
  courseId: string;
  instructorId: string;
  //specifiy students
}

export interface CreateZoomMeetingRequest {
  topic: string;
  description: string;
  startTime: Date;
  duration: number;
  courseId: string;
  instructorId: string;
}

export interface ZoomUserConnection {
  id?: string;
  userId: string;
  zoomUserId?: string;
  zoomEmail?: string;
  isConnected: boolean;
  url: string;
}

export interface UpdateZoomMeetingRequest {
  zoomMeetingId: string;
  topic: string;
  startTime: Date;
  duration: number;
}
