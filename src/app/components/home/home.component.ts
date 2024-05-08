import { Booklist } from './../../interfaces/book-list';
import { BooklistService } from './../../services/booklist.service';
import { CommonModule, NgFor } from '@angular/common';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,RouterModule,CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit/* , AfterViewInit */ {

  private BooksApiServiceService = inject(BooksApiServiceService); 
  private BooklistService=inject(BooklistService);
  private router=inject(Router);
  listError:string=""
  booksArray:book[]=[];
  numeros:number[]=[];
  bookList:Booklist[]=[];

  ngOnInit(): void {
    AOS.init();
    this.showBooksHomePage()
  }

  navigate(genre:string) {
    if(genre=='youth')
      this.router.navigate(['/category/Young Adult']);
    else if(genre==='romantic')
      this.router.navigate(['/category/Romance']);
    else if(genre==='childs')
      this.router.navigate(['/category/Childrens']);
    else if(genre==='literature')
      this.router.navigate(['/category/Literature']);

  }

  showBooksHomePage() {
    this.BooksApiServiceService.getBooks().subscribe({
      next: (books) => {
        this.numeros = this.generateUniqueRandomNumbers(4, 100);
        this.booksArray = books.filter(book => this.numeros.includes(book.id));
        this.listPriceStock(this.numeros);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  


  listPriceStock(numberList:number[]){
    this.listError="";
    this.BooklistService.getBookListkHttp().subscribe(
      {
        next:(list)=>{
          this.bookList=list.filter(book=>numberList.includes(book.id));
        },
        error:(error)=>{
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
