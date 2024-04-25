import { AuthGuard } from './auth-guard';
import { inject } from '@angular/core';

import { Observable, map, tap } from "rxjs";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

function checkAuthStatus ():boolean | Observable<boolean>{
    const userService = inject(UserService);
    const router = inject(Router);
    return userService.checkStatusAuthentication().pipe(
        tap(isAuthenticated =>{
            if(isAuthenticated) router.navigate(['home']);
        }),
        map(isAuthenticated => !isAuthenticated)
    )
}

export const LoginGuard = ()=>{
    return checkAuthStatus();
}