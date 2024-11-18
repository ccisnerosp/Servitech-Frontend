import { User } from './user';

export class Tecnico {
  id: number;
  especialidad: string;
  descripcion: string;
  horario: string;
  eliminado: boolean;
  usuario: User | null;  // Simulación de relación One-to-One

}
