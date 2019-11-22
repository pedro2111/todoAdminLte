import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_API_CAIXA } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class GscService {

  constructor(private http: HttpClient) { }



  getRequisicao(matricula,requisicao,status) {
    let params = new HttpParams();
    if(matricula){
      params = params.set('values.Requestor_By_ID', matricula.toUpperCase())
    }
    if(requisicao){
      params = params.set('values.SRID',requisicao)
    }
    if(status){
      params = params.set('values.Status', status)
    }
    console.log(params.toString())

    return this.http.get(`${URL_API_CAIXA}/entries`, {params})
  }
  getMudanca(matricula,mudanca,status) {
    let params = new HttpParams();
    if(matricula){
      params = params.set('values.Requestor_By_ID', matricula.toUpperCase())
    }
    if(mudanca){
      params = params.set('values.Request ID',mudanca)
    }
    if(status){
      params = params.set('values.Status', status)
    }
    console.log(params.toString())

    return this.http.get(`${URL_API_CAIXA}/entries`, {params})
  }

}
