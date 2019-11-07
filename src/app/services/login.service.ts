import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../shared/usuario.model';
import { URL_API } from '../shared/app.api';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  matricula$ = new BehaviorSubject('');
  currentMat = this.matricula$.asObservable();

  setMatricula(mat){
    this.matricula$.next(mat);
    localStorage.setItem('matricula', mat)
    
  }

  login(usuario:Usuario){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');
    headers.append('responseType', 'text');

    const httpOptions = {
      headers:headers
    }

    return this.http.post(`${URL_API}/login`, usuario,httpOptions);
  }

  userLogged(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('matricula');
  }
}
