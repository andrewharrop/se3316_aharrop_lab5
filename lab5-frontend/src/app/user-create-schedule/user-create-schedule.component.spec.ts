import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateScheduleComponent } from './user-create-schedule.component';

describe('UserCreateScheduleComponent', () => {
  let component: UserCreateScheduleComponent;
  let fixture: ComponentFixture<UserCreateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
