import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Sistema } from 'src/app/shared/sistema.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  constructor(private dashboardService: DashboardService, 
    private route:Router,
    private notifierService: NotifierService) { }

  
  formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
  }
  addSistema(){
    let sistema = new Sistema;
    sistema.nome = this.formulario.value.nome;

    this.dashboardService.postSistemas(sistema)
    .subscribe((rows) => {    
      this.notifierService.notify('success','Sistema Adicionado com sucesso')
    })
  }

}
