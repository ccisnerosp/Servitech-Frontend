import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SolicitudServicioService} from '../../services/solicitud-servicio.service';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {CurrencyPipe} from '@angular/common';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-rendimientoservicios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    CurrencyPipe,
    MatHeaderRow,
    MatRow,
    MatHint,
    MatRowDef,
    MatHeaderRowDef,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rendimientoservicios.component.html',
  styleUrl: './rendimientoservicios.component.css'
})
export class RendimientoserviciosComponent {
  fechaForm: FormGroup;
  serviciosData: { nombre: string, cantidad: number, monto: number }[] = [];
  displayedColumns: string[] = ['nombre', 'cantidad', 'monto'];

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudServicioService,
    private datePipe: DatePipe // Inyecta el DatePipe
  ) {
    this.fechaForm = this.fb.group({
      fechaInicio: [new Date(), Validators.required],
      fechaFin: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {}
  onConsultarRendimiento() {
    if (this.fechaForm.valid) {
      const fechaInicioRaw = this.fechaForm.value.fechaInicio;
      const fechaFinRaw = this.fechaForm.value.fechaFin;

      // Formatear fechas a 'yyyy-MM-dd'
      const fechaInicio = this.datePipe.transform(fechaInicioRaw, 'yyyy-MM-dd');
      const fechaFin = this.datePipe.transform(fechaFinRaw, 'yyyy-MM-dd');

      if (fechaInicio && fechaFin) {
        console.log(`${fechaInicio} y ${fechaFin}`);

        this.solicitudService.listRendimientoServicios(fechaInicio, fechaFin).subscribe({
          next: (data) => {
            this.serviciosData = data;
            console.log('Datos de rendimiento recibidos:', data);
          },
          error: (error) => console.error('Error al obtener rendimiento:', error)
        });
      } else {
        console.error('Error al formatear las fechas');
      }
    }
  }
}
