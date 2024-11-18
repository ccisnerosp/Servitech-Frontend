import {Component, inject, ViewChild} from '@angular/core';
import {Tecnico} from '../../model/tecnico';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {TecnicosService} from '../../services/tecnicos.service';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tecnicos',
  standalone: true,
  imports: [MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatSort,
    MatButton,
    MatHeaderRow,
    MatPaginator,
    RouterLink,
    MatSortHeader,
    MatRow,
    MatRowDef,
    DatePipe,
    MatHeaderRowDef
  ],
  templateUrl: './tecnicos.component.html',
  styleUrl: './tecnicos.component.css'
})
export class TecnicosComponent {
  lista: Tecnico[]=[];
  displayedColumns: string[]=['id', 'especialidad', 'descripcion','horario', 'eliminado', 'usuario'];
  dataSource: MatTableDataSource<Tecnico> = new MatTableDataSource<Tecnico>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tecnicoService: TecnicosService = inject(TecnicosService);
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
    this.tecnicoService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.log("Error e en consulta",error),
    });
  }
}
