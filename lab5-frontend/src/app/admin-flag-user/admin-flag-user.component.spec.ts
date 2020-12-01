import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlagUserComponent } from './admin-flag-user.component';

describe('AdminFlagUserComponent', () => {
  let component: AdminFlagUserComponent;
  let fixture: ComponentFixture<AdminFlagUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlagUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFlagUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
