import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../servicios/producto';
import { ProductoLinea } from './producto-linea/producto-linea';
import { ProductoFormulario } from './producto-formulario/producto-formulario';
import { Producto } from '../../modelos/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink, ProductoLinea, ProductoFormulario],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {

  servicio = inject(ProductoService);
  productos = this.servicio.obtenerProductos();

  modalVisible = signal(false);

  productoActual = signal<Producto>({
    id: 0,
    nombre: '',
    categoria: '',
    precioCompra: 0,
    precioVenta: 0,
    activo: true
  });

  abrirModalNuevo() {
    this.productoActual.set({
      id: 0,
      nombre: '',
      categoria: '',
      precioCompra: 0,
      precioVenta: 0,
      activo: true
    });
    this.modalVisible.set(true);
  }

  abrirModalEditar(prod: Producto) {
    this.productoActual.set({ ...prod });
    this.modalVisible.set(true);
  }

  cerrarModal() {
    this.modalVisible.set(false);
  }
}
