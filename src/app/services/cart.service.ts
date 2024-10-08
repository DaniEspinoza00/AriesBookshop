import { Product } from './../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: Product[] = [];
  private product: BehaviorSubject<Product[]>;


  constructor() {
    const cart = localStorage.getItem("Cart");
    this.cartProducts = cart ? JSON.parse(cart) : [];
    this.product = new BehaviorSubject<Product[]>(this.cartProducts);
  }

  get products() {
    return this.product.asObservable();
  }

  addNewProduct(product: Product) {
    product.subtotal = product.price;

    if(this.cartProducts!==null){
      const index = this.cartProducts.findIndex((book:Product)=>book.id=== product.id);
      if(index!==-1){
        product.quantity=this.cartProducts[index].quantity+1;
        product.subtotal = product.price * product.quantity;
        this.cartProducts[index]=product;
        this.product.next(this.cartProducts);
        localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
      }else {
        this.pushItem(product);
      }
    }else {
      this.pushItem(product);
    }
    Swal.fire({
      title:"Item added to cart",
      icon: "success",
      timer: 1000,
    })
  }

  pushItem(product:Product){
    this.cartProducts.push(product);
    this.product.next(this.cartProducts);
    localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
  }

  eliminateProduct(product:Product){
    const index = this.cartProducts.findIndex((book:Product)=>book.id=== product.id);
    if(this.cartProducts[index].quantity === 1){
      this.cartProducts.splice(index,1);
      this.product.next(this.cartProducts);
      localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
    }else{
      this.cartProducts[index].quantity--;
      this.cartProducts[index].subtotal=product.price*this.cartProducts[index].quantity;
      this.product.next(this.cartProducts);
      localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
    }
  }

  cleanProducts(){
    localStorage.removeItem("Cart");
    this.cartProducts=[];
    this.product.next([]);
  }

}