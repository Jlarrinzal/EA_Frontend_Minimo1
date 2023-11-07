import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

   user: any = {
    username: '',
    email: '',
    password: '',
    rol:'cliente'
  } 
 
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  showAddForm: boolean = false;

  constructor(
    private peticionesService: PeticionesService,
    private router: Router
    ) { }
  
  //Ordena obtener los 'users' cuando se inicializa la pagina
  ngOnInit(): void {
    const userRole = this.peticionesService.getRole();
    if (this.peticionesService.loggedIn() && userRole === 'admin') {
      console.log(userRole);
      this.getUsers(this.currentPage);
  } else {
    this.router.navigate(['/inicio']);
  }
}

  //this.getUsers(this.currentPage);
  
  // Obtiene los 'users' proporcionados por el HeroService que a la vez le llegan del fichero de mock heroes
  getUsers(page:number): void {
    this.peticionesService.getUsers(page)
    .subscribe((response: any) => {
      this.users = response.docs;
      this.currentPage = response.page;
      this.totalPages = response.totalPages;
    });
  }
  //addUser method
  add() {
    this.peticionesService.addUser(this.user).subscribe((response) => {
      // You can perform actions after adding the user here
      console.log('User added:', response);
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
    this.getUsers(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.getUsers(this.currentPage + 1);
  }
}
}
