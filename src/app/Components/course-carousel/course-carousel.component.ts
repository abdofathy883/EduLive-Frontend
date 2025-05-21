import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CoursesService } from '../../Services/Courses/courses.service';
import { NewCourse } from '../../Models/Course/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-carousel',
  imports: [RouterLink],
  templateUrl: './course-carousel.component.html',
  styleUrl: './course-carousel.component.css',
})
export class CourseCarouselComponent implements AfterViewInit, OnInit {
  private courseService = inject(CoursesService);
  @Output() openCourse = new EventEmitter<number>();
  courses: any[] = [];
  // courses = Array.from({ length: 10 }, (_, i) => ({
  //   id: i + 1,
  //   title: `Course Title ${i + 1}`,
  //   category: `Category ${i + 1}`,
  //   lessons: 8,
  //   price: 250,
  //   oldPrice: 350,
  //   image: '/assets/minimalism4.jpg'
  // }));

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((courses) => {
      console.log(courses);
      console.log('Courses:', courses);
      this.courses = courses;
    });
  }
  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation],
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      allowTouchMove: true,
      setWrapperSize: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        968: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // goToCourse(id: number) {
  //   const slug = course.title.toLowerCase().replace(/ /g, '-');
  //   this.router.navigate(['/courses', slug]);
  //   this.openCourse.emit(id);
  // }
}
