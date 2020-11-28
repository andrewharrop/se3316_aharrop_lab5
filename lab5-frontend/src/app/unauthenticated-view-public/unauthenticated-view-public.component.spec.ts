import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedViewPublicComponent } from './unauthenticated-view-public.component';

describe('UnauthenticatedViewPublicComponent', () => {
  let component: UnauthenticatedViewPublicComponent;
  let fixture: ComponentFixture<UnauthenticatedViewPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedViewPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedViewPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
