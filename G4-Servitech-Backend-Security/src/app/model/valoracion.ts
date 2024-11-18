import {DatePipe} from '@angular/common';
import {Cliente} from './cliente';
import {Tecnico} from './tecnico';

export class Valoracion {
  id: number;
  comentario: string;
  tipo: string;
  calificacion: number;
  fecha: Date;
  cliente: Cliente | null;
  tecnico: Tecnico | null;
}
