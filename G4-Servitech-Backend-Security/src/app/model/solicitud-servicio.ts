import {Servicio} from './servicio';
import {Cliente} from './cliente';
import {Pago} from './pago';

export class SolicitudServicio {
  id: number;
  fechaSolicitud: Date;
  descripcionProblema: string;
  estado: string;
  eliminado: boolean;
  servicio: Servicio | null;
  cliente: Cliente;

}
