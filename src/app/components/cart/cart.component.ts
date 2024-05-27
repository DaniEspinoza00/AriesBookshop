import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from './../../services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { catchError, forkJoin, map, of } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { sales } from '../../interfaces/sales';
import { SalesService } from '../../services/sales.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BooklistService } from '../../services/booklist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterLink, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class CartComponent implements OnInit {

  total: number = 0;
  userId: number = 0;
  productList: Product[] = [];
  isLoading: boolean = false;
  private saleList: sales[] = []
  private LoginService = inject(LoginService);
  private CartService = inject(CartService);
  private formBuilder = inject(FormBuilder);
  private bookListService = inject(BooklistService)
  private router = inject(Router);
  private salesService = inject(SalesService);

  shopForm = this.formBuilder.group({
    cardName: ['', [Validators.required, Validators.minLength(10)]],
    cardNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(16)]],
    expDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.minLength(3)]]
  })


  ngOnInit(): void {

    this.LoginService.userId.subscribe(id => {
      this.userId = id
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
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }


  buyProducts() {
    if (this.shopForm.invalid) {
        alert("Please, fill the inputs");
        return;
    }

    Swal.fire({
      title: 'Confirmation',
      text: 'You want to proceed?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33'
  }).then((result) => {
    if(result.isConfirmed){
      const stockVerifications = this.productList.map(product => {
        return this.bookListService.getBookStockPrice(product.id).pipe(
            map(response => {
                if (response.stock < product.quantity) {
                    throw new Error(`Insufficient stock ${product.id}`);
                }
                return response;
            }),
            catchError(error => of(error))
        );
    });

    forkJoin(stockVerifications).subscribe({
        next: (results) => {
            // Verifies if there's any arror in the results
            const anyErrors = results.some(result => result instanceof Error);
            if (anyErrors) {
              Swal.fire({
                title: 'Error',
                text: 'Could not procceed with the purchase, insufficient stock',
                icon: 'error',
                confirmButtonText: 'Accept',
                cancelButtonColor: '#d33'
            });
                return;
            }
            // If everthing is OK, procede to register the purchase and update the stock
            this.processSales();
        },
        error: (error) => console.error('Error:', error)
    });
    }
  });

    
}

processSales() {
    const formattedDate = this.formatDate(new Date());
    this.productList.forEach(product => {
        const sale: sales = {
            date: formattedDate,
            idBook: product.id,
            idUser: this.userId,
            quantity: product.quantity,
            subtotal: product.subtotal,
        };
        this.saleList.push(sale);
    });
    this.isLoading = true;
    this.changeStock(this.saleList);
    this.salesService.postSales(this.saleList).subscribe({
        next: () => {
            this.saleList = [];
            this.productList = [];
            this.CartService.cleanProducts();
            setTimeout(() => {
                this.isLoading = false;
            }, 5000);
            this.router.navigateByUrl('/thanks');
        },
        error: (error) => {
            console.log(error);
        }
    });
}

  changeStock(saleList: sales[]) {
    saleList.forEach(sale => {
      const id = sale.idBook;
      this.bookListService.getBookStockPrice(id).subscribe(
        {
          next: (response) => {
            this.bookListService.updateBook(response, sale.quantity).subscribe(
              {
                next: (response) => {
                  console.log(response);
                },
                error: (error) => {
                  console.log(error);
                }
              }
            )
          },
        }
      )
    });
  }

}


