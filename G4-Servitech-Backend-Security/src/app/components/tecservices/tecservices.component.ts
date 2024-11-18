import { Component, inject, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from '../../model/servicio';
import {ActivatedRoute, Router} from '@angular/router';
import {NgClass, NgFor, NgIf} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../model/user';
import {Tecnico} from '../../model/tecnico';
import {TecnicosService} from '../../services/tecnicos.service';
import {HeaderComponent} from '../1.Global/header/header.component';


@Component({
  selector: 'app-tecservices',
  standalone: true,
  imports: [NgFor, MatCardModule, MatButtonModule, MatIcon, MatInput, NgClass, FormsModule, NgIf, HeaderComponent],
  templateUrl: './tecservices.component.html',
  styleUrls: ['./tecservices.component.css']
})
export class TecservicesComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private serviciosService: ServiciosService = inject(ServiciosService);
  private tecnicosService: TecnicosService = inject(TecnicosService);
  private router: Router = inject(Router);
  tecnico: Tecnico | null = null;
  private idTecnico: number = 0;
  private dialog: MatDialog = inject(MatDialog);
  servicios: (Servicio & { editMode?: boolean })[] = [];  // Define editMode como opcional
  filteredServicios: (Servicio & { editMode?: boolean })[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.fetchServicios(id);
        this.idTecnico = id;
        this.loadTecInfo(id);
      }
    });
  }

  fetchServicios(id: number): void {
    this.serviciosService.getServiciosByTecnico(id).subscribe({
      next: (data: Servicio[]) => { // Especificamos que 'data' es un arreglo de 'Servicio'
        this.servicios = data.map((servicio: Servicio) => ({...servicio, editMode: false}));
        this.filteredServicios = [...this.servicios];
      },
      error: (err) => console.error('Error al obtener servicios:', err)
    });
  }

  loadTecInfo(id: number): void {
    this.tecnicosService.listID(id).subscribe({
      next: (data) => this.tecnico = data,
      error: (err) => console.error('Error al cargar detalles del usuario:', err)
    });
  }

  filterServices(): void {
    this.filteredServicios = this.servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleEdit(servicio: Servicio & { editMode?: boolean }): void {
    if (servicio.editMode) {
      // Guardar cambios
      this.serviciosService.update(servicio).subscribe({
        next: () => {
          servicio.editMode = false;
          console.log('Servicio actualizado correctamente');
        },
        error: (err) => console.error('Error al actualizar el servicio:', err)
      });
    } else {
      // Activar modo edición
      servicio.editMode = true;
    }
  }

  cancelEdit(servicio: Servicio & { editMode?: boolean }): void {
    const originalService = this.servicios.find(s => s.id === servicio.id); // Encuentra el servicio original
    if (originalService) {
      servicio.nombre = originalService.nombre;
      servicio.tipo = originalService.tipo;
      servicio.descripcion = originalService.descripcion;
      servicio.costo = originalService.costo;
      servicio.estado = originalService.estado;
    }
    servicio.editMode = false; // Sale del modo de edición
  }

  deleteService(servicio: Servicio & { editMode?: boolean }): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {id: servicio.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serviciosService.delete(servicio.id).subscribe({
          next: () => {
            this.servicios = this.servicios.filter(s => s.id !== servicio.id);
            this.filteredServicios = [...this.servicios];
            console.log('Servicio eliminado correctamente');
          },
          error: (err) => console.error('Error al eliminar el servicio:', err)
        });
      }
    });
  }

  createService() {
    const servicio: Servicio = {
      id: 0,
      nombre: "(Nombre)",
      descripcion: "(Descripcion)",
      estado: "No Disponible",
      costo: 0,
      tipo: "(Tipo)", // Valor predeterminado para modo no edición
      eliminado: false,
      tecnico: this.tecnico,
    };

    this.serviciosService.insert(servicio).subscribe({
      next: (newServicio) => {
        this.servicios.push({ ...newServicio, editMode: false });
        this.filteredServicios = [...this.servicios];
        console.log("Servicio creado y añadido a la lista");
      },
      error: (err) => console.error("Error al crear servicio:", err),
    });
  }
  goBack(): void {
    this.router.navigate(['/menutecnico', this.idTecnico]);
  }


}

