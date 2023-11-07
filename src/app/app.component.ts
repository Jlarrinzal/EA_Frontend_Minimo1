import { Component } from '@angular/core';
import { PeticionesService } from './services/peticiones.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public peticionesService: PeticionesService) {
    
  }
  title = 'Back Office';
}
