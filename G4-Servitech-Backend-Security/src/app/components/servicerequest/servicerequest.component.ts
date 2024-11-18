import {Component, inject, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Servicio} from '../../model/servicio';
import {ServiciosService} from '../../services/servicios.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Cliente} from '../../model/cliente';
import {SolicitudServicioService} from '../../services/solicitud-servicio.service';
import {SolicitudServicio} from '../../model/solicitud-servicio';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmrequestdialogComponent} from './confirmrequestdialog/confirmrequestdialog.component';
import {LogoutDialogComponent} from '../menuadmin/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-servicerequest',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatLabel,
    MatCard,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    MatButton,
    NgForOf,
    RouterLink,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    NgIf,
    CurrencyPipe,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatHint,
    MatSuffix
  ],
  templateUrl: './servicerequest.component.html',
  styleUrl: './servicerequest.component.css'
})
export class ServicerequestComponent implements OnInit {
  solicitudForm: FormGroup;
  servicio: Servicio | null = null;
  clienteId: number;
  solicitudServicio: SolicitudServicio;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private serviciosService: ServiciosService,
    private solicitudServicioService: SolicitudServicioService
  ) {
    // Inicializar el formulario
    this.solicitudForm = this.fb.group({
      fechaSolicitud: [new Date(), Validators.required],
      descripcionProblema: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Inicializar la instancia de SolicitudServicio
    this.solicitudServicio = {
      id: 0,
      fechaSolicitud: new Date(),
      descripcionProblema: '',
      estado: 'Pendiente',  // Estado inicial
      eliminado: false,
      servicio: {} as Servicio,
      cliente: {} as Cliente
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceId = Number(params.get('serviceId'));
      const clientId = Number(params.get('clientId'));
      this.clienteId = clientId;
      if (serviceId) {
        this.loadServiceDetails(serviceId);
      }
    });
  }

  loadServiceDetails(id: number): void {
    this.serviciosService.listID(id).subscribe({
      next: (data) => {
        this.servicio = data;
        this.solicitudServicio.servicio = this.servicio;
      },
      error: (err) => console.error('Error al cargar detalles del servicio:', err)
    });
  }

  confirmRequest(): void {
    if (this.solicitudForm.valid) {
      const formValues = this.solicitudForm.value;
      this.solicitudServicio.fechaSolicitud = formValues.fechaSolicitud;
      this.solicitudServicio.descripcionProblema = formValues.descripcionProblema;
      this.solicitudServicio.cliente = { id: this.clienteId } as Cliente; // Asignar cliente con su id

      // Guardar la solicitud a través del servicio
      this.solicitudServicioService.insert(this.solicitudServicio).subscribe({
        next: (createdSolicitud) => {
          console.log('Solicitud de servicio confirmada:', createdSolicitud);

          // Actualiza el id con el valor devuelto por el backend
          this.solicitudServicio.id = createdSolicitud.id;

          // Redirige al componente clientpayment con el id correcto
          this.router.navigate(['/clientpayment', this.solicitudServicio.id]);
        },
        error: (error) => console.error('Error al crear solicitud:', error)
      });
    } else {
      console.log('Formulario de solicitud inválido');
    }
  }
  dialog = inject(MatDialog);
  openDialog(){
    if (this.solicitudForm.valid){
    const dialogRef = this.dialog.open(ConfirmrequestdialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){

        this.confirmRequest();
        this.router.navigate(['/clientpayment', this.solicitudServicio.id]);

      }else{
        console.log("Diálogo respondió no cerrar sesión");
      }
    });
    }
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
