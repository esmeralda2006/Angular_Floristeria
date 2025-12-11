import { Injectable, signal, Signal, inject } from '@angular/core';
import { Producto } from '../modelos/producto';
import { EntradaService } from './entrada';
import { SalidaService } from './salida';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private entradaServ = inject(EntradaService);
  private salidaServ = inject(SalidaService);

  private productosSignal = signal<Producto[]>([
     { id: 1, nombre: 'Rosa Roja', categoria: 'Flores', precioCompra: 1, precioVenta: 2.5, activo: true },
  { id: 2, nombre: 'Tulipán Amarillo', categoria: 'Flores', precioCompra: 0.8, precioVenta: 2, activo: true },
  { id: 3, nombre: 'Maceta Cerámica', categoria: 'Macetas', precioCompra: 3, precioVenta: 6.5, activo: true },
  { id: 4, nombre: 'Abono Universal', categoria: 'Abonos', precioCompra: 2.2, precioVenta: 5, activo: true },
  { id: 5, nombre: 'Orquídea Blanca', categoria: 'Flores', precioCompra: 3, precioVenta: 6, activo: true },
  { id: 6, nombre: 'Bonsái Japonés', categoria: 'Plantas', precioCompra: 12, precioVenta: 25, activo: true },
  { id: 7, nombre: 'Sustrato Premium 10kg', categoria: 'Abonos', precioCompra: 4, precioVenta: 9, activo: true },
  { id: 8, nombre: 'Maceta Plástica 20cm', categoria: 'Macetas', precioCompra: 1.2, precioVenta: 3, activo: true },
  { id: 9, nombre: 'Maceta de Barro 30cm', categoria: 'Macetas', precioCompra: 2.5, precioVenta: 6, activo: true },
  { id: 10, nombre: 'Cactus Esférico', categoria: 'Plantas', precioCompra: 1.5, precioVenta: 4, activo: true },
  { id: 11, nombre: 'Ficus Lyrata', categoria: 'Plantas', precioCompra: 8, precioVenta: 15, activo: true },
  { id: 12, nombre: 'Fertilizante Líquido 1L', categoria: 'Abonos', precioCompra: 2.8, precioVenta: 6, activo: true },
  { id: 13, nombre: 'Rosa Blanca', categoria: 'Flores', precioCompra: 1.1, precioVenta: 2.3, activo: true },
  { id: 14, nombre: 'Tulipán Rojo', categoria: 'Flores', precioCompra: 0.9, precioVenta: 2.1, activo: true },
  { id: 15, nombre: 'Semillas de Césped 1kg', categoria: 'Semillas', precioCompra: 3.2, precioVenta: 7, activo: true },
  { id: 16, nombre: 'Tierra Vegetal 20kg', categoria: 'Abonos', precioCompra: 5, precioVenta: 12, activo: true },
  { id: 17, nombre: 'Palmera Enana', categoria: 'Plantas', precioCompra: 10, precioVenta: 22, activo: true },
  { id: 18, nombre: 'Regadera Metálica', categoria: 'Accesorios', precioCompra: 6.5, precioVenta: 14, activo: true },
  { id: 19, nombre: 'Rosas Mixtas Ramo 12u', categoria: 'Flores', precioCompra: 4, precioVenta: 9.5, activo: true },
  { id: 20, nombre: 'Arbusto Lavanda', categoria: 'Plantas', precioCompra: 3.5, precioVenta: 8, activo: true },
]);

  obtenerProductos(): Signal<Producto[]> {
    return this.productosSignal;
  }

  agregarProducto(prod: Producto) {
    prod.id = this.productosSignal().length + 1;
    prod.activo = true;
    this.productosSignal.update(lista => [...lista, prod]);
  }

  editarProducto(prod: Producto) {
    this.productosSignal.update(lista =>
      lista.map(p => p.id === prod.id ? prod : p)
    );
  }

  borrarProducto(id: number) {
    this.productosSignal.update(lista =>
      lista.map(p => p.id === id ? { ...p, activo: false } : p)
    );
  }

  // ----------------------------------------------------
  //  CALCULAR STOCK REAL = entradas - salidas
  // ----------------------------------------------------
  calcularStock(productoId: number): number {

    const entradas = this.entradaServ.obtenerEntradas()()
      .filter(e => e.productoId === productoId && e.activo)
      .reduce((sum, e) => sum + e.cantidad, 0);

    const salidas = this.salidaServ.obtenerSalidas()()
      .filter(s => s.productoId === productoId && s.activo)
      .reduce((sum, s) => sum + s.cantidad, 0);

    const stock = entradas - salidas;

    return stock < 0 ? 0 : stock; //  Nunca negativo
  }

  // ----------------------------------------------------
  // Validar si puedo vender (cantidad ≤ stock)
  // ----------------------------------------------------
  hayStock(productoId: number, cantidad: number): boolean {
    return this.calcularStock(productoId) >= cantidad;
  }
}
