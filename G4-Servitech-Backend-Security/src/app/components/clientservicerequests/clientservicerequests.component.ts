import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientesService} from '../../services/clientes.service';
import {Cliente} from '../../model/cliente';
import {LogoutDialogComponent} from '../menuadmin/logout-dialog/logout-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SolicitudServicioService} from '../../services/solicitud-servicio.service';
import {SolicitudServicio} from '../../model/solicitud-servicio';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-clientservicerequests',
  standalone: true,
  imports: [
    MatIcon,
    DatePipe,
    MatButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './clientservicerequests.component.html',
  styleUrl: './clientservicerequests.component.css'
})
export class ClientservicerequestsComponent {
  solicitudes: SolicitudServicio[] = [];
  clienteId: number = 0;
  sortByRecent: boolean = false;
  router = inject(Router);
  dialog = inject(MatDialog);
  constructor(
    private solicitudServicioService: SolicitudServicioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.clienteId = Number(params.get('id'));
      this.loadSolicitudes();
    });
  }

  loadSolicitudes(): void {
    this.solicitudServicioService.listSolicitudesCliente(this.clienteId).subscribe({
      next: (data) => {
        this.solicitudes = data;
        if (this.sortByRecent) {
          this.sortSolicitudesByDate();
        }
      },
      error: (error) => console.error('Error al cargar las solicitudes:', error),
    });
  }

  cancelarSolicitud(id: number): void {
    this.solicitudServicioService.cancelarSolicitud(id).subscribe({
      next: () => {
        console.log('Solicitud cancelada:', id);
        this.loadSolicitudes(); // Recargar solicitudes después de cancelar
      },
      error: (error) => console.error('Error al cancelar la solicitud:', error),
    });
  }

  sortSolicitudesByDate(): void {
    this.solicitudes.sort((a, b) => new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime());
  }

  toggleSort(): void {
    this.sortByRecent = !this.sortByRecent;
    this.loadSolicitudes();
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
