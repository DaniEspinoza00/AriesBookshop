import { Booklist } from './../interfaces/book-list';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { book } from '../interfaces/book';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BooklistService {//para precio y stock

  Booklist:Booklist[]|undefined=[];

  constructor(private router:Router, private http:HttpClient) { }

  getBookListkHttp():Observable<Booklist[]>{
    return this.http.get<Booklist[]>(environment.urlBooks);
  }
  
  getBookStockPrice(id:number):Observable<Booklist>{
    return this.http.get<Booklist>(environment.urlBooks+"/"+id );
  }

  mostrarPrecioIDstockHttp(librosFiltrados: book[]): Observable<Booklist[]> {
    const requests = librosFiltrados.map(libro => this.getBookStockPrice(libro.id));
  
    return forkJoin(requests).pipe(
      map(resultados => {
        return resultados; // Devolver los resultados
      })
    );
  }

  updateBook(book: Booklist, quantity: number): Observable<Booklist> {
    const params = new HttpParams().set('quantity', quantity.toString());
    const options = { params: params };
    return this.http.put<Booklist>(environment.urlBooks, book, options).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
