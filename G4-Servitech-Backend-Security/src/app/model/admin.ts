import { User } from './user';
export class Admin {
  id: number;
  nivelAcceso: string;
  usuario: User;  // Simulación de relación One-to-One

  constructor(id: number, nivelAcceso: string, usuario: User) {
    this.id = id;
    this.nivelAcceso = nivelAcceso;
    this.usuario = usuario;
  }
}
