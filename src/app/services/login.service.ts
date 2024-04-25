import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError} from 'rxjs';
import { environments } from '../../environments/environments';
import { LoginRequest } from '../interfaces/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
  userId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { 
    const token = sessionStorage.getItem("token");
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    const userId = sessionStorage.getItem("userId");
    this.userId = new BehaviorSubject<number>(userId ? parseInt(userId) : 0);
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environments.urlHost+"auth/login",credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        sessionStorage.setItem("userId", userData.user.id.toString()); // Guarda el ID en el sessionStorage
        this.userId.next(userData.user.id);
      }),
      map((userData)=> userData.token),//ojo aca
      catchError(this.handleError)
    );
  }

  logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    this.userId.next(0);
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
}
