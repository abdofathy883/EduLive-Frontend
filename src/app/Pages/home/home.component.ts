import { Component } from '@angular/core';
import { CourseCarouselComponent } from "../../Components/course-carousel/course-carousel.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CourseCarouselComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
