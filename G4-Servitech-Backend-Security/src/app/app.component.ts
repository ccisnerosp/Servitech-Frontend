import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ServicerequestComponent} from './components/servicerequest/servicerequest.component';
import {ServicesdisplayComponent} from './components/servicesdisplay/servicesdisplay.component';
import {SignupconfirmComponent} from './components/signupconfirm/signupconfirm.component';
import {RendimientoserviciosComponent} from './components/rendimientoservicios/rendimientoservicios.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ServicerequestComponent, ServicesdisplayComponent, SignupconfirmComponent, RendimientoserviciosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Servitech';
}
