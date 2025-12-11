import { Routes } from '@angular/router';

// Importación directa de Standalone Components
import { Home } from './componentes/home/home';
import { Productos } from './componentes/productos/productos';
import { Entradas } from './componentes/entradas/entradas';
import { Salidas } from './componentes/salidas/salidas';

export const routes: Routes = [

  // Página principal
  {
    path: '',
    component: Home
  },

  // Gestión de productos
  {
    path: 'productos',
    component: Productos
  },

  // Ver almacén (lazy loading del componente)
  {
    path: 'almacen',
    loadComponent: () =>
      import('./componentes/almacen/almacen')
        .then(m => m.Almacen)
  },

  // Entradas del almacén
  {
    path: 'entradas',
    component: Entradas
  },

  // Salidas del almacén
  {
    path: 'salidas',
    component: Salidas
  },

  // Cualquier ruta no válida
  {
    path: '**',
    redirectTo: ''
  }
];
