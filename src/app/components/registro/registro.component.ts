import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotifierService } from "angular-notifier";
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, 
    private notifierService: NotifierService,
    private router: Router) { }

  formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null,[Validators.required]),
    'matricula': new FormControl(null,[Validators.required]),
    'senha': new FormControl(null,[Validators.required]),
  });

  ngOnInit() {
  }

  addUsuario(){
    let usuario = new Usuario;
    usuario = this.formulario.getRawValue();
    this.usuarioService.criarUsuario(usuario)
    .subscribe(() => {
      this.formulario.reset();
      this.notifierService.notify("success", "Usuário cadastrado com sucesso!")
      setTimeout(()=>{this.router.navigate(['/login'])},2000)
    })


  }

}
