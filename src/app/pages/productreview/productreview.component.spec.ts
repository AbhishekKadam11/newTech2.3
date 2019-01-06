import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewComponent } from './productreview.component';

describe('ProductreviewComponent', () => {
  let component: ProductreviewComponent;
  let fixture: ComponentFixture<ProductreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
