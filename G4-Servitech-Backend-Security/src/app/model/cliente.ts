import {DatePipe} from '@angular/common';
import {User} from './user';


export class Cliente {
  id: number;
  fechaCreacion: Date;
  usuario: User; // Simulación de relación One-to-One

}
