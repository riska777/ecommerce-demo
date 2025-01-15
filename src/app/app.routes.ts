import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./main/main.component').then((m) => m.MainComponent),
      },
      {
        path: 'products',
        pathMatch: 'full',
        loadComponent: () =>
          import('./products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'cart',
        pathMatch: 'full',
        loadComponent: () =>
          import('./cart/cart.component').then((m) => m.CartComponent),
      },
    ],
  },
];
