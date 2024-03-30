import { Booklist } from './../../interfaces/book-list';
import { BooklistService } from './../../services/booklist.service';
import { CommonModule, NgFor } from '@angular/common';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private BooksApiServiceService = inject(BooksApiServiceService);
  private BooklistService=inject(BooklistService);
  listError:string=""
  booksArray:book[]=[];
  numeros:number[]=[];
  bookList:Booklist[]=[];

  ngOnInit(): void {
    this.showBooksHomePage();
    /* this.listPriceStock(); */
  }

  showBooksHomePage(){
    this.BooksApiServiceService.getBooks()
    .subscribe(
      {
        next:(books)=>{//pasarlo a set! para que no se repitan los numeros porque ya se repitieron
          for(let i=0; i<4;i++){
            this.numeros.push (Math.floor(Math.random()*books.length));
          }
          this.numeros.sort((a,b)=> a-b);
          console.log(this.numeros);

          this.listPriceStock(this.numeros)

          this.booksArray = books.filter(book => this.numeros.includes(book.id));
          console.log(this.booksArray);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  listPriceStock(numberList:number[]){
    this.listError="";
    this.BooklistService.getBookListkHttp().subscribe(
      {
        next:(list)=>{
          this.bookList=list.filter(book=>numberList.includes(book.id));
          console.log(this.bookList);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

}
