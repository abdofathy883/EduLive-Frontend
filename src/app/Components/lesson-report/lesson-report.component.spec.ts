import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonReportComponent } from './lesson-report.component';

describe('LessonReportComponent', () => {
  let component: LessonReportComponent;
  let fixture: ComponentFixture<LessonReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
