import { Injectable, signal, Signal } from '@angular/core';
import { Entrada } from '../modelos/entrada';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private entradasSignal = signal<Entrada[]>([
    { id: 1, productoId: 1, almacen: 'Principal', precioCompra: 1.20, cantidad: 50, activo: true },
    { id: 2, productoId: 5, almacen: 'Principal', precioCompra: 3.00, cantidad: 20, activo: true },
    { id: 3, productoId: 7, almacen: 'Secundario', precioCompra: 4.00, cantidad: 15, activo: true },
    { id: 4, productoId: 10, almacen: 'Principal', precioCompra: 1.50, cantidad: 30, activo: true },
    { id: 5, productoId: 11, almacen: 'Principal', precioCompra: 8.00, cantidad: 10, activo: true },
    { id: 6, productoId: 14, almacen: 'Secundario', precioCompra: 0.90, cantidad: 25, activo: true },
    { id: 7, productoId: 16, almacen: 'Principal', precioCompra: 5.00, cantidad: 12, activo: true },
    { id: 8, productoId: 18, almacen: 'Principal', precioCompra: 6.50, cantidad: 8, activo: true },
    { id: 9, productoId: 20, almacen: 'Secundario', precioCompra: 3.50, cantidad: 18, activo: true },
    { id: 10, productoId: 13, almacen: 'Principal', precioCompra: 1.10, cantidad: 40, activo: true },
     ]);

  obtenerEntradas(): Signal<Entrada[]> {
    return this.entradasSignal;
  }

  agregarEntrada(e: Entrada) {
    const lista = [...this.entradasSignal()];
    e.id = lista.length + 1;
    lista.push(e);
    this.entradasSignal.set(lista);
  }

  editarEntrada(e: Entrada) {
    this.entradasSignal.update(lista =>
      lista.map(x => x.id === e.id ? e : x)
    );
  }

  borrarEntrada(id: number) {
    this.entradasSignal.update(lista =>
      lista.map(x => x.id === id ? { ...x, activo: false } : x)
    );
  }

 
  getTotalEntradas(idProducto: number): number {
    return this.entradasSignal()
      .filter(e => e.productoId === idProducto && e.activo)
      .reduce((total, e) => total + e.cantidad, 0);
  }
}
