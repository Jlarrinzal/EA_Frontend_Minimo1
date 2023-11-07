import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseNotificationComponent } from 'src/app/components/notifications/purchase-notification/purchase-notification.component';
import { PurchaseFailureNotificationComponent } from '../notifications/purchase-failure-notification/purchase-failure-notification.component';


@Component({
  selector: 'app-purchase',
  templateUrl: 'purchase.component.html',
  styleUrls: ['purchase.component.css']
})
export class PurchaseComponent implements OnInit{
  purchases: Purchase[] = [];

  purchase: any = {
   username: '',
   name: '',
   quantity: ''
 } 
 currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  showAddForm: boolean = false;

 constructor(
   private purchaseService: PurchaseService,
   private router: Router,
   private dialog: MatDialog
   ) { }
 
 //Ordena obtener los 'purchases' cuando se inicializa la pagina
 ngOnInit(): void {
   this.getpurchases(this.currentPage);
 }
 // Obtiene los 'purchases' proporcionados por el purchaseService
 getpurchases(page:number): void {
   this.purchaseService.getPurchases(page)
   .subscribe((response: any) => {
    this.purchases = response.docs;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
  });
   
 }
 //addpurchase method
 add() {
   this.purchaseService.addPurchase(this.purchase).subscribe((response) => {
     // You can perform actions after adding the purchase here
     console.log('purchase added:', response);
     this.showPurchaseNotification();
     // Clear the input fields after adding
    this.purchase = {
      username: '',
      name: '',
      quantity: ''
    };
   },
   (error) => {
    // Purchase failed
    console.error('Purchase failed:', error);
    // Show a failure notification
    this.showFailureNotification();
      // Clear the input fields after adding
      this.purchase = {
        username: '',
        name: '',
        quantity: ''
      };
  });
 }

 showPurchaseNotification() {
  this.dialog.open(PurchaseNotificationComponent, {
    width: '300px',
  });
}

showFailureNotification() {
  this.dialog.open(PurchaseFailureNotificationComponent, {
    width: '435px',
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
    this.getpurchases(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.getpurchases(this.currentPage + 1);
  }
}

}
