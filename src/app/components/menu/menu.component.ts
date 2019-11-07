import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService, private usuarioService: UsuarioService) { }

  usuario: Usuario;
  matricula: string;

  ngOnInit() {
    this.loginService.currentMat.subscribe((mat) => {
      this.matricula = localStorage.getItem('matricula');
      if (this.matricula) {
        this.usuarioService.getUser(this.matricula).subscribe((user) => {
          this.usuario = user;
        })
      }

    })
    this.matricula = localStorage.getItem('matricula')
    setTimeout(()=>{
      if (this.matricula) {
        this.usuarioService.getUser(this.matricula).subscribe((user) => {
          this.usuario = user;
        })
      }
    },2000)
   
  }

}