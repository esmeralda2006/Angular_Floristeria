import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../modelos/producto';
import { ProductoService } from '../../../servicios/producto';

@Component({
  selector: 'producto-formulario',
  standalone: true,
  imports: [FormsModule],
  // uso de template inline para evitar errores con templateUrl
  template: `
  <div class="modal-fondo">
    <div class="modal">

      <h2>{{ modo }}</h2>

      <form (ngSubmit)="guardar()">

        <!-- NOMBRE -->
        <label>Nombre</label>
        <input [(ngModel)]="producto.nombre" name="nombre" required>

        <!-- CATEGORÍA -->
        <label>Categoría</label>
        <input [(ngModel)]="producto.categoria" name="categoria" required>

        <!-- PRECIO COMPRA -->
        <label>Precio Compra</label>
        <input type="number" [(ngModel)]="producto.precioCompra" name="precioCompra" required>

        <!-- PRECIO VENTA -->
        <label>Precio Venta</label>
        <input type="number" [(ngModel)]="producto.precioVenta" name="precioVenta" required>

        <div class="acciones">
          <button type="submit" class="btn-guardar">Guardar</button>
          <button type="button" class="btn-cancelar" (click)="cerrar()">Cancelar</button>
        </div>

      </form>

    </div>
  </div>
  `,
  // puedes seguir usando el archivo CSS externo si quieres
  styleUrls: ['./producto-formulario.css']
})
export class ProductoFormulario {

  @Input() producto!: Producto;
  @Input() modo: string = 'Nuevo Producto';

  @Output() cerrarModal = new EventEmitter<void>();

  private servicio = inject(ProductoService);

  guardar() {
    if (!this.producto) return;

    if (this.producto.id === 0) {
      this.producto.activo = true;
      this.servicio.agregarProducto(this.producto);
    } else {
      this.servicio.editarProducto(this.producto);
    }
    this.cerrarModal.emit();
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
