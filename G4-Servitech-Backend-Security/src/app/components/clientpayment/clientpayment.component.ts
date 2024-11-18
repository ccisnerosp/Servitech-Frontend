import {Component, inject} from '@angular/core';
import {SolicitudServicio} from '../../model/solicitud-servicio';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudServicioService} from '../../services/solicitud-servicio.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {LogoutDialogComponent} from '../menuadmin/logout-dialog/logout-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-clientpayment',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatIcon,
    NgIf,
    MatButton
  ],
  templateUrl: './clientpayment.component.html',
  styleUrl: './clientpayment.component.css'
})
export class ClientpaymentComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  solicitudServicioService: SolicitudServicioService = inject(SolicitudServicioService);
  router: Router = inject(Router);
  solicitud: SolicitudServicio;
  dialog = inject(MatDialog);
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadSolicitudDetails(id);
      }
    });
  }

  loadSolicitudDetails(id: number): void {
    this.solicitudServicioService.listID(id).subscribe({
      next: (data) => (this.solicitud = data),
      error: (err) => console.error('Error al cargar detalles de la solicitud:', err)
    });
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

  goBack(id: number | undefined) {
    this.router.navigate(["/servicesdisplay", id])
  }
}
