import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private productsURL = 'http://localhost:9090/products'; 
   
  /** GET products from the server */
  getProducts(page:number): Observable<Product[]> {
    const token =this.getToken();
    let headers =new HttpHeaders;
    const params = {
      page: page.toString(),
     };
     if (token !== null) {
      headers = headers.set("x-access-token", token);
     } 
    return this.http.get<Product[]>(this.productsURL + '/readall/', {params, headers});
  }
  
  /** GET product by Id */
  getProduct(id: string): Observable<Product> {
    const url = `${this.productsURL}/readproduct/${id}`;
    return this.http.get<Product>(url)
  }

  /** PUT: update the product on the server */
  updateProduct(id: string, user: Product): Observable<Product> {
    const url = `${this.productsURL}/updateproduct/${id}`;
    return this.http.put<Product>(url, user);
  }

  /** POST: add a new product to the server */
  addProduct(user: any): Observable<Product> {
    return this.http.post<Product>(this.productsURL + '/createproduct', user);
  }
  
  /** DELETE: delete the product from the server */
  deleteProduct(_id: string): Observable<Product> {
    const url = `${this.productsURL}/deleteproduct/${_id}`;
    return this.http.delete<Product>(url);
  }

  /* GET product whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsURL}/?name=${term}`);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']);
  }
  getRole() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol; 
    }
    return null; 
  }
}
