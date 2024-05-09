import { UserService } from './../../services/user.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoginService } from './../../services/login.service';
import { SalesService } from './../../services/sales.service';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { book } from '../../interfaces/book';
import { SaleBatch } from '../../interfaces/sale-batch';
import { BooksApiServiceService } from '../../services/books-api-service.service';
import { RouterLink } from '@angular/router';
import { Purchase } from '../../interfaces/purchase';
import { Observable, forkJoin, map } from 'rxjs';
import { User } from '../../interfaces/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CommonModule, MatProgressSpinnerModule],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class PurchaseHistoryComponent implements OnInit {

  isLoading: boolean = false;
  groupedSales: SaleBatch[][] = [];
  groupedBookIds: number[][] = [];
  groupedBooks: book[][] = [];
  groupedSubtotal: number[] = [];
  groupedPurchase: Purchase[][] = [];
  userData?: User;

  private SalesService = inject(SalesService);
  private UserService = inject(UserService);
  private LoginService = inject(LoginService);
  private BooksApiService = inject(BooksApiServiceService);
  private userId: number = 0;


  ngOnInit(): void {
    this.isLoading=true;
    this.LoginService.userId.subscribe({
      next: (response) => {
        this.userId = response;
        this.UserService.getUser(this.userId).subscribe({
          next: (response) => {
            this.userData = response;
          }
        })
        this.fetchSales();
        setTimeout(()=>{
          this.isLoading = false;
        },1000);
      },
      error: (error) => console.log(error)
    });

  }

  private fetchSales() {
    this.SalesService.getSalesById(this.userId).subscribe(
      {
        next: (sales) => {
          this.groupedSales = this.groupSalesByBatchId(sales);
          this.groupedBookIds = this.groupBookIdsByBatchId(sales);
          this.loadBooksDetails().subscribe(() => {
            this.groupedPurchase = this.purchaseList();
            this.calculateSubtotals();
            console.log(this.groupedSubtotal);
          });
        },
        error: (error) => console.log(error)
      });
  }


  private groupSalesByBatchId(sales: any[]): SaleBatch[][] {
    const groups = sales.reduce((acc, sale) => {
      if (!acc[sale.batchId]) {
        acc[sale.batchId] = [];
      }
      acc[sale.batchId].push(sale);
      return acc;
    }, {});

    return Object.values(groups);
  }


  private groupBookIdsByBatchId(sales: any[]): number[][] {
    const groups = sales.reduce((acc, sale) => {//nueva const
      if (!acc[sale.batchId]) {
        acc[sale.batchId] = [];
      }
      acc[sale.batchId].push(sale.idBook);
      return acc;
    }, {});
    return Object.values(groups);
  }



  private loadBooksDetails(): Observable<void> {
    this.groupedBooks = []; // Limpiamos la matriz groupedBooks antes de cargar nuevos datos

    const observables = this.groupedBookIds.map(batch => {
      return forkJoin(batch.map(id => this.BooksApiService.getBook(id)));
    });

    return forkJoin(observables).pipe(
      map((booksArray: book[][]) => {
        this.groupedBooks = booksArray;
      })
    );
  }

  private calculateSubtotals() {
    this.groupedSubtotal = this.groupedSales.map(batch => {
      return batch.reduce((sum, sale) => sum + sale.subtotal, 0);
    });
  }

  private purchaseList(): Purchase[][] {
    const purchases: Purchase[][] = [];

    for (let i = 0; i < this.groupedSales.length; i++) {
      const salesBatch = this.groupedSales[i];
      const bookGroup = this.groupedBooks[i];

      const purchaseGroup: Purchase[] = [];

      for (let j = 0; j < salesBatch.length; j++) {
        const sale = salesBatch[j];
        const book = bookGroup[j];

        const purchase: Purchase = {
          batchId: sale.batchId,
          date: sale.date,
          image_url: book?.image_url,
          title: book?.title,
          authors: book?.authors,
          quantity: sale.quantity,
          subtotal: sale.subtotal,
        };

        purchaseGroup.push(purchase);
      }

      purchases.push(purchaseGroup);
    }

    return purchases;
  }
}
