import { BooklistService } from './../../services/booklist.service';
import { Booklist } from './../../interfaces/book-list';
import { Component, OnInit, inject } from '@angular/core';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from '../../services/books-api-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  book: book | undefined;
  booklistItem: Booklist|undefined;

  private BooksApiServiceService= inject (BooksApiServiceService);
  private route=inject(ActivatedRoute);
  private BooklistService=inject(BooklistService);
  /* private location=inject(Location); //para el modal */

  ngOnInit(): void {
    this.showBook();
  }

  
  showBook(){
    this.route.params.subscribe(param =>{
      const id=param['id'];
      this.BooksApiServiceService.getBook(id).subscribe(
        {
          next:(bookFound)=>{
            this.book=bookFound;
          }
        }
      );
      this.BooklistService.getBookStockPrice(id).subscribe(
        {
          next:(book)=>{
            this.booklistItem=book;
          }
        }
      )
    })
  }
}
