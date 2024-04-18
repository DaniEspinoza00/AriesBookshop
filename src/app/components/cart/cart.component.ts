import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from './../../services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf,CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 
  total:number=0;
  productList:Product[]=[];
  private CartService=inject(CartService);
  private formBuilder=inject(FormBuilder);

  shopForm=this.formBuilder.group({
    cardName:['dani',[Validators.required, Validators.minLength(10)]],
    cardNumber:['',[Validators.required, Validators.minLength(12), Validators.maxLength(16)]],
    expDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]],
    cvv:['123',[Validators.required, Validators.minLength(3)]]
  })


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

  get cardName(){
    return this.shopForm.controls.cardName;
  }
  get cardNumber(){ 
    return this.shopForm.controls.cardNumber;
  }
  get expDate(){
    return this.shopForm.controls.expDate;
  }
  get cvv(){
    return this.shopForm.controls.cvv;
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


