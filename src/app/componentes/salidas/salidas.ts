import { Component, inject, signal, computed } from '@angular/core';
import { SalidaFormulario } from './salida-formulario/salida-formulario';
import { SalidaService } from '../../servicios/salida';
import { ProductoService } from '../../servicios/producto';
import { Salida } from '../../modelos/salida';

@Component({
  selector: 'app-salidas',
  standalone: true,
  imports: [SalidaFormulario],
  templateUrl: './salidas.html',
  styleUrl: './salidas.css',
})
export class Salidas {

  private salidaServ = inject(SalidaService);
  private productoServ = inject(ProductoService);

  salidas = this.salidaServ.obtenerSalidas();
  productos = this.productoServ.obtenerProductos();

  salidasActivas = computed(() =>
    this.salidas().filter(s => s.activo)
  );

  modalVisible = signal(false);
  modo = signal('Nueva Salida');

  salidaActual = signal<Salida>({
    id: 0,
    productoId: 1,
    cliente: '',
    precioVenta: 0,
    cantidad: 0,
    activo: true
  });

  getProductoNombre(id: number): string {
    const p = this.productos().find(x => x.id === id);
    return p ? p.nombre : '';
  }

  abrirNueva() {
    const prod = this.productos()[0];

    this.salidaActual.set({
      id: 0,
      productoId: prod.id,
      cliente: '',
      precioVenta: prod.precioVenta,
      cantidad: 0,
      activo: true
    });

    this.modo.set('Nueva Salida');
    this.modalVisible.set(true);
  }

  editar(s: Salida) {
    this.salidaActual.set({ ...s });
    this.modo.set('Editar Salida');
    this.modalVisible.set(true);
  }

  borrar(id: number) {
    if (confirm("¿Borrar esta salida?"))
      this.salidaServ.borrarSalida(id);
  }

  guardarSalida(s: Salida) {
    if (s.id === 0) this.salidaServ.agregarSalida(s);
    else this.salidaServ.editarSalida(s);

    this.modalVisible.set(false);
  }
}
