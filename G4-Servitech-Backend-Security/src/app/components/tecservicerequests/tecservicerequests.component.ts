import { Component, inject, OnInit } from '@angular/core';
import { SolicitudServicioService } from '../../services/solicitud-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudServicio } from '../../model/solicitud-servicio';
import {NgClass, NgFor, NgIf} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {Valoracion} from '../../model/valoracion';

@Component({
  selector: 'app-tecservicerequests',
  standalone: true,
  imports: [NgFor, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule, NgIf, NgClass],
  templateUrl: './tecservicerequests.component.html',
  styleUrls: ['./tecservicerequests.component.css']
})
export class TecservicerequestsComponent implements OnInit {
  router = inject(Router);
  solicitudes: SolicitudServicio[] = [];
  private route: ActivatedRoute = inject(ActivatedRoute);
  idTecnico: number;
  private solicitudServicioService: SolicitudServicioService = inject(SolicitudServicioService);
  filteredRequests: SolicitudServicio[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idTecnico = Number(params.get('id'));
      if (idTecnico) {
        this.listSolicitudesTecnico(idTecnico);
        this.idTecnico = idTecnico;
      }
    });
  }

  listSolicitudesTecnico(idTecnico: number): void {
    this.solicitudServicioService.listSolicitudesTecnico(idTecnico).subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.filteredRequests = [...this.solicitudes];
      },
      error: (err) => console.error('Error al obtener solicitudes:', err)
    });
  }

  procesarSolicitud(idSolicitud: number): void {
    this.solicitudServicioService.procesarSolicitud(idSolicitud).subscribe({
      next: () => {
        console.log('Solicitud procesada');
        this.listSolicitudesTecnico(this.route.snapshot.params['id']); // Refresca la lista
      },
      error: (err) => console.error('Error al procesar solicitud:', err)
    });
  }

  terminarSolicitud(idSolicitud: number): void {
    this.solicitudServicioService.terminarSolicitud(idSolicitud).subscribe({
      next: () => {
        console.log('Solicitud terminada');
        this.listSolicitudesTecnico(this.route.snapshot.params['id']); // Refresca la lista
      },
      error: (err) => console.error('Error al terminar solicitud:', err)
    });
  }

  recentFirst(): void {
    this.filteredRequests.sort((a, b) => {
      const dateA = new Date(a.fechaSolicitud);
      const dateB = new Date(b.fechaSolicitud);

      // Ordena de forma descendente (más reciente primero)
      return dateB.getTime() - dateA.getTime();
    });
  }

  goBack(): void {
    this.router.navigate(['/menutecnico', this.idTecnico]);
  }
}
