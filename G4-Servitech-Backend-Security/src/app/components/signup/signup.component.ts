import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';
import {ClientesService} from '../../services/clientes.service';
import {Cliente} from '../../model/cliente';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   usuarioForm: FormGroup;
   fb = inject(FormBuilder);
   usuarioService: UsersService = inject(UsersService);
   clienteService: ClientesService = inject(ClientesService);
   router: Router = inject(Router);
   edicion: boolean = false;
   route: ActivatedRoute = inject(ActivatedRoute);
   id: number = 0;
   idCliente: number=0;
  constructor() {

    console.log("Constructor SignUpComponent")
    this.usuarioForm = this.fb.group({
      id: [''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      username: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void { //sólo una vez luego del constructor
      this.route.params.subscribe((data: Params) => {
        console.log("ngOnInit de SignUpComponent")
        console.log(data);
        this.id = data['id']; //capturando el id del listado
        this.edicion = data['id'] != null;//true, false
        this.cargaForm();
      });
  }
  cargaForm() {
    if (this.edicion) {
      this.usuarioService.listID(this.id).subscribe((data: User) => {
        console.log(data);
        this.usuarioForm.patchValue({
          nombres: data.nombres,
          apellidos: data.apellidos,
          telefono: data.telefono,
          direccion: data.direccion,
          correo: data.correo,
          username: data.username,
          password: data.password,
        });
      });
    } //del if
  } // de cargaForm
  onSubmit() {
    if (this.usuarioForm.valid) {
      const user: User = new User();
      user.nombres = this.usuarioForm.value.nombres;
      user.apellidos = this.usuarioForm.value.apellidos;
      user.direccion = this.usuarioForm.value.direccion;
      user.telefono = this.usuarioForm.value.telefono;
      user.username = this.usuarioForm.value.username;
      user.correo = this.usuarioForm.value.correo;
      user.password = this.usuarioForm.value.password;
      user.eliminado = false;

      if (!this.edicion) {
        // Inserta el usuario y crea el cliente después de obtener el id del usuario creado
        this.usuarioService.insert(user).subscribe({
          next: (createdUser: User) => {
            console.log("Usuario creado:", createdUser);

            // Crear y configurar el objeto Cliente
            const cliente: Cliente = new Cliente();
            cliente.fechaCreacion = new Date();
            cliente.usuario = createdUser;

            // Inserta el cliente en la base de datos
            this.clienteService.insert(cliente).subscribe({
              next: () => {
                console.log("Cliente creado:", cliente);
                this.clienteService.list().subscribe(data => {
                  this.clienteService.setList(data); // Actualiza la lista de clientes
                });
                this.router.navigate(['/signupconfirm']);
              },
              error: (error) => console.error("Error al insertar cliente:", error)
            });
          },
          error: (error) => console.error("Error al insertar usuario:", error)
        });
      } else {
        // Actualización de usuario existente
        console.log("Actualizando usuario:", user);
        this.usuarioService.update(user).subscribe((data: Object) => {
          this.usuarioService.list().subscribe(data => {
            this.usuarioService.setList(data); // Actualiza la lista de usuarios
          });
        });
      }
    } else {
      console.log("Formulario no válido");
    }
  }
  onSubmitTechnician() {
    if (this.usuarioForm.valid) {
      const user1: User = new User();
      user1.id = this.id;
      user1.nombres = this.usuarioForm.value.nombres;
      user1.apellidos = this.usuarioForm.value.apellidos;
      user1.direccion = this.usuarioForm.value.direccion;
      user1.telefono = this.usuarioForm.value.telefono;
      user1.username = this.usuarioForm.value.username;
      user1.correo = this.usuarioForm.value.correo;
      user1.password = this.usuarioForm.value.password;
      user1.eliminado = false;
      if (!this.edicion) {
        this.usuarioService.insert(user1).subscribe({
          next: (response: any) => {
            // Obtén el `idUsuario` del usuario recién creado en `response`
            const idUsuario = response.id;
            console.log("Datos aceptados:", user1);

            // Redirige a `signuptecnico` con el `idUsuario`
            this.router.navigate(['/signuptecnico', idUsuario]);
          },
          error: (error) => console.error("Error al insertar usuario:", error)
        });
      } else {
        //update
        console.log("Datos aceptados:", user1);
        this.usuarioService.update(user1).subscribe((data: Object): void => {
            this.usuarioService.list().subscribe(data => {
              this.usuarioService.setList(data);//enviando la lista al suscriptor
            })
          }
        );
      }

    }
    else {
      console.log("Formulario no valido");
    }
  }

}

