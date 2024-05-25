import { Favorites } from './../interfaces/favorites';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { favRequest } from '../interfaces/favorite-request';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http:HttpClient) { }

  postFavorite(favorite:favRequest):Observable<favRequest>{
    return this.http.post<favRequest>(
      environment.urlFavs,
      favorite,
      {headers:{'Content-Type':'application/json'}}
    );
  }

  getFavoritesIdUser(id:number):Observable<Favorites[]>{
    return this.http.get<Favorites[]>(environment.urlFavs+"/"+id);
  }

  deleteFavorite(id:number):Observable<Favorites>{
    return this.http.delete<Favorites>(environment.urlFavs+"/"+id);
  }

}
