import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManageScheduleComponent } from './users-manage-schedule.component';

describe('UsersManageScheduleComponent', () => {
  let component: UsersManageScheduleComponent;
  let fixture: ComponentFixture<UsersManageScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManageScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManageScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
