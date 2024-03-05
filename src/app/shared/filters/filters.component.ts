import { NgFor } from '@angular/common';
import { book } from './../../interfaces/book';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule,MatSliderModule,NgFor],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit{

  bookList:book[]|undefined=[];
  genreList:String[]=[];
  authorsList:String[]=[];
  
  private router=inject(Router)
  private BooksApiServiceService=inject(BooksApiServiceService);

  ngOnInit(): void {
    this.getGenres();
  }

  filter(event:Event):void{
    const target=event.target as HTMLSelectElement;
    const genre = target.value;

    if(genre){
      this.router.navigate(['/genre',genre]);
    }
  }

  getGenres(){
    this.BooksApiServiceService.getBooks()
    .subscribe(
      {
        next:(books)=>{
          this.bookList=books;
          if(this.bookList){
            const genreSet = new Set <string>();
            this.bookList.forEach(books=>{
              const genreArray = books.genres.split(',');
              genreArray.forEach(genre=>genreSet.add(genre.trim()))
            });
            this.genreList=Array.from(genreSet);
            this.getAutoresHttp();
          }
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }
  getAutoresHttp(){
    const authorsArray= this.bookList?.map(book=>book.authors);
    this.authorsList=[... new Set(authorsArray)];
    console.log(this.authorsList);
  }

  
}
