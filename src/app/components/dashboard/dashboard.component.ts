import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Sistema } from 'src/app/shared/sistema.model';
import { Tarefa } from 'src/app/shared/tarefa.model';
import { Observable, Subject,of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged,catchError} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sistemas: Sistema[]
  idSistema:number
  tarefas: Tarefa[]
  tarefasPesquisa: Observable<Tarefa[]>
  pesquisaSub$: Subject<string> = new Subject<string>()
  display: boolean = true;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    this.tarefasPesquisa = this.pesquisaSub$
    //.pipe(debounceTime(100))
    .pipe(distinctUntilChanged())
    .pipe(switchMap(
      (termo) => {
        if(termo.trim() === ''){
          return of<Tarefa[]>([]) //retorna um Observable vazio
        }
        return this.dashboardService.getTarefasLike(termo)
      }
    ))
    .pipe(catchError((err: any) => {
      console.log(err)
      return of<Tarefa[]>([])
    }))

    this.dashboardService.getSistemas()
    .subscribe((sistema:Sistema[]) => {
      this.sistemas = sistema;
    });
    this.dashboardService.getTarefas()
    .subscribe((tarefas:Tarefa[]) => {
      this.tarefas = tarefas
      
    })
  }
  setIdSistema(id){
    this.idSistema = id;
  }
  pesquisa(termo:string){
    if(termo){
      this.display = false;
    }
    else{
      this.display = true;
    }
    this.pesquisaSub$.next(termo);
  }

}
