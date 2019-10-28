import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/app.api';
import { Sistema } from '../shared/sistema.model';
import { Tarefa } from '../shared/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getSistemas(){
    return this.http.get<Sistema[]>(`${URL_API}/sistemas`);
  }
  getTarefas(){
    return this.http.get<Tarefa[]>(`${URL_API}/tarefas`);
  }
  getTarefasLike(termo){
    return this.http.get<Tarefa[]>(`${URL_API}/tarefaslike/${termo}`);
  }
  getTarefasBySistema(id){
    return this.http.get<Tarefa[]>(`${URL_API}/tarefassistema/${id}`);
  }
  getSistemaById(id){
    return this.http.get<Sistema[]>(`${URL_API}/sistemas/${id}`);
  }
  postTarefa(tarefa:Tarefa){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');
    headers.append('responseType', 'text');

    const httpOptions = {
      headers:headers
    }
    return this.http.post(`${URL_API}/tarefas`, tarefa, httpOptions)
  }
  deleteTarefa(id){
    return this.http.delete(`${URL_API}/tarefas/${id}`)
  }
  finalizaTarefa(id){
    return this.http.get(`${URL_API}/finalizartarefas/${id}`)
  }
}
