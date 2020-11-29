import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddToScheduleComponent } from './user-add-to-schedule.component';

describe('UserAddToScheduleComponent', () => {
  let component: UserAddToScheduleComponent;
  let fixture: ComponentFixture<UserAddToScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddToScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddToScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
