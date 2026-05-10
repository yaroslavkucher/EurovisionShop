import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/catalog/catalog.component')
            .then(m => m.CatalogComponent)
      },

      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component')
            .then(m => m.CartComponent)
      }
    ]
  }
];
