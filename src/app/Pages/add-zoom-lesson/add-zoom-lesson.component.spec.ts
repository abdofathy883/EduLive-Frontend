import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZoomLessonComponent } from './add-zoom-lesson.component';

describe('AddZoomLessonComponent', () => {
  let component: AddZoomLessonComponent;
  let fixture: ComponentFixture<AddZoomLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddZoomLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddZoomLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
