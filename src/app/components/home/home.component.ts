import { Booklist } from './../../interfaces/book-list';
import { BooklistService } from './../../services/booklist.service';
import { CommonModule, NgFor } from '@angular/common';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit/* , AfterViewInit */ {

  private BooksApiServiceService = inject(BooksApiServiceService); 
  private BooklistService=inject(BooklistService);

  listError:string=""
  booksArray:book[]=[];
  numeros:number[]=[];
  bookList:Booklist[]=[];

/*   @ViewChildren('categoryDiv') categoryElements!: QueryList<ElementRef>; */

  ngOnInit(): void {
    AOS.init();
    this.showBooksHomePage()
  }

/*   ngAfterViewInit(): void {
    this.categoryElements.changes.subscribe((list: QueryList<ElementRef>) => {
      this.observeElements(list);
    });
  } */

/*   private observeElements(elements: QueryList<ElementRef>) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => {
      observer.observe(element.nativeElement);
    });
  } */

  showBooksHomePage() {
    this.BooksApiServiceService.getBooks().subscribe({
      next: (books) => {
        this.numeros = this.generateUniqueRandomNumbers(4, 100);
        // Asegúrate de que los libros se seleccionan correctamente según los IDs
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
