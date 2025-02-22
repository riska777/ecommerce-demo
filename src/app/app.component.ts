import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);

    this.primeng.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: '.app-dark',
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });
  }
}
