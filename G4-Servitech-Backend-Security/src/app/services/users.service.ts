import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<User[]>();
  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/usuarios");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/usuario/"+ id);
  }
  insert(user:User): Observable<any>{
    return this.http.post(this.url + "/usuario", user);
  }
  update(user:User): Observable<any>{
    return this.http.put(this.url + "/usuario", user);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/usuario/" + id);
  }
  setList(listaNueva : User[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
