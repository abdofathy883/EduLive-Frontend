import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetLessonComponent } from './add-meet-lesson.component';

describe('AddMeetLessonComponent', () => {
  let component: AddMeetLessonComponent;
  let fixture: ComponentFixture<AddMeetLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMeetLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeetLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
