import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverTableComponent } from './reserver-table.component';

describe('ReserverTableComponent', () => {
  let component: ReserverTableComponent;
  let fixture: ComponentFixture<ReserverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserverTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
