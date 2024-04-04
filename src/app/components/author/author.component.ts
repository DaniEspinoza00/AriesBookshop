import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { book } from '../../interfaces/book';
import { NgFor } from '@angular/common';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { BookCardComponent } from '../../shared/book-card/book-card.component';
import { forkJoin, map } from 'rxjs';
import { BooklistService } from '../../services/booklist.service';
import { Booklist } from '../../interfaces/book-list';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [FiltersComponent,RouterModule,NgFor,BookCardComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit{

  booksList:book[]=[];
  booksArray:Booklist[]|undefined=[];
  private route=inject(ActivatedRoute)
  private BooksApiServiceService=inject(BooksApiServiceService);
  private BooklistService= inject (BooklistService);

  ngOnInit(): void {
    this.mostrarLibrosPorAutores(); 
   }
 
   mostrarLibrosPorAutores(){
     this.route.params.subscribe(param =>{
       const author:string=param['author']
       this.filtrarLibrosHttp(author);
     })
   }
 
   filtrarLibrosHttp(author: string){//aca deberiamos hacer el forkJoin()
/*       this.BooksApiServiceService.getBooks()
     .subscribe(
       {
         next:(books)=>{
           if (books === undefined) {
             console.log('No se pudieron obtener los libros.');
             return;
           }
           this.booksList = books.filter(book => {
             return book.authors.trim() === author.trim();
           });
         },
         error: (error)=>{
           console.log(error);
         }
       }
     )  */
    forkJoin({
      books:this.BooksApiServiceService.getBooks(),
      bookLists: this.BooklistService.getBookListkHttp()
    }).subscribe({
      next:({books, bookLists})=>{
        this.booksList = books.filter(book => {
          return book.authors.trim() === author.trim();
        });
      },
      error:(error)=>{
        console.log(error);
      }
    })
     
   }



}
