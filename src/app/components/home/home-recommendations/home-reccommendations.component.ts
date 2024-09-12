import { Component, inject, OnInit } from '@angular/core';
import { BooksApiServiceService } from '../../../services/books-api-service.service';
import { BooklistService } from '../../../services/booklist.service';
import { forkJoin } from 'rxjs';
import { book } from '../../../interfaces/book';
import { Booklist } from '../../../interfaces/book-list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home-reccommendations',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinner],
  templateUrl: './home-reccommendations.component.html',
  styleUrl: './home-reccommendations.component.css'
})
export class HomeReccommendationsComponent implements OnInit {


  //traer el isLoading como input
  private BooksApiServiceService = inject(BooksApiServiceService);
  private BooklistService = inject(BooklistService);
  isLoading: boolean = false;
  listError: string = ""
  booksArray: book[] = [];
  numeros: number[] = [];
  bookList: Booklist[] = [];

  ngOnInit(): void {
    this.showBooksHomePage();
  }

  showBooksHomePage() {
    this.isLoading = true;
    const books$ = this.BooksApiServiceService.getBooks();
    const bookList$ = this.BooklistService.getBookListkHttp();

    forkJoin([books$, bookList$]).subscribe({
      next: ([books, list]) => {
        this.numeros = this.generateUniqueRandomNumbers(4, 100);
        this.booksArray = books.filter(book => this.numeros.includes(book.id));
        this.bookList = list.filter(book => this.numeros.includes(book.id));
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  listPriceStock(numberList: number[]) {
    this.listError = "";
    this.BooklistService.getBookListkHttp().subscribe(
      {
        next: (list) => {
          this.bookList = list.filter(book => numberList.includes(book.id));

        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  generateUniqueRandomNumbers(count: number, max: number): number[] {
    const randomNumbers = new Set<number>();
    while (randomNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * max) + 1;
      randomNumbers.add(randomNumber);
    }
    return Array.from(randomNumbers);
  }


}
