import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsAdminComponent } from './components-admin.component';

describe('ComponentsAdminComponent', () => {
  let component: ComponentsAdminComponent;
  let fixture: ComponentFixture<ComponentsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
