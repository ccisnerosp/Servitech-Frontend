import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicosService } from '../../services/tecnicos.service';
import { ValoracionService } from '../../services/valoracion.service';
import { ServiciosService } from '../../services/servicios.service';
import { Tecnico } from '../../model/tecnico';
import { Valoracion } from '../../model/valoracion';
import { Servicio } from '../../model/servicio';
import {SolicitudServicioService} from '../../services/solicitud-servicio.service';
import {SolicitudServicio} from '../../model/solicitud-servicio';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-viewtecprofile',
  templateUrl: './viewtecprofile.component.html',
  styleUrls: ['./viewtecprofile.component.css'],
  imports: [
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    NgForOf,
    MatIcon,
    MatCardContent,
    MatCard,
    MatCardActions,
    MatButton,
    MatProgressSpinner,
    NgIf,
    MatList,
    MatListItem
  ],
  standalone: true
})
export class ViewtecprofileComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  tecnicoService: TecnicosService = inject(TecnicosService);
  valoracionService: ValoracionService = inject(ValoracionService);
  serviciosService: ServiciosService = inject(ServiciosService);
  solicitudServicioService: SolicitudServicioService = inject(SolicitudServicioService); // Inyecta el servicio
  tecnico!: Tecnico;
  valoraciones: Valoracion[] = [];
  servicios: Servicio[] = [];
  solicitudes: SolicitudServicio[] = []; // Lista de solicitudes para el servicio expandido
  expandedServiceId: number | null = null; // Identifica el servicio expandido
  loadingRequests = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadTecDetails(id);
        this.loadValoraciones(id);
        this.loadServicios(id);
      }
    });
  }

  loadTecDetails(id: number): void {
    this.tecnicoService.listID(id).subscribe({
      next: (data) => (this.tecnico = data),
      error: (err) => console.error('Error al cargar detalles del técnico:', err),
    });
  }

  loadValoraciones(id: number): void {
    this.valoracionService.getValoracionesTecnico(id).subscribe({
      next: (data) => (this.valoraciones = data.slice(0, 3)),
      error: (err) => console.error('Error al cargar valoraciones del técnico:', err),
    });
  }

  loadServicios(id: number): void {
    this.serviciosService.getServiciosByTecnico(id).subscribe({
      next: (data) => (this.servicios = data),
      error: (err) => console.error('Error al cargar servicios del técnico:', err),
    });
  }

  toggleRequests(serviceId: number): void {
    if (this.expandedServiceId === serviceId) {
      // Si el servicio ya está expandido, colapsarlo
      this.expandedServiceId = null;
      this.solicitudes = [];
    } else {
      // Expandir el servicio y cargar sus solicitudes
      this.expandedServiceId = serviceId;
      this.loadingRequests = true;
      this.solicitudServicioService.listSolicitudesTerminadasTecnico(serviceId).subscribe({
        next: (data) => {
          this.solicitudes = data;
          this.loadingRequests = false;
        },
        error: (err) => {
          console.error('Error al cargar solicitudes del servicio:', err);
          this.loadingRequests = false;
        },
      });
    }
  }
}

