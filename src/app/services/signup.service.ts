import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments.prod';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private httpClient=inject(HttpClient);

  constructor() { }

  public postUser(user:User){
    return this.httpClient.post(`${environments.usersUrl}/user/`,user);
  }
}
