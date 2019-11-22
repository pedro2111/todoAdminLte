import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/usuario.model';
import { GscService } from 'src/app/services/gsc.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private usuarioService: UsuarioService, private gscService: GscService) { }
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  usuarios: Usuario
  requisicao: any;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};


  formulario: FormGroup = new FormGroup({
    'matricula': new FormControl(null),
    'requisicao': new FormControl(null),
    'status': new FormControl(null),
  })


  ngOnInit() {
    this.usuarioService.getAllUser()
      .subscribe((usuario) => {
        this.usuarios = usuario;

      })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
    };//DataTables_Table_0_wrapper document.getElementsByClassName('column');




  }
  pesquisar() {
    this.gscService.getRequisicao(this.formulario.value.matricula,
      this.formulario.value.requisicao,
      this.formulario.value.status)
      .subscribe((requisicao) => {
        this.rerender();
        this.requisicao = requisicao
      })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit() {
    this.dtTrigger.next();


    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.on('draw.dt', function () {
        if (jQuery('.dataTables_empty').length > 0) {
          jQuery('.dataTables_empty').remove();
        }
      });
    });
  }

}
