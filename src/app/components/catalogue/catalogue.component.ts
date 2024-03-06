import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksApiServiceService } from '../../services/books-api-service.service';
import { book } from '../../interfaces/book';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { BookCardComponent } from '../../shared/book-card/book-card.component';


@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [RouterLink, NgFor,FiltersComponent,BookCardComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {

  booksList:book[]|undefined=[];
  private BooksApiServiceService = inject(BooksApiServiceService);

  ngOnInit(): void {
    this.showBooks();
  }

  showBooks(){
    this.BooksApiServiceService.getBooks()
    .subscribe(
      {
        next:(books)=>{
          this.booksList=books;
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }
}
