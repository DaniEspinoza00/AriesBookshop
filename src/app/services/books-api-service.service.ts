import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { book } from '../interfaces/book';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BooksApiServiceService {

  bookList:book[]=[];
  urlApi:string=environment.baseUrl;
  limit:string='books?_limit=100';
  books:string='books'

  constructor(private http:HttpClient) { }

  getBooks():Observable<book[]>{
    return this.http.get<book[]>(`${this.urlApi}/${this.limit}`)
    .pipe(
      catchError(this.handlerError)
    );
  }

  getBook(id:number):Observable<book>{
    return this.http.get<book>(`${this.urlApi}/${this.books}/${id}`)
    .pipe(
      catchError(this.handlerError)
    );
  }

  getBooksBySearch(search:string):Observable<book[]>{
    return this.getBooks().pipe(
      map(books=> books.filter(book=>{
        const bookTitle=book.title.toLowerCase();
        const searchLowercase=search.toLowerCase();
        return bookTitle.includes(searchLowercase);
      }))
    )
  }

  getBooksByAuthor(author: string): Observable<book[]> {
    return this.getBooks().pipe(
      map(books => books.filter(book =>
        book.authors.toLowerCase().includes(author.toLowerCase())
      ))
    );
  }

  getBooksByGenre(genre: string): Observable<book[]> {
    return this.getBooks().pipe(
      map(books => {
        return books.filter(book => {
          const genres = book.genres.split(',').map(g => g.trim().toLowerCase());
          return genres.includes(genre.toLowerCase());
        });
      })
    );
  }
  

  private handlerError(error:HttpErrorResponse){
    if(error.status===0){
      console.log('Error detected', error.error);
    }else{
      console.log('Backend status code', error.status, error.error);
    }
    return throwError(()=> new Error('Something happened, please try again')) ;
  }
}
