import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/shared/usuario.model';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  formulario: FormGroup = new FormGroup({
    'matricula': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required]),
  });
  matricula:string;
  error;

  ngOnInit() {
    this.loginService.logout();
    this.loginService.setMatricula('');
  }

  login() {
    let usuario = new Usuario
    usuario = this.formulario.getRawValue();
    this.loginService.login(usuario)
      .subscribe((res) => {
        let token:string = res['token']
        localStorage.setItem('matricula', res['user'][0].matricula)
        localStorage.setItem('token', token )
        this.loginService.setMatricula(res['user'][0].matricula)
        this.router.navigate(['/dashboard'])
      },
        (err) => { 
          console.log(err.error)
          this.error = err.error;  
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }


      )
  }


}
