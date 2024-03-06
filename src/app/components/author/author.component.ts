import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksApiServiceService } from './../../services/books-api-service.service';
import { book } from '../../interfaces/book';
import { NgFor } from '@angular/common';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { BookCardComponent } from '../../shared/book-card/book-card.component';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [FiltersComponent,RouterModule,NgFor,BookCardComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit{

  booksList:book[]=[];
  private route=inject(ActivatedRoute)
  private BooksApiServiceService=inject(BooksApiServiceService);

  ngOnInit(): void {
    this.mostrarLibrosPorAutores(); 
   }
 
   mostrarLibrosPorAutores(){
     this.route.params.subscribe(async param =>{
       const author:string=param['author']
       this.filtrarLibrosHttp(author);
     })
   }
 
   filtrarLibrosHttp(author: string){
     this.BooksApiServiceService.getBooks()
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
           /* this.stockID = [];
           this.mostrarPrecioIDstockHttp(this.listadoLibrosFiltrados); */
         },
         error: (error)=>{
           console.log(error);
         }
       }
     )
   }

}
