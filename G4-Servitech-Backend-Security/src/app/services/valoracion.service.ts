import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Valoracion} from '../model/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Valoracion[]>();
  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/valoraciones");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/valoraciones/"+ id);
  }
  insert(valoracion:Valoracion): Observable<any>{
    return this.http.post(this.url + "/valoracion", valoracion);
  }
  update(valoracion:Valoracion): Observable<any>{
    return this.http.put(this.url + "/valoracion", valoracion);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/valoracion/" + id);
  }
  setList(listaNueva : Valoracion[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  getValoracionesTecnico(id: number): Observable<any>{
    return this.http.get(this.url + "/valoracionesT/" + id);
  }
  getValoracionesCliente(id: number): Observable<any>{
    return this.http.get(this.url + "/valoracionesC/" + id);
  }
}
