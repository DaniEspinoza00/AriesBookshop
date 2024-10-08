import { Booklist } from './../../interfaces/book-list';
import { BooklistService } from './../../services/booklist.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import AOS from 'aos';
import { forkJoin } from 'rxjs';
import { HomeReccommendationsComponent } from './home-recommendations/home-reccommendations.component';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor,RouterModule,CommonModule, RouterLink, MatProgressSpinnerModule, HomeReccommendationsComponent, HomeCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {

  private BooksApiServiceService = inject(BooksApiServiceService); 
  private BooklistService=inject(BooklistService);
  private router=inject(Router);
  isLoading: boolean = false;
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
