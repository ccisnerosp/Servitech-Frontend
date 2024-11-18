import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {SolicitudServicio} from '../model/solicitud-servicio';
import {DatePipe} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SolicitudServicioService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<SolicitudServicio[]>();

  list():Observable<any>{
    return this.http.get(this.url + "/solicitud");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/solicitud/"+ id);
  }
  insert(solicitudservicio:SolicitudServicio): Observable<any>{
    return this.http.post(this.url + "/solicitud", solicitudservicio);
  }
  update(solicitudservicio:SolicitudServicio): Observable<any>{
    return this.http.put(this.url + "/solicitud", solicitudservicio);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/solicitud/" + id);
  }
  setList(listaNueva : SolicitudServicio[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }

  listRendimientoServicios(fechaInicio: string, fechaFin: string):Observable<any>{
    return this.http.get(this.url + "/solicitud/mostrarDescFechas/" + fechaInicio + "/" + fechaFin);
  }
  cancelarSolicitud(id: number):Observable<any>{
    return this.http.get(this.url + "/solicitud/cancelar/"+ id);
  }
  procesarSolicitud(id: number):Observable<any>{
    return this.http.get(this.url + "/solicitud/procesar/"+ id);
  }
  terminarSolicitud(id: number):Observable<any>{
    return this.http.get(this.url + "/solicitud/terminar/"+ id);
  }
  listSolicitudesTecnico(id:number):Observable<any>{
    return this.http.get(this.url + "/solicitudes/tecnico/"+ id);
  }
  listSolicitudesCliente(id:number):Observable<any>{
    return this.http.get(this.url + "/solicitudes/cliente/"+ id);
  }
  listSolicitudesTerminadasTecnico(id:number):Observable<any>{
    return this.http.get(this.url + "/solicitudes/terminadaspor/"+ id);
  }
  constructor() { }
}
