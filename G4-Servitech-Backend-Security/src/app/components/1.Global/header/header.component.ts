import {Component, Input} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
interface NavLink {
  label: string;
  route: string;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() navLinks: NavLink[] = []; // Recibe una lista de enlaces de navegación

}
