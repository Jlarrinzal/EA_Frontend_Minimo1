import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  user: any = {
    email: '',
    password: ''
  } 

  ngOnInit(): void {
    localStorage.removeItem('token');
}

  constructor(
    private peticionesService: PeticionesService,
    private router: Router
  ) {}

  signIn(){
    this.peticionesService.signIn(this.user)
    .subscribe(
      res =>{
        console.log(res)
        localStorage.setItem('token',res.token);
        if(this.peticionesService.loggedIn() && this.peticionesService.getRole() == 'admin'){
        this.router.navigate(['user']);
        }
      },
      err => console.log(err)
      )
  }
}
