import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Tecnico} from '../../model/tecnico';
import {TecnicosService} from '../../services/tecnicos.service';
import {UsersService} from '../../services/users.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {User} from '../../model/user';

@Component({
  selector: 'app-tecprofilemockup',
  templateUrl: './tecprofilemockup.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    NgForOf,
    MatIcon,
    MatIconButton,
    FormsModule,
    NgIf,
    MatInput
  ],
  styleUrls: ['./tecprofilemockup.component.css']
})
export class TecprofilemockupComponent implements OnInit {
  tecnico: Tecnico;
  idTecnico: number = 0;
  usuario: User;
  editMode = { tecnico: false, usuario: false };
  originalTecnicoData: Tecnico;
  originalUsuarioData: User;
  router: Router = inject(Router);
  private tecnicoService = inject(TecnicosService);
  private usuarioService = inject(UsersService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const tecnicoId = Number(this.route.snapshot.paramMap.get('id'));
    this.idTecnico = tecnicoId;
    this.loadTecnico(tecnicoId);
  }

  loadTecnico(id: number): void {
    this.tecnicoService.listID(id).subscribe({
      next: (tecnico) => {
        this.tecnico = tecnico;
        this.originalTecnicoData = { ...tecnico };
        this.loadUsuario(tecnico.usuario.id);
      },
      error: (err) => console.error('Error al cargar técnico:', err)
    });
  }

  loadUsuario(userId: number): void {
    this.usuarioService.listID(userId).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.originalUsuarioData = { ...usuario };
      },
      error: (err) => console.error('Error al cargar usuario:', err)
    });
  }

  toggleEditMode(): void {
    this.editMode.tecnico = !this.editMode.tecnico;
    if (!this.editMode.tecnico) {
      this.tecnicoService.update(this.tecnico).subscribe({
        next: () => console.log('Técnico actualizado correctamente'),
        error: (err) => console.error('Error al actualizar el técnico:', err)
      });
    }
  }

  toggleEditUserMode(): void {
    this.editMode.usuario = !this.editMode.usuario;
    if (!this.editMode.usuario) {
      this.usuarioService.update(this.usuario).subscribe({
        next: () => console.log('Usuario actualizado correctamente'),
        error: (err) => console.error('Error al actualizar el usuario:', err)
      });
    }
  }
  cancelEdit(): void {
    // Restaurar los datos originales si se cancela la edición
    this.tecnico = { ...this.originalTecnicoData };
    this.editMode.tecnico = false;
  }
  cancelUserEdit(): void {
    this.usuario = { ...this.originalUsuarioData };
    this.editMode.usuario = false;
  }

  goBack(): void {
    this.router.navigate(['/menutecnico', this.idTecnico]);
  }
}

