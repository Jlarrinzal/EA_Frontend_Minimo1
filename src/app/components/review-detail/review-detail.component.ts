import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent {
 
  review: Review | undefined;

  reviewupdate: any = {
    userId:'',
    stars:'',
    productId: '',
    like: ''
  }

  showUpdateForm = false;

  constructor(    
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getReview();
  }
  getReview(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    console.log(id);
    this.reviewsService.getReview(id)
      .subscribe(review => this.review = review);
  }
  delete() {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas borrar la review?');
      if (isConfirmed) {
        const id = String(this.route.snapshot.paramMap.get('_id'));
        this.reviewsService.deleteReview(id)
        .subscribe(review => this.review = review);
        console.log('Review borrada exitosamente');
        this.router.navigate(['review']);
    }
  }

  update(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    this.reviewsService.updateReview(id, this.reviewupdate)
      .subscribe(updated => {
        this.router.navigate(['review']);
        const popUp = window.alert('Review actualizada');
        console.log('Review actualizada exitosamente', updated);
      });
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
    if (!this.showUpdateForm) {

      this.reviewupdate = {
        userId: '',
        stars: '',
        productId: '',
        like: ''
      };
    }
  }

  cancelUpdate() {
    this.showUpdateForm = false;
   
  }
}
