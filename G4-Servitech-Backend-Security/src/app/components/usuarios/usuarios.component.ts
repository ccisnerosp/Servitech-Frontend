import {Component, inject, ViewChild} from '@angular/core';
import {User} from '../../model/user';
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
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-usuarios',
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
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  lista: User[]=[];
  displayedColumns: string[]=['id', 'nombres', 'apellidos', 'direccion','telefono', 'username', 'correo', 'password', 'eliminado'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clienteService: UsersService = inject(UsersService);
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
