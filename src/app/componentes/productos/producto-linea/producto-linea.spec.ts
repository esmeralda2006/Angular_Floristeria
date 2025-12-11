import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoLinea } from './producto-linea';

describe('ProductoLinea', () => {
  let component: ProductoLinea;
  let fixture: ComponentFixture<ProductoLinea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoLinea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoLinea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
