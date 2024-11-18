import { Role} from './role';
export class User {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
  username: string;
  telefono: number;
  direccion: string;
  eliminado: boolean;
  roles: Set<Role> = new Set<Role>();  // Simulación de relación Many-to-Many

}
