import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../../../modelos/producto';
import { ProductoService } from '../../../servicios/producto';

@Component({
  selector: 'tr[producto-linea]',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './producto-linea.html',
  styleUrls: ['./producto-linea.css'],
})
export class ProductoLinea {

  @Input() producto!: Producto;
  @Output() editarProducto = new EventEmitter<Producto>();
  @Output() borrarProducto = new EventEmitter<number>();

  private productoService = inject(ProductoService);

  getStock(): number {
    const stock = this.productoService.calcularStock(this.producto.id);
    return stock < 0 ? 0 : stock;
  }

  onEditar() {
    this.editarProducto.emit(this.producto);
  }

  onBorrar() {
    if (confirm(`¿Seguro que quieres borrar "${this.producto.nombre}"?`)) {
      this.borrarProducto.emit(this.producto.id);
    }
  }
}
