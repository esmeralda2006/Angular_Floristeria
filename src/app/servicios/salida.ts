import { Injectable, signal, Signal } from '@angular/core';
import { Salida } from '../modelos/salida';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  private salidasSignal = signal<Salida[]>([
    { id: 1, productoId: 1, cliente: 'Juan Perez', precioVenta: 2.50, cantidad: 10, activo: true },
    { id: 2, productoId: 5, cliente: 'Maria Lopez', precioVenta: 6.00, cantidad: 5, activo: true },
    { id: 3, productoId: 10, cliente: 'Carlos Ruiz', precioVenta: 4.00, cantidad: 7, activo: true },
    { id: 4, productoId: 11, cliente: 'Empresa Jardines SRL', precioVenta: 15.00, cantidad: 3, activo: true },
    { id: 5, productoId: 14, cliente: 'Ana Morales', precioVenta: 2.10, cantidad: 12, activo: true },
    { id: 6, productoId: 16, cliente: 'Pedro Gómez', precioVenta: 12.00, cantidad: 4, activo: true },
    { id: 7, productoId: 18, cliente: 'Floristería Luz', precioVenta: 14.00, cantidad: 2, activo: true },
    { id: 8, productoId: 20, cliente: 'Lucia Herrera', precioVenta: 8.00, cantidad: 6, activo: true },
    { id: 9, productoId: 19, cliente: 'Eventos Rosa', precioVenta: 9.50, cantidad: 10, activo: true },
    { id: 10, productoId: 13, cliente: 'David Torres', precioVenta: 2.30, cantidad: 15, activo: true },
     ]);

  obtenerSalidas(): Signal<Salida[]> {
    return this.salidasSignal;
  }

  agregarSalida(s: Salida) {
    const lista = [...this.salidasSignal()];
    s.id = lista.length + 1;
    lista.push(s);
    this.salidasSignal.set(lista);
  }

  editarSalida(s: Salida) {
    this.salidasSignal.update(lista =>
      lista.map(x => x.id === s.id ? s : x)
    );
  }

  borrarSalida(id: number) {
    this.salidasSignal.update(lista =>
      lista.map(x => x.id === id ? { ...x, activo: false } : x)
    );
  }

  //  TOTAL DE SALIDAS ACTIVAS PARA UN PRODUCTO
  getTotalSalidas(idProducto: number): number {
    return this.salidasSignal()
      .filter(s => s.productoId === idProducto && s.activo)
      .reduce((total, s) => total + s.cantidad, 0);
  }
}
