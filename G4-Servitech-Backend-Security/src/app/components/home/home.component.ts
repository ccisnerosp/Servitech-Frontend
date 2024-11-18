import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from '../1.Global/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchQuery: string = ''; // Variable para almacenar el término de búsqueda

  constructor() {}


  searchGoogle() {
    if (this.searchQuery) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(this.searchQuery)}`;
      window.open(url, '_blank'); // Abre la búsqueda en una nueva pestaña
    } else {
      alert("Please enter a search term.");
    }
  }
}
