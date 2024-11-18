import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TecnicosService} from '../../services/tecnicos.service';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {Tecnico} from '../../model/tecnico';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-signuptecnico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signuptecnico.component.html',
  styleUrl: './signuptecnico.component.css'
})
export class SignuptecnicoComponent implements OnInit {
  tecnicoForm: FormGroup;
  fb = inject(FormBuilder);
  tecnicoService: TecnicosService = inject(TecnicosService);
  usuario: User | null = null;
  usuarioService: UsersService = inject(UsersService);
  router: Router = inject(Router);
  edicion: boolean = false;
  route1: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    console.log("Constructor SignUpTecnicoComponent");
    this.tecnicoForm = this.fb.group({
      id: [''],
      especialidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Captura el `idUsuario` desde la URL y carga el usuario correspondiente
    this.route1.paramMap.subscribe(params => {
      const idUsuario = Number(params.get('id'));
      if (idUsuario) {
        this.loadUserInfo(idUsuario);
      }
    });
  }

  loadUserInfo(id: number): void {
    this.usuarioService.listID(id).subscribe({
      next: (data) => this.usuario = data,
      error: (err) => console.error('Error al cargar detalles del usuario:', err)
    });
  }

  onSubmit() {
    if (this.tecnicoForm.valid) {
      const tecnico: Tecnico = new Tecnico();
      tecnico.especialidad = this.tecnicoForm.value.especialidad;
      tecnico.descripcion = this.tecnicoForm.value.descripcion;
      tecnico.horario = this.tecnicoForm.value.horario;
      tecnico.usuario = this.usuario; // Asignar el usuario cargado
      tecnico.eliminado = false;

      this.tecnicoService.insert(tecnico).subscribe(() => {
        this.tecnicoService.list().subscribe(data => {
          this.tecnicoService.setList(data);
        });
        this.router.navigate(['/signupconfirm']);
      });
    } else {
      console.log("Formulario no válido");
    }
  }
}
