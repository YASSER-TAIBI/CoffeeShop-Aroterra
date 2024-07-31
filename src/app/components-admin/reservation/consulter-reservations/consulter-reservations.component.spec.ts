import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterReservationsComponent } from './consulter-reservations.component';

describe('ConsulterReservationsComponent', () => {
  let component: ConsulterReservationsComponent;
  let fixture: ComponentFixture<ConsulterReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
