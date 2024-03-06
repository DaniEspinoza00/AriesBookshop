import { BooksApiServiceService } from './../../services/books-api-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { routes } from '../../app.routes';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { book } from '../../interfaces/book';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { NgFor } from '@angular/common';
import { BookCardComponent } from '../../shared/book-card/book-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FiltersComponent,RouterModule,NgFor,BookCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  booksList:book[]=[];
  private route=inject(ActivatedRoute)
  private BooksApiServiceService=inject(BooksApiServiceService);

  ngOnInit(): void {
    this.mostrarLibrosPorCategoria();
  }

  mostrarLibrosPorCategoria(){
    this.route.params.subscribe(async param=>{
      const genre:string=param['genre'];

      this.filtrarLibrosHttp(genre);
    })
  }

  filtrarLibrosHttp(genre: string) {
    this.BooksApiServiceService.getBooks()
      .subscribe(
        {
          next: (books) => {
            const bookList = books;

            if (bookList === undefined) {
              console.log('No se pudieron obtener los libros.');
              return;
            }
            this.booksList = bookList.filter(book => {
              const booksGenre = book.genres.split(',').map(genre => genre.trim());
              return booksGenre.includes(genre);
            });
            /* this.stockID = [];
            this.mostrarPrecioIDstockHttp(this.listadoLibrosFiltrados) */
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
  }

}
