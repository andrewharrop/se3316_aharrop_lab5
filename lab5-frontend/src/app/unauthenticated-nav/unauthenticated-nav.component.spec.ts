import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedNavComponent } from './unauthenticated-nav.component';

describe('UnauthenticatedNavComponent', () => {
  let component: UnauthenticatedNavComponent;
  let fixture: ComponentFixture<UnauthenticatedNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
