import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-header',
  imports: [BadgeModule, MenubarModule, RippleModule, OverlayBadgeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(readonly storeService: StoreService) {}

  menuItems = [
    {
      label: 'Home',
      routerLink: '/',
    },
    {
      label: 'Products',
      routerLink: '/products',
    }
  ];
}
