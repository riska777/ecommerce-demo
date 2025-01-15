import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuItems = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Products',
      url: '/products',
    },
    {
      label: 'Cart',
      url: '/cart',
    },
  ];
}
