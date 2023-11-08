import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  reviews: Review[] = [];

  review: any = {
   userId: '',
   stars: '',
   productId: '',
   like: ''
 } 
 currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  showAddForm: boolean = false;

 constructor(
   private reviewsService: ReviewsService,
   private router: Router,
   private dialog: MatDialog
   ) { }
 
 //Ordena obtener los 'reviews' cuando se inicializa la pagina
 ngOnInit(): void {
   this.getReviews(this.currentPage);
 }
 // Obtiene los 'reviews' proporcionados por el reviewService
 getReviews(page:number): void {
   this.reviewsService.getReviews(page)
   .subscribe((response: any) => {
    this.reviews = response.docs;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
  });
   
 }
 //addreview method
 add() {
   this.reviewsService.addReview(this.review).subscribe((response) => {
     // You can perform actions after adding the review here
     console.log('review added:', response);
     // Clear the input fields after adding
    this.review = {
      userId: '',
      stars: '',
      productId: '',
      like: ''
    };
   },
   (error) => {
    // Purchase failed
    console.error('Review failed:', error);
    // Show a failure notification
      // Clear the input fields after adding
      this.review = {
        userId: '',
        stars: '',
        productId: '',
        like: ''
      };
  });
 }

 showForm() {
  this.showAddForm = true;
}
toggleFormVisibility() {
  this.showAddForm = !this.showAddForm;
}

previousPage() {
  if (this.currentPage > 1) {
    this.getReviews(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.getReviews(this.currentPage + 1);
  }
}
}
