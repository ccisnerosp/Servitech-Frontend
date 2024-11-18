import {Tecnico} from './tecnico';

export class Servicio {

  id: number;
  nombre: string;
  descripcion: string;
  tipo: string = '(Tipo)'
  costo: number;
  estado: string;
  eliminado: boolean;
  tecnico: Tecnico | null;
  originalData?: Servicio; // Propiedad opcional para almacenar los datos originales

  constructor(data?: Partial<Servicio>) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || '';
    this.tipo = data?.tipo || '';
    this.descripcion = data?.descripcion || '';
    this.costo = data?.costo || 0;
    this.estado = data?.estado || 'No Disponible';
    this.eliminado = data?.eliminado || false;
  }
}
