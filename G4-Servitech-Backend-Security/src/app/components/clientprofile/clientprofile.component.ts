import {Component, inject} from '@angular/core';
import {User} from '../../model/user';
import {Tecnico} from '../../model/tecnico';
import {ActivatedRoute, Router} from '@angular/router';
import {TecnicosService} from '../../services/tecnicos.service';
import {UsersService} from '../../services/users.service';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {ClientesService} from '../../services/clientes.service';
import {Cliente} from '../../model/cliente';
import {LogoutDialogComponent} from '../menuadmin/logout-dialog/logout-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-clientprofile',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatCardContent,
    MatIconButton,
    NgIf,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatInput
  ],
  templateUrl: './clientprofile.component.html',
  styleUrl: './clientprofile.component.css'
})
export class ClientprofileComponent {
  dialog = inject(MatDialog);
  idCliente: number = 0;
  cliente: Cliente;
  usuario: User;
  editMode = { tecnico: false, usuario: false };
  originalClienteData: Cliente;
  originalUsuarioData: User;
  router: Router = inject(Router);
  private clienteService: ClientesService = inject(ClientesService);
  private usuarioService = inject(UsersService);
  private route = inject(ActivatedRoute);
  toggleEditUserMode(): void {
    this.editMode.usuario = !this.editMode.usuario;
    if (!this.editMode.usuario) {
      this.usuarioService.update(this.usuario).subscribe({
        next: () => console.log('Usuario actualizado correctamente'),
        error: (err) => console.error('Error al actualizar el usuario:', err)
      });
    }
  }
  cancelUserEdit(): void {
    this.usuario = { ...this.originalUsuarioData };
    this.editMode.usuario = false;
  }
  ngOnInit(): void {
    const clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.idCliente= clienteId;
    this.loadCliente(clienteId);
  }
  loadCliente(id: number): void {
    this.clienteService.listID(id).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.originalClienteData = { ...cliente };
        this.loadUsuario(cliente.usuario.id);
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

  goBack(id: number | undefined) {
    this.router.navigate(["/servicesdisplay", id])
  }
}
