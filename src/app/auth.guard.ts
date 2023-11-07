import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {Router} from '@angular/router'; 
import { PeticionesService } from './services/peticiones.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private peticionesService: PeticionesService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (this.peticionesService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/inicio']);
    return false;
  }

} 