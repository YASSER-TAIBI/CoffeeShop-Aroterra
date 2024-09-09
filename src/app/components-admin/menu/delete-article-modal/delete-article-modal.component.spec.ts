import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArticleModalComponent } from './delete-article-modal.component';

describe('DeleteArticleModalComponent', () => {
  let component: DeleteArticleModalComponent;
  let fixture: ComponentFixture<DeleteArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteArticleModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
