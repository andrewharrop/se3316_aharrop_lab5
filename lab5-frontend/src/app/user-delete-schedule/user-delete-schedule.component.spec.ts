import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteScheduleComponent } from './user-delete-schedule.component';

describe('UserDeleteScheduleComponent', () => {
  let component: UserDeleteScheduleComponent;
  let fixture: ComponentFixture<UserDeleteScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDeleteScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
