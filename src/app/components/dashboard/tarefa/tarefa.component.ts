import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Tarefa } from 'src/app/shared/tarefa.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit, OnChanges {

  @Input() id_sistema: number;
  tarefas: Tarefa[] = [];
  nome_sistema: string = '';

  formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'descricao': new FormControl(null, [Validators.required]),
    'id_cat': new FormControl(null),
  });


  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

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
        this.getTarefasBySistema(this.id_sistema)
      })
  }

}
