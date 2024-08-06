import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { routes } from '../../app.routes';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { book } from '../../interfaces/book';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { NgFor } from '@angular/common';
import { BookCardComponent } from '../../shared/book-card/book-card.component';
import { forkJoin } from 'rxjs';
import { BooklistService } from '../../services/booklist.service';
import { Booklist } from '../../interfaces/book-list';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FiltersComponent,RouterModule,NgFor,BookCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  booksList:book[]=[];
  booksArray: Booklist[] | undefined = [];
  private route=inject(ActivatedRoute)
  private BooksApiServiceService=inject(BooksApiServiceService);
  private BooklistService = inject(BooklistService);

  ngOnInit(): void {
    this.showBooksByCategory();
  }

  showBooksByCategory(){
    this.route.params.subscribe(async param=>{
      const genre:string=param['genre'];

      this.bookFilter(genre);
    })
  }

  bookFilter(genre:string){
    
    this.BooksApiServiceService.getBooksByGenre(genre).subscribe(
      {
        next:(bookList)=>{
          this.booksList=bookList;
          this.stockFilter();
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  stockFilter(){
    if (this.booksList.length > 0) {
      forkJoin(this.booksList.map(book => 
        this.BooklistService.getBookStockPrice(book.id))).subscribe(
        {
          next:(results)=>{
            console.log(results);
            this.booksArray = results;
            this.combineBookInfo();
            console.log(this.booksList);
          },
          error:(error)=>{
            console.log(error);
          }
        }
      )
    }
  }

  combineBookInfo() {
    this.booksList = this.booksList.map((book, index) => ({
      ...book,
      price: this.booksArray ? this.booksArray[index].price : undefined
    }));
  }
}
