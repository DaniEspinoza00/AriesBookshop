import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from './../../services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { sales } from '../../interfaces/sales';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  total: number = 0;
  userId: number = 0;
  productList: Product[] = [];
  private saleList: sales[] = []
  private LoginService = inject(LoginService);
  private CartService = inject(CartService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private salesService = inject(SalesService);

  shopForm = this.formBuilder.group({
    cardName: ['danissssssssssss', [Validators.required, Validators.minLength(10)]],
    cardNumber: ['11111111111111', [Validators.required, Validators.minLength(12), Validators.maxLength(16)]],
    expDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]],
    cvv: ['123', [Validators.required, Validators.minLength(3)]]
  })


  ngOnInit(): void {

    this.LoginService.userId.subscribe(id => {
      this.userId = id
      console.log(this.userId);
    })

    this.CartService.products
      .pipe(map(products => {
        return products.reduce((prev, curr) => prev + (curr.subtotal || 0), 0);
      }))
      .subscribe(val => {
        this.total = val;
      })
    this.CartService.products.subscribe(products => {
      this.productList = products;
    })
  }

  get cardName() {
    return this.shopForm.controls.cardName;
  }
  get cardNumber() {
    return this.shopForm.controls.cardNumber;
  }
  get expDate() {
    return this.shopForm.controls.expDate;
  }
  get cvv() {
    return this.shopForm.controls.cvv;
  }


  eliminateItem(item: Product) {
    this.CartService.eliminateProduct(item);
    this.ngOnInit();
  }
  addItem(item: Product) {
    this.CartService.addNewProduct(item);
    this.ngOnInit();
  }


  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }


  buyProducts() {
    if (this.shopForm.invalid) {
      alert("llene todos los espacios");
      return;
    }
    else {
      const formattedDate = this.formatDate(new Date());
      this.productList.forEach(product => {

        const sale: sales = {
          date: formattedDate,
          idBook: product.id,
          idUser: this.userId,
          quantity: product.quantity,
          subtotal: product.subtotal,
        }
        this.saleList.push(sale);
      })
       this.salesService.postSales(this.saleList).subscribe(
        {
          next: (next) => {
            this.saleList = [];
            this.productList = [];
            this.CartService.cleanProducts();
            this.router.navigateByUrl('/thanks');
          },
          error: (error) => {
            console.log(error);
          }
        }
      ); 
    }
  }
}


