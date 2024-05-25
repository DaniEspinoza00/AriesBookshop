import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { PurchaseHistoryPageComponent } from './pages/purchase-history-page/purchase-history-page.component';
import { AuthGuard } from './components/guards/auth-guard';
import { LoginGuard } from './components/guards/login-guard';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ThanksPageComponent } from './pages/thanks-page/thanks-page.component';

export const routes: Routes = [
    {path:'home', component:HomePageComponent},
    {path:'books', loadComponent:()=> import('./pages/catalogue-page/catalogue-page.component').then(c=>c.CataloguePageComponent)},
    {path:'product/:id', component:ProductPageComponent},
    {path:'category/:genre', component:CategoryPageComponent},
    {path:'author/:author', component:AuthorPageComponent},
    {path:'login', component:LoginPageComponent, canActivate:[LoginGuard]},
    {path:'profile', component:UserDetailsPageComponent, canActivate:[AuthGuard]},
    {path:'profile/cart', loadComponent:()=> import('./pages/cart-page/cart-page.component'). then (c => c.CartPageComponent)},
    {path:'profile/favorites', component:FavoritesPageComponent, canActivate:[AuthGuard]},
    {path:'profile/purchase-history', component:PurchaseHistoryPageComponent, canActivate:[AuthGuard]},
    {path:'contact', loadComponent:()=> import('./pages/contact-page/contact-page.component').then(c => c.ContactPageComponent)},
    {path:'search/:title', component:SearchPageComponent},
    {path:'thanks', component:ThanksPageComponent, canActivate:[AuthGuard]},
    {path:'**', redirectTo:"home", pathMatch: 'full'}
];
