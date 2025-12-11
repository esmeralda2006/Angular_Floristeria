import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Entrada } from '../../../modelos/entrada';
import { ProductoService } from '../../../servicios/producto';

@Component({
  selector: 'entrada-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './entrada-formulario.html',
  styleUrl: './entrada-formulario.css'
})
export class EntradaFormulario {

  @Input() entrada!: Entrada;
  @Input() modo: string = 'Nueva Entrada';

  @Output() guardarEvento = new EventEmitter<Entrada>();
  @Output() cerrarEvento = new EventEmitter<void>();

  productos = inject(ProductoService).obtenerProductos();

  // ✔ Actualiza precioCompra automáticamente
  actualizarPrecioCompra() {
    const prod = this.productos().find(p => p.id === this.entrada.productoId);
    if (prod) {
      this.entrada.precioCompra = prod.precioCompra;
    }
  }

  guardar() {
    this.guardarEvento.emit(this.entrada);
  }

  cerrar() {
    this.cerrarEvento.emit();
  }
}
