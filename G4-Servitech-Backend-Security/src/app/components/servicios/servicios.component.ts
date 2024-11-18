import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';

import {Router, RouterLink} from '@angular/router';
import {Servicio} from '../../model/servicio';
import {ServiciosService} from '../../services/servicios.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    RouterLink,
    MatHeaderCellDef
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  lista: Servicio[]=[];
  displayedColumns: string[]=['id', 'nombre', 'descripcion','tipo', 'costo', 'estado', 'eliminado', 'tecnico'];
  dataSource: MatTableDataSource<Servicio> = new MatTableDataSource<Servicio>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  servicioService: ServiciosService = inject(ServiciosService);
  router: Router = inject(Router);
  constructor() {
    console.log("Load constructor!")
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void{
    console.log("Load Lista!");
    this.loadLista();
  }


  private loadLista():void {
    this.servicioService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.log("Error e en consulta",error),
    });
  }
}
