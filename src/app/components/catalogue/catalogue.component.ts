import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksApiServiceService } from '../../services/books-api-service.service';
import { book } from '../../interfaces/book';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { BookCardComponent } from '../../shared/book-card/book-card.component';
import { Booklist } from '../../interfaces/book-list';
import { BooklistService } from '../../services/booklist.service';
import { forkJoin } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [RouterLink, NgFor,FiltersComponent,BookCardComponent,MatProgressSpinnerModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {

  booksList:book[]|undefined=[];
  booksArray:Booklist[]|undefined=[];
  isLoading: boolean = false;
  private BooklistService= inject (BooklistService);
  private BooksApiServiceService = inject(BooksApiServiceService);

  ngOnInit(): void {
    this.showBooks();
  }
  showBooks(){
    this.isLoading=true;
    forkJoin({
      books: this.BooksApiServiceService.getBooks(),
      bookLists: this.BooklistService.getBookListkHttp()
    }).subscribe({
      next: ({books, bookLists}) => {
        this.booksList = books.map(book => {
          const booklist = bookLists.find(bl => bl.id === book.id);
          const price=booklist?.price;
          return { ...book, price};
        });
        console.log(this.booksList);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
