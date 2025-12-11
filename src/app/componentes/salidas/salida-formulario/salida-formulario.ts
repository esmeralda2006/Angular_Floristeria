import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Salida } from '../../../modelos/salida';
import { ProductoService } from '../../../servicios/producto';

@Component({
  selector: 'salida-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './salida-formulario.html',
  styleUrl: './salida-formulario.css'
})
export class SalidaFormulario {

  @Input() salida!: Salida;
  @Input() modo: string = 'Nueva Salida';

  @Output() guardarEvento = new EventEmitter<Salida>();
  @Output() cerrarEvento = new EventEmitter<void>();

  productos = inject(ProductoService).obtenerProductos();
  private productoServ = inject(ProductoService);

  actualizarPrecioVenta() {
    const prod = this.productos().find(p => p.id === this.salida.productoId);
    if (prod) this.salida.precioVenta = prod.precioVenta;
  }

  guardar() {

    const stockActual = this.productoServ.calcularStock(this.salida.productoId);

    // ❌ Stock insuficiente
    if (stockActual <= 0) {
      alert("❌ No puedes realizar esta venta. El producto no tiene stock disponible.");
      return;
    }

    if (this.salida.cantidad > stockActual) {
      alert(`❌ No puedes vender ${this.salida.cantidad} unidades. Stock disponible: ${stockActual}`);
      return;
    }

    // ✔ Venta válida
    this.guardarEvento.emit(this.salida);
  }

  cerrar() {
    this.cerrarEvento.emit();
  }
}
