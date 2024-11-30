import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialClientComponent } from './testimonial-client.component';

describe('TestimonialClientComponent', () => {
  let component: TestimonialClientComponent;
  let fixture: ComponentFixture<TestimonialClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
