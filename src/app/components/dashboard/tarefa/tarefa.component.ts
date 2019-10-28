import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Tarefa } from 'src/app/shared/tarefa.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit, OnChanges {

  @Input() id_sistema: number;
  tarefas: Tarefa[] = [];
  Alltarefas: Tarefa[] = [];
  nome_sistema: string = '';

  formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'descricao': new FormControl(null, [Validators.required]),
    'id_cat': new FormControl(null),
  });


  constructor(private dashboardService: DashboardService, private notifierService: NotifierService) { }

  ngOnInit() {
    this.getAllTarefas();    

  }
  ngOnChanges() {
    this.dashboardService.getTarefasBySistema(this.id_sistema)
      .subscribe((res: Tarefa[]) => {
        this.tarefas = res;
        if (this.tarefas.length !== 0) {
          this.dashboardService.getSistemaById(this.tarefas[0].id_sistema)
            .subscribe((res) => {
              this.nome_sistema = res[0].nome;
            })
        }

      })
  }
  getTarefasBySistema(id) {
    this.dashboardService.getTarefasBySistema(id)
      .subscribe((res) => {
        this.tarefas = res;
      })
  }
  getAllTarefas(){
    this.dashboardService.getTarefas()
    .subscribe((res) => {
      this.Alltarefas = res;
    })
  }
  addTask() {
    let tarefa = new Tarefa;

    tarefa.id_sistema = this.id_sistema;
    tarefa.id_cat = this.formulario.value.id_cat;
    tarefa.nome = this.formulario.value.nome;
    tarefa.descricao = this.formulario.value.descricao;
    tarefa.status = 0;

    this.dashboardService.postTarefa(tarefa)
      .subscribe(() => {
        this.formulario.reset();
        this.getTarefasBySistema(this.id_sistema);
        this.getAllTarefas();
        this.notifierService.notify("success", "Tarefa adicionada com sucesso");
      })
  }
  deleteTask(id) {
    this.dashboardService.deleteTarefa(id)
      .subscribe(() => {
        this.getTarefasBySistema(this.id_sistema)
        this.getAllTarefas();
        this.notifierService.notify("success", "Tarefa deletada com sucesso");

      });
  }
  finalizaTask(id) {
    this.dashboardService.finalizaTarefa(id)
      .subscribe(() => {
        this.getTarefasBySistema(this.id_sistema);
        this.getAllTarefas();
        this.notifierService.notify("success", "Tarefa finalizada com sucesso");

      });
  }

}
