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
    this.mostrarLibrosPorCategoria();
  }

  mostrarLibrosPorCategoria(){
    this.route.params.subscribe(async param=>{
      const genre:string=param['genre'];

      this.filtrarLibrosHttp(genre);
    })
  }

  filtrarLibrosHttp(genre:string){
    this.BooksApiServiceService.getBooksByGenre(genre).subscribe(
      {
        next:(bookList)=>{
          this.booksList=bookList;
          this.filtrarStockHttp();
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  filtrarStockHttp(){
    if (this.booksList.length > 0) {
      forkJoin(this.booksList.map(book => this.BooklistService.getBookStockPrice(book.id))).subscribe(
        {
          next:(results)=>{
            this.booksArray = results;
            this.combineBookInfo();
          },
          error:(error)=>{
            console.log(error);
          }
        }
      )
    }
  }

  combineBookInfo() {
    // Asumiendo que booksArray y booksList están en el mismo orden y tienen la misma longitud
    this.booksList = this.booksList.map((book, index) => ({
      ...book,
      booklist: this.booksArray ? this.booksArray[index] : undefined
    }));
  }
}
