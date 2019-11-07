import { Component, OnInit, Injectable, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/usuario.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(private router: Router, private loginService: LoginService, private usuarioService: UsuarioService) { }

  usuario: Usuario;
  matricula: string;


  ngOnInit() {
    this.loginService.currentMat.subscribe((mat) => {
      this.matricula = localStorage.getItem('matricula');
      if (this.matricula) {
        this.usuarioService.getUser(this.matricula)
          .subscribe((user) => this.usuario = user)
      }
    })
    this.matricula = localStorage.getItem('matricula')
    if (this.matricula) {
      this.usuarioService.getUser(this.matricula)
        .subscribe((user) => this.usuario = user)
    }

  }
  ngOnChanges() {

  }

  logout() {
    this.loginService.logout();
    this.loginService.setMatricula('');
    this.router.navigate(['/login'])
  }




}
