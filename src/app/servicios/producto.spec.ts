import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto';
import { EntradaService } from './entrada';
import { SalidaService } from './salida';

describe('ProductoService', () => {

  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoService, EntradaService, SalidaService]
    });

    service = TestBed.inject(ProductoService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería calcular stock correctamente', () => {
    const stock = service.calcularStock(1);   
    expect(stock).toBeGreaterThanOrEqual(0);
  });

});
