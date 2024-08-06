import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { book } from '../../interfaces/book';
import { NgFor } from '@angular/common';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { BookCardComponent } from '../../shared/book-card/book-card.component';
import { forkJoin, map } from 'rxjs';
import { BooklistService } from '../../services/booklist.service';
import { Booklist } from '../../interfaces/book-list';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [FiltersComponent, RouterModule, NgFor, BookCardComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {

  booksList: book[] = [];
  booksArray: Booklist[] | undefined = [];
  private route = inject(ActivatedRoute)
  private BooksApiServiceService = inject(BooksApiServiceService);
  private BooklistService = inject(BooklistService);

  ngOnInit(): void {
    this.mostrarLibrosPorAutores();
  }

  mostrarLibrosPorAutores() {
    this.route.params.subscribe(param => {
      const author: string = param['author']
      this.filtrarLibrosHttp(author);
    })
  }

  filtrarLibrosHttp(author:string){
    this.BooksApiServiceService.getBooksByAuthor(author).subscribe(
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
    this.booksList = this.booksList.map((book, index) => ({
      ...book,
      price: this.booksArray ? this.booksArray[index].price : undefined
    }));
  }
  

}
