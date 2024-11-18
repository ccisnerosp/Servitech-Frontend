import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientesService} from '../../services/clientes.service';
import {Cliente} from '../../model/cliente';
import {Valoracion} from '../../model/valoracion';
import {SolicitudServicio} from '../../model/solicitud-servicio';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ValoracionService} from '../../services/valoracion.service';
import {SolicitudServicioService} from '../../services/solicitud-servicio.service';
import {Tecnico} from '../../model/tecnico';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {LogoutDialogComponent} from '../menuadmin/logout-dialog/logout-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-clientvaluations',
  standalone: true,
  imports: [
    MatIcon,
    MatOption,
    ReactiveFormsModule,
    MatSelect,
    MatLabel,
    MatFormField,
    MatInput,
    NgForOf,
    MatButton,
    MatIconButton,
    DatePipe,
    FormsModule,
    NgIf
  ],
  templateUrl: './clientvaluations.component.html',
  styleUrl: './clientvaluations.component.css'
})
export class ClientvaluationsComponent {
  valoraciones: Valoracion[] = [];
  solicitudes: SolicitudServicio[] = [];
  clienteId: number = 0;
  editingIndex: number | null = null;
  valoracionForm: FormGroup;
  router = inject(Router);
  dialog = inject(MatDialog);
  constructor(
    private valoracionService: ValoracionService,
    private solicitudServicioService: SolicitudServicioService,
    private fb: FormBuilder
  ) {
    this.valoracionForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.minLength(10)]],
      tipo: ['', Validators.required],
      calificacion: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
      solicitudSeleccionada: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clienteId = 1; // Reemplazar con clienteId dinámico
    this.loadSolicitudes();
    this.loadValoraciones();
  }

  loadSolicitudes(): void {
    this.solicitudServicioService.listSolicitudesCliente(this.clienteId).subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: (error) => console.error('Error al cargar solicitudes:', error),
    });
  }

  loadValoraciones(): void {
    this.valoracionService.getValoracionesCliente(this.clienteId).subscribe({
      next: (data) => {
        this.valoraciones = data;
      },
      error: (error) => console.error('Error al cargar valoraciones:', error),
    });
  }

  createValoracion(): void {
    if (this.valoracionForm.valid) {
      const formValues = this.valoracionForm.value;
      const valoracion: Valoracion = {
        id: 0,
        comentario: formValues.comentario,
        tipo: formValues.tipo,
        calificacion: formValues.calificacion,
        fecha: new Date(),
        cliente: { id: this.clienteId } as Cliente,
        tecnico: { id: formValues.solicitudSeleccionada.tecnicoId } as Tecnico,
      };

      this.valoracionService.insert(valoracion).subscribe({
        next: () => {
          this.loadValoraciones();
          this.valoracionForm.reset();
        },
        error: (error) => console.error('Error al crear valoración:', error),
      });
    }
  }

  updateValoracion(index: number): void {
    const valoracion = this.valoraciones[index];
    this.valoracionService.update(valoracion).subscribe({
      next: () => {
        this.editingIndex = null; // Desactivar edición
        this.loadValoraciones();
      },
      error: (error) => console.error('Error al actualizar valoración:', error),
    });
  }
  enableEdit(index: number): void {
    this.editingIndex = index;
  }
  cancelEdit(): void {
    this.editingIndex = null;
    this.loadValoraciones();
  }
  deleteValoracion(id:number): void {
    this.valoracionService.delete(id).subscribe({
      next: () => this.loadValoraciones(),
      error: (error) => console.error('Error al eliminar valoración:', error),
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
}
