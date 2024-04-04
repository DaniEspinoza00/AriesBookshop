import { Component } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

}
