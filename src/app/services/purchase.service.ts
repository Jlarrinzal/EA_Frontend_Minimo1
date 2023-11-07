import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Purchase } from '../models/purchase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private purchaseURL = 'http://localhost:9090/purchases'; 
   
  /** GET purchases from the server */
  getPurchases(page:number): Observable<Purchase[]> {
    const params = {
      page: page.toString(),
     };
    return this.http.get<Purchase[]>(this.purchaseURL + '/readall/', {params});
  }

  /** GET purchase by Id */
  getPurchase(id: string): Observable<Purchase> {
    const url = `${this.purchaseURL}/readpurchase/${id}`;
    return this.http.get<Purchase>(url);
  }

  /** PUT: update the purchase on the server */
  updatePurchase(id: string, username: Purchase): Observable<Purchase> {
    const url = `${this.purchaseURL}/updatepurchase/${id}`;
    return this.http.put<Purchase>(url, username);
  }

  /** POST: add a new purchase to the server */
  addPurchase(username: any): Observable<Purchase> {
    return this.http.post<Purchase>(this.purchaseURL + '/createpurchase', username);
  }
  
  /** DELETE: delete the purchase from the server */
  deletePurchase(_id: string): Observable<Purchase> {
    const url = `${this.purchaseURL}/deletepurchase/${_id}`;
    return this.http.delete<Purchase>(url);
  }
  /* GET purchase whose name contains search term */
  searchPurchases(term: string): Observable<Purchase[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<Purchase[]>(`${this.purchaseURL}/?name=${term}`);
  }
}
