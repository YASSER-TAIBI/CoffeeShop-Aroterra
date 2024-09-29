import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisTestimonialComponent } from './avis-testimonial.component';

describe('AvisTestimonialComponent', () => {
  let component: AvisTestimonialComponent;
  let fixture: ComponentFixture<AvisTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisTestimonialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvisTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
