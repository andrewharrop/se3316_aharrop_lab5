import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedSearchComponent } from './unauthenticated-search.component';

describe('UnauthenticatedSearchComponent', () => {
  let component: UnauthenticatedSearchComponent;
  let fixture: ComponentFixture<UnauthenticatedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
