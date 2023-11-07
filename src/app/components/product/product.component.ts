import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products: Product[] = [];

  product: any = {
   name: '',
   description: '',
   price: '',
   units: ''
 } 
 currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  showAddForm: boolean = false;

 constructor(
   private productService: ProductService,
   private router: Router
   ) { }
 
   //Ordena obtener los 'productos' cuando se inicializa la pagina
   ngOnInit(): void {
    const userRole = this.productService.getRole();
    if (this.productService.loggedIn() && userRole === 'admin') {
      console.log(userRole);
      this.getProducts(this.currentPage);
  } else {
    this.router.navigate(['/inicio']);
  }
}
 // Obtiene los 'products' proporcionados por el ProductService
 getProducts(page:number): void {
   this.productService.getProducts(page)
   .subscribe((response: any) => {
    this.products = response.docs;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
  });
   
 }
 //addUser method
 add() {
   this.productService.addProduct(this.product).subscribe((response) => {
     // You can perform actions after adding the product here
     console.log('Product added:', response);
     // Clear the input fields after adding
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
    this.getProducts(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.getProducts(this.currentPage + 1);
  }
}

}
