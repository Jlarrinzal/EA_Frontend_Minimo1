import { Injectable } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private peticionesService: PeticionesService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenizeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.peticionesService.getToken()}`
        }
      })
      return next.handle(tokenizeReq)
    }
    return next.handle(req)
  }
}
