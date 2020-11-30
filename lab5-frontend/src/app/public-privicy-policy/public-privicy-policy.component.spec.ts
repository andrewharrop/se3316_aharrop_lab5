import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPrivicyPolicyComponent } from './public-privicy-policy.component';

describe('PublicPrivicyPolicyComponent', () => {
  let component: PublicPrivicyPolicyComponent;
  let fixture: ComponentFixture<PublicPrivicyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPrivicyPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPrivicyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
