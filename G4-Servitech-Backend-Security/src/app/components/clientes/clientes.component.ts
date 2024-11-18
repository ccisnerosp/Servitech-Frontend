import {Component, inject, ViewChild} from '@angular/core';
import {Cliente} from '../../model/cliente';
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

import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {ClientesService} from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
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
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  lista: Cliente[]=[];
  displayedColumns: string[]=['id', 'fechaCreacion', 'usuario'];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clienteService: ClientesService = inject(ClientesService);
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
    this.clienteService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.log("Error e en consulta",error),
    });
  }
}
