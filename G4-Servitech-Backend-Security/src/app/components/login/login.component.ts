import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ResponseDto} from '../../model/response-dto';
import {RequestDto} from '../../model/request-dto';
import {LoginService} from '../../services/login.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatIcon
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);
  showPassword: boolean = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
    console.log("Form");
  }
  login() {
    // Lógica de autenticación
    if (this.username && this.password) {
      // Guarda la contraseña en localStorage
      localStorage.setItem('userPassword', this.password);

      // Redirigir al dashboard o página de usuario
      this.router.navigate(['/user-info']);
    } else {
      alert('Por favor, ingresa un usuario y contraseña válidos.');
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto()
      requestDto.username = this.loginForm.value.username;
      requestDto.password = this.loginForm.value.password;
      let responseDTO: ResponseDto = new ResponseDto();
      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto): void => {
          console.log('Respuesta de la API:', data);
          console.log("Login response ROLs:", data.roles);
          console.log("Login response ROL:", data.roles[0]);
          localStorage.setItem('rol', data.roles[0]);
          const rol = data.roles[0];
          if (rol === 'ROLE_CLIENTE') {
            this.router.navigate(['/servicesdisplay', data.idCliente]); // Redirige según el idCliente
          } else if (rol === 'ROLE_TECNICO') {
            this.router.navigate(['/menutecnico', data.idTecnico]); // Redirige según el idTecnico
          } else if (rol === 'ROLE_ADMIN') {
            this.router.navigate(['/menuadmin']);
          } else {
            alert("Rol no válido");
          }
        }
      })
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Cambia el estado de la visibilidad
  }
}
