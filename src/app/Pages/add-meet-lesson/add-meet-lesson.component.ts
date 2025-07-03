import { Component } from '@angular/core';
import { MeetService } from '../../Services/GoogleMeet/meet-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-meet-lesson',
  imports: [],
  templateUrl: './add-meet-lesson.component.html',
  styleUrl: './add-meet-lesson.component.css'
})
export class AddMeetLessonComponent {

  constructor(private meetService: MeetService, private fb: FormBuilder) { }

  onSubmit(meetingData: any) {
    this.meetService.CreateMeetLesson(meetingData).subscribe({
      next: (response) => {
        console.log('Meeting created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating meeting:', error);
      }
    });
  }
}
