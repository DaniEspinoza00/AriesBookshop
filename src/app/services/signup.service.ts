import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  public newUser(user:any):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+"auth/register",user);
  }
}
