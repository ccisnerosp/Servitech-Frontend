import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const productGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);
  if(loginService.getToken()){
    return true;
  }else {
    router.navigate(['/login']).then(r=> console.log("Acceso controlado sin token"));
    return false;
  }
};
