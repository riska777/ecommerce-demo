import { Component } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-list',
  imports: [SkeletonModule],
  templateUrl: './skeleton-list.component.html',
  styleUrl: './skeleton-list.component.scss'
})
export class SkeletonListComponent {

}
