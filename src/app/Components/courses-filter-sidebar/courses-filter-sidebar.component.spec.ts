import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFilterSidebarComponent } from './courses-filter-sidebar.component';

describe('CoursesFilterSidebarComponent', () => {
  let component: CoursesFilterSidebarComponent;
  let fixture: ComponentFixture<CoursesFilterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesFilterSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesFilterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
