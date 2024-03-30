import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  public añadirUsuario(user:any):Observable<any>{
    return this.httpClient.post<any>(environments.urlHost+"auth/register",user);
  }
}
