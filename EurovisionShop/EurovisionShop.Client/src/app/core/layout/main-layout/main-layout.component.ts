import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  readonly cartService = inject(CartService);

}
