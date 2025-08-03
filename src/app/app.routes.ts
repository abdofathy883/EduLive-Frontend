import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { MyAccountComponent } from './Pages/my-account/my-account.component';
import { BlogComponent } from './Pages/blog/blog.component';
import { AllCoursesComponent } from './Pages/all-courses/all-courses.component';
import { authGGuard } from './Core/Guards/auth-g.guard';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { CareersComponent } from './Pages/careers/careers.component';
import { AddCourseComponent } from './Pages/add-course/add-course.component';
import { ChatComponent } from './Pages/chat/chat.component';
import { ProfileSettingsComponent } from './Pages/profile-settings/profile-settings.component';
import { SingleCourseComponent } from './Pages/single-course/single-course.component';
import { InstructorAccountComponent } from './Pages/instructor-account/instructor-account.component';
import { AddZoomLessonComponent } from './Pages/add-zoom-lesson/add-zoom-lesson.component';
import { LessonReportComponent } from './Components/lesson-report/lesson-report.component';
import { UpdateUserComponent } from './Pages/update-user/update-user.component';
import { AllLessonsComponent } from './Components/all-lessons/all-lessons.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [authGGuard],
    
  },
  {
    path: 'instructor-account',
    component: InstructorAccountComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'lesson-reports', component: LessonReportComponent },
      { path: 'lessons', component: AllLessonsComponent },
      { path: 'messages', component: ChatComponent },
      { path: 'update-account', component: UpdateUserComponent },
      { path: 'add-course', component: AddCourseComponent },
      // { path: 'add-lesson', component: AddLessonComponent }
    ]
  },
  {
    path: 'add-zoom-lesson',
    component: AddZoomLessonComponent
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'courses',
    component: AllCoursesComponent,
    // children: [
    //     {
    //         path: 'single-course/:id',
    //         component: SingleCourseComponent
    //     }
    // ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'careers',
    component: CareersComponent,
  },
  {
    path: 'single-course/:id',
    component: SingleCourseComponent,
  },
];
