import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Servicio} from '../model/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Servicio[]>();
  constructor() { }
  list():Observable<any>{
    return this.http.get(this.url + "/servicios");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/servicio/"+ id);
  }
  insert(servicio:Servicio): Observable<any>{
    return this.http.post(this.url + "/servicio", servicio);
  }
  update(servicio:Servicio): Observable<any>{
    return this.http.put(this.url + "/servicio", servicio);
  }
  delete(id:number): Observable<any>{
    return this.http.delete(this.url + "/servicioL/" + id);
  }
  setList(listaNueva : Servicio[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.url);
  }

  getServiciosByTecnico(id: number):Observable<any> {
    return this.http.get(this.url + "/servicios/tecnico/"+ id);
  }
}
