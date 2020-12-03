import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangeScheduleNameComponent } from './user-change-schedule-name.component';

describe('UserChangeScheduleNameComponent', () => {
  let component: UserChangeScheduleNameComponent;
  let fixture: ComponentFixture<UserChangeScheduleNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChangeScheduleNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangeScheduleNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
