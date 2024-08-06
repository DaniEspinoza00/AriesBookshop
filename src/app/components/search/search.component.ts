import { BooklistService } from './../../services/booklist.service';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { book } from '../../interfaces/book';
import { Booklist } from '../../interfaces/book-list';
import { forkJoin } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  bookList: book[] = [];
  bookListPrice: Booklist[] = [];
  search:string='';
  private route = inject(ActivatedRoute);
  private BooksApiServiceService = inject(BooksApiServiceService);
  private BooklistService = inject(BooklistService);

  ngOnInit(): void {
    this.showBooks();
  }

  showBooks() {
    this.route.params.subscribe(param => {
      this.search = param['title'];

      this.bookFilter(this.search)
    })
  }


  bookFilter(search: string) {
    this.BooksApiServiceService.getBooksBySearch(search).subscribe(
      {
        next: (response) => {
          this.bookList = response;

          this.getPriceStock(this.bookList);
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  getPriceStock(librosFiltrados:book[]) {
    this.BooklistService.showBookByID(librosFiltrados).subscribe(
      {
        next:(response)=>{
          this.bookListPrice = response;
        },
        error:(error)=>{
          console.log(error);
        }
      });
  }
}