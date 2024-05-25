import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest:User):Observable<any>
  {
    return this.http.put(environment.urlApi+"user", userRequest).pipe(
      catchError(this.handleError)
    )
  }


  checkStatusAuthentication():Observable<boolean>{
    const token = sessionStorage.getItem('userId');
    if(!token){
      return of (false);
    }
    return of (true);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
