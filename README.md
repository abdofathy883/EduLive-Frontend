# EduLive – Angular Frontend for Live E-Learning Platform

EduLive is a feature-rich Angular application designed to deliver **live instructor-led online education**. It connects instructors and students in real-time for scheduled learning sessions with chat, lesson management, and certificate access.

---

## 🧠 Project Overview

EduLive provides a responsive and interactive user interface that complements the backend services. Students can browse lessons, join real-time classes, and receive certificates, while instructors manage schedules, content, and learners.

The frontend focuses on:
- Real-time interaction
- Role-based dashboards
- Dynamic lesson and course management
- Seamless calendar-based scheduling UX

---

## 💡 Business Idea

EduLive meets the demand for synchronous learning experiences by offering:
- Instructors the tools to create and deliver live sessions
- Students an intuitive portal to access lessons, join live meetings, and view achievements
- A centralized platform that adapts to both desktop and mobile environments

---

## 🚀 Key Features

- **Role-Based Authentication**: JWT login with route guards for admin, instructor, and student roles
- **Live Class Integration**: Google Meet and Zoom meeting links displayed per-schedule
- **Real-Time Chat**: Integrated SignalR-based chat system scoped by session or course
- **Course & Lesson Browsing**: Filtered views per role with dynamic rendering and pagination
- **Certificate Viewer**: Student-side UI to access and download earned certificates (PDF)
- **Image Upload**: Instructors can upload lesson/course images, which are processed by the backend into `.webp`
- **Responsive UI**: Designed with Bootstrap 5 for mobile and desktop compatibility
- **Error Handling & Feedback**: Toasts, loaders, and graceful fallback flows for common failure states

---

## 🧱 Architecture & Project Structure

EduLive uses a modular component structure with lazy loading and service-driven state:

### 🧩 Modules

- `AuthModule`: Login, register, JWT decoding
- `DashboardModule`: Student/instructor layouts, shared shell
- `CoursesModule`: Course listing, detail view, lesson components
- `ChatModule`: SignalR-based real-time messaging interface
- `CertificatesModule`: Certificate viewer and download
- `AdminModule`: Admin-specific UI if applicable
- `SharedModule`: Reusable components, and guards

### 🛠️ Services

- `AuthService`: Handles login, token storage, user state
- `ApiService`: Generic wrapper for API calls with interceptors
- `ChatService`: SignalR connection manager for live chat
- `UploadService`: Image file submission to backend API
- `NotificationService`: Toast system for UX feedback

---

## 🔧 Technology Stack

| Category        | Technology              |
|----------------|--------------------------|
| Framework       | Angular 19              |
| Language        | TypeScript              |
| UI              | Bootstrap 5             |
| HTTP            | Angular HttpClient      |
| Auth            | JWT + Role Guards       |
| Real-Time Chat  | SignalR Client          |
| State/UX        | RxJS, Reactive Forms    |
| Routing         | Angular Router (lazy)   |

---

## 🗂️ Repository

- 🔗 [Backend Repository](https://github.com/abdofathy883/EduLive-Backend)

---

## 🚧 Deployment Status

⚠️ Project is complete and locally tested. Deployment pending due to:
- VPS and domain provisioning from client side
- SSL certificate required for full Zoom integration
- Production environment setup

---

## 📄 License

This project is open for prototyping purposes. For commercial use, contact the maintainer.
