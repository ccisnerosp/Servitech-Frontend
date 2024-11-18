import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TecnicosService} from '../../services/tecnicos.service';
import {Tecnico} from '../../model/tecnico';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {LogoutDialogComponent} from '../menuadmin/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-menutecnico',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    RouterLink
  ],
  templateUrl: './menutecnico.component.html',
  styleUrl: './menutecnico.component.css'
})
export class MenutecnicoComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  tecnicoService: TecnicosService = inject(TecnicosService);
  tecnico!: Tecnico;
  dialog = inject(MatDialog);
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadTecDetails(id);
      }
    });
  }

  loadTecDetails(id: number): void {
    this.tecnicoService.listID(id).subscribe({
      next: (data) => this.tecnico = data,
      error: (err) => console.error('Error al cargar detalles del tecnico: ', err)
    });
  }

  navigateToTecServices(): void {
    if (this.tecnico && this.tecnico.id) {
      this.router.navigate(['/tecservices', this.tecnico.id]);
    }
  }
  navigateToTecServiceRequests(): void {
    if (this.tecnico && this.tecnico.id) {
      this.router.navigate(['/tecservicerequests', this.tecnico.id]);
    }
  }
  navigateToTecValuation(): void {
    if (this.tecnico && this.tecnico.id) {
      this.router.navigate(['/tecvaluation', this.tecnico.id]);
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.router.navigate(['/home']);
      }else{
        console.log("Diálogo respondió no cerrar sesión");
      }
    });
  }

  navigateToTecProfile() {
    if (this.tecnico && this.tecnico.id) {
      this.router.navigate(['/tecprofilemockup', this.tecnico.id]);
    }
  }
}
