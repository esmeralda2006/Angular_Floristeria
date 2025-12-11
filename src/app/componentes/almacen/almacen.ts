import { Component, inject, computed } from '@angular/core';
import { ProductoService } from '../../servicios/producto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './almacen.html',
  styleUrl: './almacen.css'
})
export class Almacen {

  private productoServ = inject(ProductoService);

  productos = this.productoServ.obtenerProductos();

  categoriasMap = computed(() => {
    const grupos: Record<string, any[]> = {};

    this.productos().forEach(p => {
      if (!grupos[p.categoria]) grupos[p.categoria] = [];
      grupos[p.categoria].push(p);
    });

    return grupos;
  });

  categoriasLista = computed(() => Object.keys(this.categoriasMap()));

  // 👉 Obtener stock real (entradas - salidas)
  stockReal(id: number): number {
    return this.productoServ.calcularStock(id);
  }

  // Estados visuales
  estado(stock: number): "sin" | "bajo" | "ok" {
    if (stock <= 0) return "sin";
    if (stock < 3) return "bajo";
    return "ok";
  }

  estadoTexto(stock: number): string {
    if (stock <= 0) return "❌ Sin stock";
    if (stock < 3) return "⚠ Bajo stock";
    return "✔ Disponible";
  }

}
