import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Cliente} from '../model/cliente';
import {Tecnico} from '../model/tecnico';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Cliente[]>();
  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/clientes");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/cliente/"+ id);
  }
  insert(cliente:Cliente): Observable<any>{
    return this.http.post(this.url + "/cliente", cliente);
  }
  update(cliente:Cliente): Observable<any>{
    return this.http.put(this.url + "/cliente", cliente);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/cliente/" + id);
  }
  setList(listaNueva : Cliente[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
