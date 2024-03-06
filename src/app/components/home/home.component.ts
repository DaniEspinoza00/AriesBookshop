import { book } from '../../interfaces/book';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private BooksApiServiceService = inject(BooksApiServiceService);
  bookList:book[]|undefined[]=[];
  randomIndex:number=0;

  ngOnInit(): void {

    this.showBooksHomePage();
  }

  showBooksHomePage(){
    this.BooksApiServiceService.getBooks()
    .subscribe(
      {
        next:(books)=>{
          /* for(let i=0; i<3;i++){
            this.randomIndex=Math.floor(Math.random()*books.length);
          }
           */
          
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

}
