import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoFormulario } from './producto-formulario';

describe('ProductoFormulario', () => {
  let component: ProductoFormulario;
  let fixture: ComponentFixture<ProductoFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoFormulario);
    component = fixture.componentInstance;

    // Simulamos un producto de entrada
    component.producto = {
      id: 0,
      nombre: '',
      categoria: '',
      precioCompra: 0,
      precioVenta: 0,
      activo: true
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

