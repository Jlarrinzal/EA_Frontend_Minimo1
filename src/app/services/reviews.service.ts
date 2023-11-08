import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Review } from '../models/review';


@Injectable({ providedIn: 'root' })
export class ReviewsService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private reviewsUrl = 'http://localhost:9090/reviews'; 
   
  /** GET reviews from the server */
  getReviews(page:number): Observable<Review[]> {
    const token =this.getToken();
    let headers =new HttpHeaders;
    const params = {
    page: page.toString(),
   };
   if (token !== null) {
    headers = headers.set("x-access-token", token);
   } 
    return this.http.get<Review[]>(this.reviewsUrl + '/readall/', {params, headers});
     
}

  /** GET review by Id */
  getReview(id: string): Observable<Review> {
    const url = `${this.reviewsUrl}/readreview/${id}`;
    return this.http.get<Review>(url)
  }

  /** PUT: update the user on the server */
  updateReview(id: string, review: Review): Observable<Review> {
    const url = `${this.reviewsUrl}/updatereview/${id}`;
    return this.http.put<Review>(url, review);
  }

  /** POST: add a new user to the server */
  addReview(review: any): Observable<Review> {
    return this.http.post<Review>(this.reviewsUrl + '/createreview', review);
  }
  
  /** DELETE: delete the user from the server */
  deleteReview(_id: string): Observable<Review> {
    const url = `${this.reviewsUrl}/deletereview/${_id}`;
    return this.http.delete<Review>(url);
  }

  /* GET users whose name contains search term */
  searchReview(term: string): Observable<Review[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<Review[]>(`${this.reviewsUrl}/?name=${term}`);
  }

  signIn(review: Review) { 
    return this.http.post<any>(this.reviewsUrl + '/signin', review);
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