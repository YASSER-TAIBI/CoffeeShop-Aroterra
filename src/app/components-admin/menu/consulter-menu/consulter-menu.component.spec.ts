import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMenuComponent } from './consulter-menu.component';

describe('ConsulterMenuComponent', () => {
  let component: ConsulterMenuComponent;
  let fixture: ComponentFixture<ConsulterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
