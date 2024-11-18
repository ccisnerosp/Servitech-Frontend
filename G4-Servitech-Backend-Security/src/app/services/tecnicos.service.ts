import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Tecnico} from '../model/tecnico';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Tecnico[]>();
  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/tecnicos");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/tecnicos/"+ id);
  }
  insert(tecnico:Tecnico): Observable<any>{
    return this.http.post(this.url + "/tecnico", tecnico);
  }
  update(tecnico:Tecnico): Observable<any>{
    return this.http.put(this.url + "/tecnico", tecnico);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/tecnico/" + id);
  }
  setList(listaNueva : Tecnico[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listValoracionTecnico():Observable<any>{
    return this.http.get(this.url + "/tecnico/listarSolicitudDesc");
  }

}
