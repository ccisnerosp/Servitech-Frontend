import { Component, inject } from '@angular/core';
import { Servicio } from '../../model/servicio';
import { ServiciosService } from '../../services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Cliente } from '../../model/cliente';
import { ClientesService } from '../../services/clientes.service';
import { MatIconModule } from '@angular/material/icon';
import {LogoutDialogComponent} from '../menuadmin/logout-dialog/logout-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ValoracionService} from '../../services/valoracion.service';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-servicesdisplay',
  standalone: true,
  imports: [
    NgForOf,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    CurrencyPipe,
    MatButton,
    MatIconModule,
    MatOption,
    MatSelect,
    FormsModule,
    MatFormField,
    NgIf,
    MatInput
  ],
  templateUrl: './servicesdisplay.component.html',
  styleUrls: ['./servicesdisplay.component.css']
})
export class ServicesdisplayComponent {
  servicios: Servicio[] = [];
  filteredServicios: Servicio[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  cliente: Cliente | null = null;
  searchQuery: string = '';
  valoraciones: { [tecnicoId: number]: { promedio: number; cantidad: number } } = {};
  serviceTypes: string[] = ['Construcción', 'Tecnología', 'Plomería', 'Jardinería', 'Electricidad','Gasfitería','Carpintería'];
  serviceType: string = '';
  minRating: number = 0;
  dialog = inject(MatDialog);
  sortOrder: 'asc' | 'desc' | null = null; // Controla el orden actual (ascendente, descendente o ninguno)
  constructor(
    private valoracionService: ValoracionService,
    private serviciosService: ServiciosService,
    private router: Router,
    private clienteService: ClientesService
  ) {}

  ngOnInit(): void {
    this.fetchServicios();
    this.route.paramMap.subscribe(params => {
      const clientId = Number(params.get('id'));
      if (clientId) {
        this.loadClientDetails(clientId);
      }
    });
  }

  fetchServicios(): void {
    this.serviciosService.list().subscribe({
      next: (data) => {
        this.servicios = data;
        this.filteredServicios = data;
        this.addValoracionesToTecnicos();
      },
      error: (err) => console.error('Error al obtener servicios:', err)
    });
  }
  loadClientDetails(id: number): void {
    this.clienteService.listID(id).subscribe({
      next: (data) => (this.cliente = data),
      error: (err) => console.error('Error al cargar detalles del cliente:', err)
    });
  }

  requestService(serviceId: number): void {
    if (this.cliente) {
      this.router.navigate(['/servicerequest', serviceId, this.cliente.id]);
    } else {
      console.error('Cliente no cargado.');
    }
  }

  viewTecProfile(id: number | undefined) {
    this.router.navigate(["/viewtecprofile", id]);
  }

  sortHigherPrice(): void {
    this.sortOrder = 'desc';
    this.applyFilters();
  }

  sortLowerPrice(): void {
    this.sortOrder = 'asc';
    this.applyFilters();
  }
  addValoracionesToTecnicos(): void {
    this.servicios.forEach((servicio) => {
      if (servicio.tecnico?.id) {
        this.valoracionService.getValoracionesTecnico(servicio.tecnico.id).subscribe((valoraciones) => {
          const promedio = this.calculateAverageRating(valoraciones);
          const cantidad = valoraciones.length;
          this.valoraciones[servicio.tecnico?.id!] = { promedio, cantidad };
        });
      }
    });
  }


  calculateAverageRating(valoraciones: any[]): number {
    if (!valoraciones.length) return 0;
    const sum = valoraciones.reduce((acc, val) => acc + val.calificacion, 0);
    return parseFloat((sum / valoraciones.length).toFixed(1));
  }
  applyFilters(): void {
    let result = this.servicios.filter((servicio) => {
      const matchesSearch = servicio.nombre.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesType = !this.serviceType || servicio.tipo === this.serviceType;
      const matchesRating = (() => {
        const tecnicoId = servicio.tecnico?.id;
        const tecnicoValoracion = this.valoraciones[tecnicoId || -1];
        return tecnicoValoracion && tecnicoValoracion.promedio >= this.minRating;
      })();

      return matchesSearch && matchesType && matchesRating;
    });

    // Ordenar según el tipo de orden actual
    if (this.sortOrder === 'asc') {
      result = result.sort((a, b) => a.costo - b.costo);
    } else if (this.sortOrder === 'desc') {
      result = result.sort((a, b) => b.costo - a.costo);
    }

    this.filteredServicios = result;
  }
  filterBySearch(): void {
    this.applyFilters();
  }

  filterByType(): void {
    this.applyFilters();
  }

  filterByRating(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.serviceType = '';
    this.minRating = 0;
    this.applyFilters();
  }

  goToMyAccount(id: number | undefined) {
    this.router.navigate(["/clientprofile", id])
  }

  goToMyRequests(id: number | undefined) {
    this.router.navigate(["/clientservicerequests", id])
  }

  goToMyRatings(id: number | undefined ) {
    this.router.navigate(["/clientvaluations", id])
  }
  goToMenu(id: number | undefined) {
    this.router.navigate(["/servicesdisplay", id])
  }
  logout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.router.navigate(['/home']);
      }else{
        console.log("Diálogo respondió no cerrar sesión");
      }
    });
  }


}

