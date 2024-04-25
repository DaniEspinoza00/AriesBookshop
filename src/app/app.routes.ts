import { Routes } from '@angular/router';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { PurchaseHistoryPageComponent } from './pages/purchase-history-page/purchase-history-page.component';
import { AuthGuard } from './components/guards/auth-guard';
import { LoginGuard } from './components/guards/login-guard';

export const routes: Routes = [
    {path:'home', component:HomePageComponent},
    {path:'books', component:CataloguePageComponent},
    {path:'product/:id', component:ProductPageComponent},
    {path:'category/:genre', component:CategoryPageComponent},
    {path:'author/:author', component:AuthorPageComponent},
    {path:'login', component:LoginPageComponent, canActivate:[LoginGuard]},//guard
    {path:'profile', component:UserDetailsPageComponent, canActivate:[AuthGuard]},//guard
    {path:'profile/cart', component:CartPageComponent},
    {path:'profile/favorites', component:FavoritesPageComponent, canActivate:[AuthGuard]},//guard
    {path:'profile/purchase-history', component:PurchaseHistoryPageComponent, canActivate:[AuthGuard]},//guard
    {path:'**', redirectTo:"home"}
];
