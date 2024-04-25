/*para no entrar a lugares del usuario logeado*/

import { inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

function checkAuthStatus():boolean|Observable<boolean>{
    const userService = inject(UserService);
    const router = inject (Router);
    return userService.checkStatusAuthentication().pipe(
        tap(isAuthenticated =>{
            if(!isAuthenticated) router.navigate(['/login']);
        })
    )
}
export const AuthGuard=()=>{
    return checkAuthStatus();
}