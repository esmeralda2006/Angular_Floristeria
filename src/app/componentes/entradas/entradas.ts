import { Component, inject, signal, computed } from '@angular/core';
import { EntradaService } from '../../servicios/entrada';
import { ProductoService } from '../../servicios/producto';
import { Entrada } from '../../modelos/entrada';
import { EntradaFormulario } from './entrada-formulario/entrada-formulario';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [EntradaFormulario],
  templateUrl: './entradas.html',
  styleUrl: './entradas.css',
})
export class Entradas {

  private entradaServ = inject(EntradaService);
  private productoServ = inject(ProductoService);

  entradas = this.entradaServ.obtenerEntradas();
  productos = this.productoServ.obtenerProductos();

  entradasActivas = computed(() =>
    this.entradas().filter(e => e.activo)
  );

  modalVisible = signal(false);
  modo = signal('Nueva Entrada');

  entradaActual = signal<Entrada>({
    id: 0,
    productoId: 1,
    almacen: '',
    precioCompra: 0,
    cantidad: 0,
    activo: true
  });

  // ✔ NECESARIO: No se puede hacer find en el template en Angular 20
  getProductoNombre(id: number): string {
    const p = this.productos().find(x => x.id === id);
    return p ? p.nombre : '';
  }

  abrirNueva() {
    const p = this.productos()[0];

    this.entradaActual.set({
      id: 0,
      productoId: p.id,
      almacen: '',
      precioCompra: p.precioCompra, // ✔ auto relleno
      cantidad: 0,
      activo: true
    });

    this.modo.set('Nueva Entrada');
    this.modalVisible.set(true);
  }

  editar(e: Entrada) {
    this.entradaActual.set({ ...e });
    this.modo.set('Editar Entrada');
    this.modalVisible.set(true);
  }

  borrar(id: number) {
    if (confirm("¿Borrar esta entrada?"))
      this.entradaServ.borrarEntrada(id);
  }

  guardarEntrada(e: Entrada) {
    if (e.id === 0) this.entradaServ.agregarEntrada(e);
    else this.entradaServ.editarEntrada(e);

    this.modalVisible.set(false);
  }
}
