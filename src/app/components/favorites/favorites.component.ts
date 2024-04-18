import { BooklistService } from './../../services/booklist.service';
import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Booklist } from '../../interfaces/book-list';
import { Favorites } from '../../interfaces/favorites';
import { LoginService } from '../../services/login.service';
import { FavoritesService } from '../../services/favorites.service';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from '../../services/books-api-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  

  listado:Booklist[]=[];
  favList:Favorites[]=[];
  booklist:book[]=[];

  orderedBookIndexes: number[] = [];

  favoriteService=inject(FavoritesService);
  loginService=inject(LoginService);
  BooklistService=inject(BooksApiServiceService);
  private router= inject (Router);
  userId: number = 0;

  ngOnInit(): void {
      this.getFavorites();
  }


  getFavorites(){
     this.loginService.userId.subscribe(id=>{
      this.userId=id
    })
    this.favoriteService.getFavoritesIdUser(this.userId).subscribe(
      {
        next:(favorites)=>{
          this.favList=favorites;
          this.favList.forEach((fav, index)=>{
            this.BooklistService.getBook(fav.idBook).subscribe(
              {
                next:(book)=>{
                  this.orderedBookIndexes.push(index);
                  this.booklist[index] = book;
                },
                error:(error)=>{
                  console.log(error);
                }
              }
            );
          })
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  deleteFav(id:number){
    this.favoriteService.deleteFavorite(id).subscribe(
      {
        next:(reponse)=>{
          console.log("el favorito se elimino con exito", reponse);
          this.reloadCurrentRoute();
        },
        error:(error)=>{
          console.log("no se pudo eliminar el favorito", error);
        }
      }
    )
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
