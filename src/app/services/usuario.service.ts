import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API, URL_API_CAIXA } from '../shared/app.api';
import { Usuario } from '../shared/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  criarUsuario(usuario:Usuario){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');
    headers.append('responseType', 'text');

    const httpOptions = {
      headers:headers
    }

    return this.http.post(`${URL_API}/usuario`, usuario,httpOptions);

  }
  getUser(mat){
    return this.http.get<Usuario>(`${URL_API}/usuario/${mat}`)
  }
  getAllUser(){
    return this.http.get<Usuario>(`${URL_API}/usuario`)
  }
  getCaixa(){
    return this.http.get(`${URL_API_CAIXA}/entries?values.SRID=REQ000025502346`)
  }
}
