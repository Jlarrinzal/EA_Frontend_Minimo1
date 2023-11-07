import { Component, OnInit} from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  user: User | undefined;

  userupdate: any = {
    username:'',
    email:'',
    password:''
  }

  showUpdateForm = false;

  constructor(    
    private peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    this.peticionesService.getUser(id)
      .subscribe(user => this.user = user);
  }
  delete() {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas borrar al usuario?');
      if (isConfirmed) {
        const id = String(this.route.snapshot.paramMap.get('_id'));
        this.peticionesService.deleteUser(id)
        .subscribe(user => this.user = user);
        console.log('Usuario borrado exitosamente');
        this.router.navigate(['user']);
    }
  }

  update(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    this.peticionesService.updateUser(id, this.userupdate)
      .subscribe(updated => {
        this.router.navigate(['user']);
        const popUp = window.alert('Usuario actualizado');
        console.log('Usuario actualizado exitosamente', updated);
      });
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
    if (!this.showUpdateForm) {

      this.userupdate = {
        username: '',
        email: '',
        password: ''
      };
    }
  }

  cancelUpdate() {
    this.showUpdateForm = false;
   
  }

}
