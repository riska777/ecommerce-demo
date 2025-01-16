import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [BadgeModule, MenubarModule, RippleModule, OverlayBadgeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(readonly cartService: CartService) {}

  menuItems = [
    {
      label: 'Home',
      routerLink: '/',
    },
    {
      label: 'Products',
      routerLink: '/products',
    },
/*     {
      label: 'Cart',
      routerLink: '/cart',
    }, */
  ];
}
