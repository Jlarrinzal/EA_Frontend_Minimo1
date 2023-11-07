import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: 'purchase-detail.component.html',
  styleUrls: ['purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {
  
  purchase: Purchase | undefined;

  purchaseupdate: any = {
    username:'',
    name:'',
    quantity: ''
  }

  showUpdateForm = false;

  constructor(    
    private purchaseService: PurchaseService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getPurchase();
  }
  getPurchase(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    console.log(id);
    this.purchaseService.getPurchase(id)
      .subscribe(purchase => this.purchase = purchase);
  }
  delete() {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas borrar la compra?');
      if (isConfirmed) {
        const id = String(this.route.snapshot.paramMap.get('_id'));
        this.purchaseService.deletePurchase(id)
        .subscribe(purchase => this.purchase = purchase);
        console.log('Compra borrada exitosamente');
        this.router.navigate(['purchase']);
    }
  }

  update(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    this.purchaseService.updatePurchase(id, this.purchaseupdate)
      .subscribe(updated => {
        this.router.navigate(['purchase']);
        const popUp = window.alert('Compra actualizada');
        console.log('Compra actualizada exitosamente', updated);
      });
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
    if (!this.showUpdateForm) {

      this.purchaseupdate = {
        username: '',
        name: '',
        quantity:''
      };
    }
  }

  cancelUpdate() {
    this.showUpdateForm = false;
   
  }

}
