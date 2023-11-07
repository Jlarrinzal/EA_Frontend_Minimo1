import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  product: Product | undefined;

  productupdate: any = {
    name:'',
    description:'',
    price:'',
    units:''
  }

  showUpdateForm = false;

  constructor(    
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }
  delete() {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas borrar el producto?');
      if (isConfirmed) {
        const id = String(this.route.snapshot.paramMap.get('_id'));
        this.productService.deleteProduct(id)
        .subscribe(product => this.product = product);
        console.log('Producto borrado exitosamente');
        this.router.navigate(['product']);
    }
  }

  update(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    this.productService.updateProduct(id, this.productupdate)
      .subscribe(updated => {
        this.router.navigate(['product']);
        const popUp = window.alert('Producto actualizado');
        console.log('Producto actualizado exitosamente', updated);
      });
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
    if (!this.showUpdateForm) {

      this.productupdate = {
        name: '',
        description: '',
        price: '',
        units:''
      };
    }
  }

  cancelUpdate() {
    this.showUpdateForm = false;
   
  }

}
