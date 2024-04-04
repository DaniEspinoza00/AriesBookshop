import { CartService } from './../../services/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 
  total:number=0;
  productList:Product[]=[];
  private CartService=inject(CartService);


  ngOnInit(): void {
    this.CartService.products
    .pipe(map(products=>{
      return products.reduce((prev, curr) => prev + (curr.subtotal || 0), 0);
    }))
    .subscribe(val=>{
      this.total=val;
    })
    this.CartService.products.subscribe(products =>{
      this.productList=products;
      console.log(this.productList);
    })
  }
  eliminateItem(item:Product){
    this.CartService.eliminateProduct(item);
    this.ngOnInit();
  }
  addItem(item:Product){
    this.CartService.addNewProduct(item);
    this.ngOnInit();
  }
  

}


