import {Component, ViewChild} from '@angular/core';
import {SolicitudServicioService} from '../../services/solicitud-servicio.service';
import {TecnicosService} from '../../services/tecnicos.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-valoraciontecnico',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    MatSort,
    MatSortHeader,
    RouterLink
  ],
  templateUrl: './valoraciontecnico.component.html',
  styleUrl: './valoraciontecnico.component.css'
})
export class ValoraciontecnicoComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'solicitudes'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tecnicosService: TecnicosService) {}

  ngOnInit(): void {
    this.obtenerValoracionTecnicos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  obtenerValoracionTecnicos(): void {
    this.tecnicosService.listValoracionTecnico().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error("Error al cargar la valoración de técnicos:", err);
      }
    });
  }
}
